export enum EEventTicketType {
  GENERAL_ADMISSION = "general_admission",
  PREMIUM = "premium",
  VIP = "vip",
}

export interface ITicket {
  sec: number;
  row: string;
  seat: number;
  type: EEventTicketType;
}

export interface IEvent {
  artist: string;
  tickets: ITicket[];
  banner: string;
  title: string;
  date: {
    start: Date;
    end?: Date;
  };
  venue: string;
  description?: string;
}

export interface IEventDocument extends Document {}
