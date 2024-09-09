import "@/styles/main.scss";
import EventCalendar from "@/components/event-calendar";
import { generateEvent } from "@/data/appointments.mock";

export default function App() {
  const dayHours = 14;
  const startHour = 8;

  const events: EventCalendarDate[] = [
    generateEvent(startHour, startHour + dayHours, "current"),
    generateEvent(startHour, startHour + dayHours, "current"),
    generateEvent(startHour, startHour + dayHours, "next"),
    generateEvent(startHour, startHour + dayHours, "prev"),
  ];
  console.log(events);

  return (
    <>
      <EventCalendar values={events} />
    </>
  );
}
