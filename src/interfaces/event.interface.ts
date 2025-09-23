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

export interface IEventDocument extends Document {}
