const { categoryTypes } = require('../constants');

exports.getCategoryTypesViewData = (selectedCategory) => {
    const categories = Object.keys(categoryTypes).map((key) => ({
        value: key,
        category: categoryTypes[key],
        isSelected: selectedCategory == key
    }));

    return categories;
}