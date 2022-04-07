export const generateColor = () => {
  const colors = [
    "#2196F3",
    "#4CAF50",
    "#FF9800",
    "#009688",
    "#795548",
    "#000080",
    "#00FFFF",
    "#FFFF00",
    "#FF00FF",
    "#D2691E",
    "#00FFFF",
    "#9ACD32",
    "#FF0000",
    "#1E90FF",
    "#FF7F50",
  ];
  const indexColor = Math.floor(Math.random() * (colors.length - 1) + 0);
  return colors[indexColor];
};
