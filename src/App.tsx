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

  return (
    <div className="app">
      <h1>React Event Calendar</h1>
      <EventCalendar values={events} />
      <div className="links">
        <a
          target="_blank"
          href="https://github.com/mehdijai/react-event-calendar"
        >
          Github Repo
        </a>
        <span>React Event Calendar - 2024</span>
        <a target="_blank" href="https://github.com/mehdijai">
          @mehdijai
        </a>
      </div>
    </div>
  );
}
