import { Schema, model, Types, Document } from "mongoose";
import { EEventTicketType } from "../interfaces/event.interface";

export interface ITicketDocument extends Document {
  sec: number;
  row: string;
  seat: number;
  type: EEventTicketType;
  event: Types.ObjectId; // Reference to parent event
}

const ticketSchema = new Schema<ITicketDocument>(
  {
    sec: { type: Number, required: true },
    row: { type: String, required: true },
    seat: { type: Number, required: true },
    type: {
      type: String,
      enum: Object.values(EEventTicketType),
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TicketModel = model<ITicketDocument>("tickets", ticketSchema);

export default TicketModel;
