import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "./style.scss";
import "react-day-picker/dist/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  showOutsideDays = true,
  classNames,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      components={{
        // @ts-ignore
        IconLeft: ({ ...props }) => <ChevronLeft color="currentColor" />,
        // @ts-ignore
        IconRight: ({ ...props }) => <ChevronRight color="currentColor" />,
      }}
      modifiersStyles={{
        selected: {
          backgroundColor: "white",
          color: "hsl(var(--foreground))",
          borderRadius: "0.275rem",
        },
      }}
      style={{
        backgroundColor: "#1a1d21",
        border: "1px solid #363a3d",
        width: "fit-content",
        padding: "1rem",
        borderRadius: "0.3rem"
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export default Calendar;
