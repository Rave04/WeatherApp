export const getWeatherPicture = (description) => {
  const weatherDescription = description.toLowerCase();
  let imageSrc = `images/${weatherDescription}.png`;
  return imageSrc;
};

export const capitalizeText = (text) => {
  const splitText = text.toLowerCase().split(" ");
  console.log(splitText);
  for (let i = 0; i < splitText.length; i++) {
    splitText[i] =
      splitText[i].charAt(0).toUpperCase() + splitText[i].substring(1);
  }
  console.log(splitText);
  return splitText.join(" ");
};

export const convertDate = (date) => new Date(date).toLocaleDateString();
export const formatTime = (timestamp) => timestamp.toTimeString().split(" ")[0];
