import moment from "moment";

export function getDayName(dayNumber: number) {
  return moment().weekday(dayNumber).format("dddd");
}

export function addWeeks(date: Date, dayNumber = 1) {
  return moment(date).add(dayNumber, "week").toDate();
}

export function subWeeks(date: Date, dayNumber = 1) {
  return moment(date).subtract(dayNumber, "week").toDate();
}

export function getWeekEdges(date: Date, edge: "start" | "end") {
  switch (edge) {
    case "start":
      return moment(date).startOf("week").startOf("day").format("DD/MM/YYYY");
    case "end":
      return moment(date).endOf("week").endOf("day").format("DD/MM/YYYY");
  }
}

export function formatHour(value: number) {
  return value.toString().padStart(2, "0");
}
