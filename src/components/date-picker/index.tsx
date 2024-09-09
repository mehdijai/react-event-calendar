import { endOfWeek, startOfWeek } from "date-fns";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Calendar from "@/components/calendar";
import "./style.scss";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setShowCalendar(!showCalendar);
    },
    [showCalendar]
  );

  useEffect(() => {
    document.addEventListener("click", () => setShowCalendar(false));
  }, []);

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
      <div className="date-picker-input__wrapper" onClick={toggleCalendar}>
        <CalendarIcon width={18} height={18} />
        <span>
          {selectedWeek?.from ? (
            selectedWeek.to ? (
              <>
                {moment(selectedWeek.from).format("DD/MM/YYYY")} -{" "}
                {moment(selectedWeek.to).format("DD/MM/YYYY")}
              </>
            ) : (
              moment(selectedWeek.from).format("DD/MM/YYYY")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </span>
      </div>
      <div
        className={cn("date-picker", {
          show: showCalendar,
        })}
        onClick={(e) => e.stopPropagation()}
      >
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
