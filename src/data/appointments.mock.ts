import { getRandomInt } from "@/lib/utils";
import moment from "moment";
import { v4 as uuid4 } from "uuid";

function getEventDates(
  startingHour: number,
  endingHour: number,
  weekDate: Date
) {
  let start = moment(weekDate).startOf("week").toDate();
  let end = moment(weekDate).endOf("week").toDate();
  const day = getRandomInt(
    moment().startOf("week").day(),
    moment().endOf("week").day()
  );
  const startHour = getRandomInt(startingHour, endingHour - 2);
  let spanRange = getRandomInt(1, 2);
  start = moment(weekDate).day(day).hour(startHour).minute(0).toDate();
  end = moment(weekDate)
    .day(day)
    .hour(startHour + spanRange)
    .minute(0)
    .toDate();

  return {
    start,
    end,
  };
}

export function generateEvent(
  startingHour: number,
  endingHour: number,
  week: "current" | "next" | "prev" = "current"
): EventCalendarDate {
  let start = new Date();
  let end = new Date();

  switch (week) {
    case "current":
      var dates = getEventDates(
        startingHour,
        endingHour,
        moment().startOf("week").toDate()
      );
      start = dates.start;
      end = dates.end;
      break;
    case "next":
      var dates = getEventDates(
        startingHour,
        endingHour,
        moment().startOf("week").add(1, "week").toDate()
      );
      start = dates.start;
      end = dates.end;
      break;
    case "prev":
      var dates = getEventDates(
        startingHour,
        endingHour,
        moment().startOf("week").subtract(1, "week").toDate()
      );
      start = dates.start;
      end = dates.end;
      break;
  }

  const eventObject: EventCalendarDate = {
    id: uuid4(),
    start,
    end,
    status: ["PENDING", "CANCELED", "SCHEDULED"][
      getRandomInt(0, 2)
    ] as AppointmentStatus,
    title: "Event",
    description: "Some note",
  };

  return eventObject;
}
