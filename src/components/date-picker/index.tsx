import { endOfWeek, startOfWeek } from "date-fns";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "../calendar";
import "./style.scss";

function dateInRange(date: Date, range: DateRange) {
  return moment(date).isBetween(range.from, range.to, undefined, "()");
}

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  unselectOnSelected?: boolean;
  value?: Date;
  onSelected?: (range: DateRange | undefined) => void;
}

export default function DatePicker({
  unselectOnSelected,
  value,
  onSelected,
}: DatePickerProps) {
  const [selectedWeek, setSelectedWeek] = useState<DateRange | undefined>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });

  useEffect(() => {
    if (value) {
      setSelectedWeek({
        from: startOfWeek(value),
        to: endOfWeek(value),
      });
    }
  }, [value]);
  return (
    <div className="date-picker_wrapper">
      <div className="date-picker shad-dialog">
        <Calendar
          mode="range"
          onDayClick={(day) => {
            if (
              unselectOnSelected &&
              selectedWeek &&
              dateInRange(day, selectedWeek)
            ) {
              onSelected && onSelected(undefined);
            } else {
              onSelected &&
                onSelected({
                  from: startOfWeek(day),
                  to: endOfWeek(day),
                });
            }
          }}
          selected={selectedWeek}
          defaultMonth={selectedWeek?.from}
        />
      </div>
    </div>
  );
}
