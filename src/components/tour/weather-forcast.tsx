/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbTemperatureCelsius, TbTemperatureSun } from "react-icons/tb";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  classifyWeather,
  getTimeFromUnixTimestamp,
  groupByDate,
} from "@/lib/lib";
import { CiTempHigh } from "react-icons/ci";
import { useEffect, useState } from "react";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { cn } from "@/lib/utils";
import { ClassifiedData, WeatherData } from "@/types";
import { Separator } from "../ui/separator";
import { weatherData } from "@/pages/wather";
import { Skeleton } from "../ui/skeleton";
import { Location } from "@/types";
import { publicAxios } from "@/api";
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

interface Props {
  location: Location;
  unit?: "metric" | "imperial";
}

export default function WeatherForcast({ location, unit = "metric" }: Props) {
  const [weather, setWeather] = useState<any>(weatherData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location?.location}&units=${unit}&appid=${API_KEY}`;

  useEffect(() => {
    async function fetchForecast() {
      try {
        const res = await publicAxios.get(url);
        setWeather(res.data);
        res.data.city;
        res.data.list;
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchForecast();
  }, [url]);
  return loading || error ? (
    <WeatherCardSkeleton />
  ) : (
    <WeatherCard weatherData={groupByDate(weather.list)} city={weather.city} />
  );
}

export function WeatherCard({
  weatherData,
  city,
}: {
  weatherData: any[];
  city: any;
}) {
  const [selectedDate, setSelectedDate] = useState<any>(weatherData[0]);
  const [classifiedWeather, setWeather] = useState<
    ClassifiedData | undefined
  >();

  useEffect(() => {
    setWeather(classifyWeather(selectedDate.data));
  }, [selectedDate]);

  const handleDateClick = (date: WeatherData) => {
    setSelectedDate(date);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 bg-orange-50">
        <div className="flex justify-around divide-x border-b overflow-hidden">
          {weatherData.map((item: any, index: number) => (
            <div
              key={index}
              className={cn(
                "w-full py-3.5 text-center text-xs font-medium cursor-pointer",
                selectedDate.day === item.day && "bg-orange-500 text-white"
              )}
              onClick={() => handleDateClick(item)}
            >
              {item.slug}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="py-2 px-3">
        <div className="flex items-center gap-2 px-4 mb-3">
          <TbTemperatureSun size={28} />
          <p className="flex items-center gap-1 font-medium text-2xl">
            {selectedDate.data[0].main.temp.toFixed(1)} <TbTemperatureCelsius />
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src={`http://openweathermap.org/img/w/${selectedDate.data[0].weather[0].icon}.png`}
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-medium capitalize">
              {selectedDate.data[0].weather[0].main}
              {". "}
              {selectedDate.data[0].weather[0].description}
            </h2>
            <p className="text-xs font-light">
              The high will be {selectedDate.data[0].main.temp_max}°C, the low
              will be {selectedDate.data[0].main.temp_min}°C.
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <table className="w-full">
          <thead className="text-sm">
            <tr>
              <th>
                <p className="flex justify-center">
                  <CiTempHigh />
                </p>
              </th>
              <th className="px-1 font-medium">Morning</th>
              <th className="px-1 font-medium">Afternon</th>
              <th className="px-1 font-medium">Evening</th>
              <th className="px-1 font-medium">Night</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm font-light text-center h-6">
              <td className="uppercase font-medium py-2">Temp</td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.morning.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.morning.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.afternoon.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.afternoon.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.evening.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.evening.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.night.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.night.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
            </tr>
            <tr className="text-sm font-light text-center h-6">
              <td className="uppercase font-medium">Feels</td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.morning.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.morning.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td className="text-center">
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.afternoon.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.afternoon.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.evening.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.evening.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.night.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.night.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-2 divide-x px-3 py-0">
        <div className="flex items-center gap-2 py-1.5">
          <WiSunrise size={34} className="text-orange-500" />
          <div className="text-sm uppercase">
            <p className="font-medium">Sunraise</p>
            <p className="font-light">
              {getTimeFromUnixTimestamp(city.sunrise)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 py-1.5">
          <WiSunset size={34} className="text-orange-600" />
          <div className="text-sm uppercase">
            <p className="font-medium">Sunset</p>
            <p className="font-light">
              {getTimeFromUnixTimestamp(city.sunset)}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function WeatherCardSkeleton() {
  return (
    <Card>
      <div className="grid grid-cols-6 items-center justify-center gap-1 divide-x py-4 px-2 border-b">
        <Skeleton className="h-2"></Skeleton>
        <Skeleton className="h-2"></Skeleton>
        <Skeleton className="h-2"></Skeleton>
        <Skeleton className="h-2"></Skeleton>
        <Skeleton className="h-2"></Skeleton>
        <Skeleton className="h-2"></Skeleton>
      </div>
      <CardContent className="py-2 space-y-3">
        <div className="flex gap-4 items-start">
          <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 mt-1"></Skeleton>
            <Skeleton className="h-2"></Skeleton>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <Skeleton className="h-12 w-12"></Skeleton>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 mt-1"></Skeleton>
            <Skeleton className="h-2"></Skeleton>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="grid grid-cols-5 gap-1">
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
        </div>
        <div className="grid grid-cols-5 gap-1">
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-2 gap-2 divide-x py-0">
        <div className="flex items-center gap-2 py-1.5 px-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-2" />
          </div>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-2" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
