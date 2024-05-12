export interface ClassifiedData {
  night: {
    temp: string;
    feels_like: string;
  };
  morning: {
    temp: string;
    feels_like: string;
  };
  afternoon: {
    temp: string;
    feels_like: string;
  };
  evening: {
    temp: string;
    feels_like: string;
  };
}

export interface GroupedDataItem {
  day: number;
  slug: string;
  data: WeatherData[];
}

export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
}
