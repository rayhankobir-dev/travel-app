export function getTimeFromUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString([], { hour12: true });
}
