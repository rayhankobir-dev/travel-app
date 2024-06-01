import {
  ClassifiedData,
  ErrorResponse,
  GroupedDataItem,
  WeatherData,
} from "@/types";

export function getTimeFromUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString([], { hour12: true });
}

export const groupByDate = (data: WeatherData[]): GroupedDataItem[] => {
  const groupedData: { [key: number]: GroupedDataItem } = {};

  data.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.getDate();
    const slug = date.toString().split(" ")[0] + " " + day;

    if (!groupedData[day]) {
      groupedData[day] = {
        day: day,
        slug: slug,
        data: [],
      };
    }
    groupedData[day].data.push(item);
  });

  const result: GroupedDataItem[] = Object.values(groupedData);
  return result;
};

export const classifyWeather = (data: WeatherData[]): ClassifiedData => {
  const classifiedData = {
    night: { temp: "", feels_like: "" },
    morning: { temp: "", feels_like: "" },
    afternoon: { temp: "", feels_like: "" },
    evening: { temp: "", feels_like: "" },
  };

  const populateClassifiedData = (
    dataArray: WeatherData[],
    period: keyof ClassifiedData
  ) => {
    const calculateAvg = (property: keyof WeatherData["main"]): string => {
      const sum = dataArray.reduce((acc, item) => acc + item.main[property], 0);
      const avg = sum / dataArray.length;
      return avg.toFixed(1);
    };

    classifiedData[period].temp = calculateAvg("temp");
    classifiedData[period].feels_like = calculateAvg("feels_like");
  };

  data.forEach((item) => {
    const hour = new Date(item.dt * 1000).getHours();

    if (hour >= 0 && hour < 6) {
      populateClassifiedData([item], "night");
    } else if (hour >= 6 && hour < 12) {
      populateClassifiedData([item], "morning");
    } else if (hour >= 12 && hour < 18) {
      populateClassifiedData([item], "afternoon");
    } else {
      populateClassifiedData([item], "evening");
    }
  });

  return classifiedData;
};

export const extractErrorMessage = (error: ErrorResponse) => {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    return error.response.data.message;
  }
  if (error && error.message) {
    return error.message;
  }
  return "Something went wrong";
};
