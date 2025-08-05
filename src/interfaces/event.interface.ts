export enum EEventTicketType {
  GENERAL_ADMISSION = "general_admission",
  PREMIUM = "premium",
  VIP = "vip",
}

export interface IEvent {
  ticket_type: EEventTicketType;
  artist: string;
  ticket_config: {
    sec: number;
    row: string;
    seat: number;
  };
  banner: string;
  title: string;
  date: {
    start: Date,
    end?: Date,
  };
  venue: string;
  description?: string;
}

export interface IEventDocument extends Document {}
