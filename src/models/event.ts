import { model, Schema } from "mongoose";
import {
  EEventTicketType,
  IEventDocument,
} from "../interfaces/event.interface";

// Define the ticket schema for each ticket in the event
const ticketSchema = new Schema(
  {
    sec: { type: Number, required: true },
    row: { type: String, required: true },
    seat: { type: Number, required: true },
    type: {
      type: String,
      enum: Object.values(EEventTicketType),
      required: true,
    },
  },
  { _id: false },
);

const eventFields: Record<string, any> = {
  artist: { type: String, required: true },
  tickets: { type: [ticketSchema], required: true },
  banner: { type: String, required: true },
  title: { type: String, required: true },
  date: {
    start: { type: Date, required: true },
    end: { type: Date, required: false },
  },
  venue: { type: String, required: true },
  description: { type: String, required: false },
};

const eventSchema = new Schema(eventFields, {
  timestamps: true,
  strict: false,
});

const EventModel = model<IEventDocument>("events", eventSchema);

export default EventModel;
