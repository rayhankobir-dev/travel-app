import React from "react";

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

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
}

export interface AuthContextType {
  loading: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
}
export interface ISenderReciever {
  _id: string;
  fullName: string;
  email: string;
}
export interface IChat {
  _id: string;
  sender: ISenderReciever;
  reciever: ISenderReciever | null;
  message: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IChatUser {
  _id: string;
  email: string;
  fullName: string;
  role: "user";
  lastMessagedAt: string;
}
