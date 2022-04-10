export const generateRandomColor = () => {
  const getRandomNum = () => Math.floor(Math.random() * 256);

  return `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
};

export const addCategoryColor = (categoriesArray) => {
  const categoriesWithColors = categoriesArray.map((item) => {
    switch (item.category) {
      case "Основные расходы":
        return { ...item, color: "#FED057" };
      case "Еда":
        return { ...item, color: "#FFD8D0" };
      case "Машина":
        return { ...item, color: "#FD9498" };
      case "Развитие":
        return { ...item, color: "#C5BAFF" };
      case "Забота о детях":
        return { ...item, color: "#6E78E8" };
      case "Товары для дома":
        return { ...item, color: "#4A56E2" };
      case "Образование":
        return { ...item, color: "#81E1FF" };
      case "Досуг":
        return { ...item, color: "#24CCA7" };
      case "Остальные":
        return { ...item, color: "#00AD84" };
      default:
        return { ...item, color: generateRandomColor() };
    }
  });
  return categoriesWithColors;
};
