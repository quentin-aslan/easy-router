export const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const isPWA = () => {
  return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone === true);
}