import { EventCalendarCore } from "@/lib/event-calendar-core";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./style.scss";
import { cn } from "@/lib/utils";
import { addWeeks, formatHour, getDayName, subWeeks } from "@/lib/date-utils";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Tooltip } from "../tooltip";
import DatePicker from "../date-picker";

export default function EventCalendar({
  values,
  config,
  onEventSelect,
}: EventCalendarProps) {
  const [date, setDate] = useState(config?.initialDate || new Date());
  const [hoursCols, setHoursCols] = useState(config?.hoursPerDay || 14);
  const [_hoursStart, setHoursStart] = useState(config?.hoursStart || 8);

  const eventCalendarCore = useMemo(
    () => new EventCalendarCore(values),
    [values]
  );

  const [calendarContent, setCalendarContent] = useState<EventCalendarCalendar>(
    []
  );

  useEffect(() => {
    if (
      config?.hoursPerDay &&
      config?.hoursPerDay > 0 &&
      config?.hoursPerDay < 24
    ) {
      setHoursCols(config?.hoursPerDay);
      eventCalendarCore.setDayHours(config?.hoursPerDay);
    }
    if (
      config?.hoursStart &&
      config?.hoursStart > 0 &&
      config?.hoursStart < 24
    ) {
      setHoursStart(config?.hoursStart);
      eventCalendarCore.setStartHour(config?.hoursStart);
    }
    if (config?.daysCount && config?.daysCount > 0 && config?.daysCount < 9) {
      eventCalendarCore.setDaysCount(config?.daysCount);
    }
    if (config?.initialDate) {
      setDate(config?.initialDate);
    }
  }, [
    eventCalendarCore,
    config?.hoursPerDay,
    config?.hoursStart,
    config?.daysCount,
    config?.initialDate,
  ]);

  useEffect(() => {
    setCalendarContent(eventCalendarCore.getWeekCalendar(moment(date).week()));
  }, [date, eventCalendarCore]);

  const updateDate = useCallback((range: DateRange | undefined) => {
    if (range?.from && range.to) {
      setDate(range.from);
    }
  }, []);
  return (
    <div className="event-calendar">
      <div className="controls">
        <button
          className="control-icon"
          onClick={() => setDate(subWeeks(date))}
        >
          <ChevronLeft width={20} height={20} />
        </button>
        <div className="period">
          <DatePicker value={date} onSelected={updateDate} />
        </div>
        <button
          className="control-icon"
          onClick={() => setDate(addWeeks(date))}
        >
          <ChevronRight width={20} height={20} />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: hoursCols }, (_, i) => {
              return (
                <th className="hour-header" key={i}>
                  <span className="hour-value">
                    {formatHour(_hoursStart + i)}:00
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {calendarContent.map((value, i) => (
            <tr key={i}>
              <td className="day-col">
                <span
                  className={cn("day-value", {
                    today: moment().isoWeekday() === i + 1,
                  })}
                >
                  <span>{getDayName(i + 1)}</span>
                  <span>
                    {moment(date)
                      .day(i + 1)
                      .format("DD/MM")}
                  </span>
                </span>
              </td>
              {value.map((cellValue, j) => {
                return (
                  <td
                    className="value-cell"
                    key={j}
                    colSpan={cellValue?.span || 1}
                  >
                    {cellValue && (
                      <Tooltip>
                        <Tooltip.Trigger>
                          <div
                            className={cn(
                              "event",
                              cellValue.status.toLowerCase()
                            )}
                            key={cellValue.id}
                            onClick={() =>
                              onEventSelect && onEventSelect(cellValue.id)
                            }
                          >
                            {cellValue.title}
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          {cellValue.description}
                        </Tooltip.Content>
                      </Tooltip>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
