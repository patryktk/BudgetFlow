package pl.tkaczyk.expensesservice.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import pl.tkaczyk.expensesservice.model.enums.CategoryType;

@Converter(autoApply = true)
public class CategoryTypeConverter implements AttributeConverter<CategoryType, String> {

    @Override
    public String convertToDatabaseColumn(CategoryType attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public CategoryType convertToEntityAttribute(String dbData) {
        return dbData != null ? CategoryType.valueOf(dbData) : null;
    }
}
