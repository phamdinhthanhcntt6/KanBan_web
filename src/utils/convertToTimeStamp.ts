export const convertToTimestamp = (dateString: any, format: string) => {
  let day, month, year;

  if (format === "DD/MM/YYYY") {
    [day, month, year] = dateString.split("/");
  } else if (format === "DD-MM-YYYY") {
    [day, month, year] = dateString.split("-");
  } else if (format === "YYYY/MM/DD") {
    [year, month, day] = dateString.split("/");
  } else {
    throw new Error("Unsupported date format.");
  }

  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format.");
  }

  return date.getTime();
};
