export const formattedDate = (setDate, date) => {
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month = date.getMonth() + 1 == 10 || date.getMonth() + 1 > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  let year = date.getFullYear();
  setDate(`${day}/${month}/${year}`);
}

export const americanDateFormatting = (setAmericanDate, date) => {
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month = date.getMonth() + 1 == 10 || date.getMonth() + 1 > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  let year = date.getFullYear();
  setAmericanDate(`${year}-${month}-${day}`);
}