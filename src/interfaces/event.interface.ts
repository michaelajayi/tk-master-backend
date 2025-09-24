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

import { Types } from "mongoose";

export interface IEvent {
  artist: string;
  tickets: Types.ObjectId[]; // Array of Ticket IDs
  banner: string;
  title: string;
  date: {
    start: Date;
    end?: Date;
  };
  venue: string;
  description?: string;
}

import { ITicketDocument } from "./ticket.interface";

export interface IEventDocument extends Document {
  artist: string;
  tickets: (Types.ObjectId | ITicketDocument)[];
  banner: string;
  title: string;
  date: {
    start: Date;
    end?: Date;
  };
  venue: string;
  description?: string;
}
