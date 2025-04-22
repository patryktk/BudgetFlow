package pl.tkaczyk.expensesservice.model.enums;

public enum CategoryType {
    EXPENSE("wydatki"),
    INCOME("przychód");

    CategoryType(String name) {
        this.name = name;
    }

    String name;
}
