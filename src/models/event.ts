import { model, Schema } from "mongoose";
import { IEventDocument } from "../interfaces/event.interface";

const eventFields: Record<string, any> = {
  artist: { type: String, required: true },
  tickets: [{ type: Schema.Types.ObjectId, ref: "tickets" }],
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
