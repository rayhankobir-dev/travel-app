/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext } from "react";

const AxiosContext = createContext({});
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }: any) => {
  const authAxios = axios.create({
    baseURL: "https://localhost:3000/api/v1",
  });

  const publicAxios = axios.create({
    baseURL: "https://localhost:3000/api/v1",
  });

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
