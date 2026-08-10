export const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "00:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = String(mins).padStart(2, "0");
  const formattedSecs = String(secs).padStart(2, "0");

  //позже сделать обработку часа
  console.log(`${formattedMins}:${formattedSecs}`);

  return `${formattedMins}:${formattedSecs}`;
};
