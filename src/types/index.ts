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
  age?: number;
  dob?: Date;
  phone?: string;
  address?: string;
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

export type Image = {
  _id: string;
  url: string;
};

export type Location = {
  _id: string;
  location: string;
  country: string;
};

export type Activity = {
  title: string;
  description?: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Trip = {
  _id: string;
  title: string;
  slug: string;
  overview: string;
  location: Location;
  cost: number;
  discount: number;
  tax: number;
  groupSize: number;
  minAge: number;
  maxAge: number;
  startedAt: Date;
  endedAt: Date;
  images: Image[];
  highlights: string[];
  services: string[];
  activities: Activity[];
  faqs: Faq[];
};

export type Transaction = {
  _id: string;
  transactionId: string;
  bankTransactionId: string;
  transactionType: "payment" | "refund";
  currency: string;
  amount: number;
  storeAmount?: number;
  paymentMethod?: string;
  status: "SUCCESS" | "FAILED";
  refundReason?: string;
  refundRefId?: string;
  createdAt: Date;
  updatedAt: Date;
};
