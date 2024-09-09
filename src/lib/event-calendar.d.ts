declare type AppointmentStatus = "PENDING" | "CANCELED" | "SCHEDULED";

declare interface EventCalendarDate {
  start: Date;
  end: Date;
  title: string;
  description?: string;
  status: AppointmentStatus;
  id: string;
}

declare interface EventCalendarValue {
  title: string;
  description?: string;
  status: AppointmentStatus;
  id: string;
  span: number;
}

declare interface EventCalendarProps {
  config?: {
    initialDate?: Date;
    hoursPerDay?: number;
    hoursStart?: number;
    daysCount?: number;
  };
  values: EventCalendarDate[];
  onEventSelect?: (id: string) => void;
}

declare type EventCalendarCalendar = (EventCalendarValue | null)[][];

declare type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};
