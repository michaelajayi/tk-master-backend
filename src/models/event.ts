import { model, Schema } from "mongoose";
import { EEventTicketType, IEvent, IEventDocument } from "../interfaces/event.interface";

const eventFields: Record<keyof IEvent, any> = {
  ticket_type: {
    type: String,
    enum: Object.values(EEventTicketType),
    default: EEventTicketType.GENERAL_ADMISSION,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  ticket_config: {
    sec: Number,
    row: String,
    seat: Number
  },
  banner: { type: String, required: true },
  title: { type: String, required: true },
  date: {
    start: {type: Date, required: false },
    end: { type: Date, required: false }
  },
  venue: { type: String, required: true},
  description: { type: String, required: false }
};


const eventSchema = new Schema(eventFields, {
  timestamps: true,
  strict: false,
});

const EventModel = model<IEventDocument>(
  'events',
  eventSchema
);

export default EventModel;
