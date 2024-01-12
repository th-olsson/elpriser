import dayjs from "dayjs";

export function displayPrice(sek: number, hideDecimals?: boolean) {
  // Convert sek to öre and round to 2 decimals
  return (100 * sek).toFixed(hideDecimals ? 0 : 2);
}

export function displayTime(start: string, end: string) {
  return `${dayjs(start).format("HH:mm")} - ${dayjs(end).format("HH:mm")}`;
}
