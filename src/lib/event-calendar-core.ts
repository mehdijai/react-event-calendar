import moment from "moment";

export class EventCalendarCore {
  private dayHours = 14;
  private startHour = 8;
  private daysCount = 7;

  constructor(private values: EventCalendarDate[]) {}

  setDayHours(value: number) {
    if (value > 0 && value < 24) {
      this.dayHours = value;
    }
  }
  setStartHour(value: number) {
    if (value > 0 && value < 24) {
      this.startHour = value;
    }
  }
  setDaysCount(value: number) {
    if (value > 0 && value < 8) {
      this.daysCount = value;
    }
  }
  getWeekCalendar(week: number) {
    const calendar: EventCalendarCalendar = [];

    let skip = 0;
    for (let day = 0; day < this.daysCount; day++) {
      const dayHours = [];
      for (
        let hour = this.startHour;
        hour < this.startHour + this.dayHours;
        hour++
      ) {
        if (skip > 0) {
          skip--;
          continue;
        }
        const dayEvent = this.values.find(
          (event) =>
            moment(event.start).week() === week &&
            moment(event.start).day() === day + 1 &&
            moment(event.start).hour() == hour
        );
        if (!dayEvent) {
          dayHours.push(null);
        } else {
          const hoursSpan =
            moment(dayEvent.end).hour() - moment(dayEvent.start).hour();

          if (hoursSpan > 1) skip = hoursSpan - 1;
          dayHours.push({
            title: dayEvent.title,
            description: dayEvent.description,
            status: dayEvent.status,
            id: dayEvent.id,
            span: hoursSpan,
          });
        }
      }

      calendar.push(dayHours);
    }

    return calendar;
  }
}
