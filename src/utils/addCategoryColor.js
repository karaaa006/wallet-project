export const generateRandomColor = () => {
  const getRandomNum = () => Math.floor(Math.random() * 256);

  return `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
};

export const addCategoryColor = (categoriesArray) => {
  const categoriesWithColors = categoriesArray.map((item) => {
    switch (item.category) {
      case "Основной":
        return { ...item, color: "#FED057" };
      case "Еда":
        return { ...item, color: "#FFD8D0" };
      case "Авто":
        return { ...item, color: "#FD9498" };
      case "Развитие":
        return { ...item, color: "#C5BAFF" };
      case "Дети":
        return { ...item, color: "#6E78E8" };
      case "Дом":
        return { ...item, color: "#4A56E2" };
      case "Образование":
        return { ...item, color: "#81E1FF" };
      case "Досуг":
        return { ...item, color: "#24CCA7" };
      case "Остальные":
        return { ...item, color: "#00AD84" };
      case "Регулярный доход":
        return { ...item, color: "#24CCA7" };
      case "Нерегулярный доход":
        return { ...item, color: "#00AD84" };
      default:
        return { ...item, color: generateRandomColor() };
    }
  });
  return categoriesWithColors;
};
// [
//   {
//     _id: "624c80387f49cd776099192c",
//     isExpense: true,
//     name: "Дети",
//   },
//   {
//     _id: "624c80387f49cd776099192a",
//     isExpense: true,
//     name: "Авто",
//   },
//   {
//     _id: "624c80387f49cd7760991929",
//     isExpense: true,
//     name: "Еда",
//   },
//   {
//     _id: "624c80387f49cd7760991928",
//     isExpense: true,
//     name: "Основной",
//   },
//   {
//     _id: "624c80387f49cd7760991930",
//     isExpense: false,
//     name: "Регулярный доход",
//   },
//   {
//     _id: "624c80387f49cd776099192d",
//     isExpense: true,
//     name: "Дом",
//   },
//   {
//     _id: "624c80387f49cd776099192e",
//     isExpense: true,
//     name: "Образование",
//   },
//   {
//     _id: "624c80387f49cd7760991931",
//     isExpense: false,
//     name: "Нерегулярный доход",
//   },
//   {
//     _id: "624c80387f49cd776099192b",
//     isExpense: true,
//     name: "Развитие",
//   },
//   {
//     _id: "624c80387f49cd776099192f",
//     isExpense: true,
//     name: "Остальные",
//   },
// ];
