package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.feign.GroupClient;
import pl.tkaczyk.expensesservice.handler.ResourceNotFoundException;
import pl.tkaczyk.expensesservice.mapper.CategoryMapper;
import pl.tkaczyk.expensesservice.model.Category;
import pl.tkaczyk.expensesservice.model.dto.CategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.CategoryResponse;
import pl.tkaczyk.expensesservice.model.dto.GroupResponse;
import pl.tkaczyk.expensesservice.repository.CategoryRepository;
import pl.tkaczyk.expensesservice.service.CategoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final GroupClient groupClient;
    private final CategoryMapper categoryMapper;

    private boolean checkIfUserIsInGroup(Long userId) {
        GroupResponse groupResponse = groupClient.checkIfUserInAnyGroup(userId).getBody();
        return groupResponse != null && groupResponse.isInGroup();
    }

    @Override
    public CategoryResponse saveCategory(CategoryRequest request, String activeUserId) {
        Category parentCategory = null;
        if (request.parentId() != null) {
            parentCategory = categoryRepository.findById(request.parentId()).orElseThrow(() -> new ResourceNotFoundException("Parent category not found"));
        }
        Category category = categoryMapper.toCategory(request, activeUserId, parentCategory);
        if (parentCategory != null) {
            if (parentCategory.getParentCategory() != null) {
                throw new IllegalStateException("Maximum number of categories in parent category is " + parentCategory.getParentCategory().getId());
            }
            parentCategory.addSubCategory(category);
            categoryRepository.save(parentCategory);
        }
        GroupResponse groupResponse = groupClient.checkIfUserInAnyGroup(Long.valueOf(activeUserId)).getBody();

        if (groupResponse != null && groupResponse.isInGroup()) {
            for (Long userIdFromGroup : groupResponse.users()) {
                category.addSharedWithUser(userIdFromGroup);
            }
        } else {
            category.addSharedWithUser(Long.valueOf(activeUserId));
        }
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public List<CategoryResponse> getCategoriesByType(CategoryRequest request, String activeUserId) {
        if (checkIfUserIsInGroup(Long.valueOf(activeUserId))) {
            return categoryRepository.findBySharedWithUsers(Long.valueOf(activeUserId), request.categoryType())
                    .stream()
                    .map(categoryMapper::toCategoryResponse)
                    .collect(Collectors.toList());
        }
        return categoryRepository.findCategoryByCreatedByUserIdAndCategoryType(Long.valueOf(activeUserId), request.categoryType())
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(Long categoryId, String activeUserId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        if (category.getCreatedByUserId().equals(Long.valueOf(activeUserId))) {
            throw new IllegalStateException("You are not authorized to delete this category");
        }
        categoryRepository.delete(category);
    }
}
