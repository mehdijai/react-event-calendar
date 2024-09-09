import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
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
        IconLeft: ({ ...props }) => <ChevronLeft width={18} height={18} />,
        // @ts-ignore
        IconRight: ({ ...props }) => <ChevronRight width={18} height={18} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export default Calendar;
