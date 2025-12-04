module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue: 16,     // базовий розмір: 1rem = 16px (можеш змінити на своє)
            propList: ["*"],   // перелік CSS-властивостей, у яких буде конвертація
            // Наприклад, можна обмежити тільки font-size, margin, padding і т.д.
            // propList: ["font", "font-size", "margin", "padding", ...]
        },
    },
};