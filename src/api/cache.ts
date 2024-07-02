 
import { publicAxios } from ".";

export async function fetchLocations() {
  const cachedData = localStorage.getItem("locations");
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const res = await publicAxios.get("/locations");
  const fetchedLocations = res.data.data.locations;
  localStorage.setItem("locations", JSON.stringify(fetchedLocations));
  return fetchLocations;
}
