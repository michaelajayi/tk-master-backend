import { z } from "zod";
import { EEventTicketType } from "../interfaces/event.interface";

const isDev = process.env.NODE_ENV;

export const eventSchema = z.object({
  ticket_type: z.enum(EEventTicketType).default(EEventTicketType.GENERAL_ADMISSION),
  artist: z.string().nonempty().nonoptional(),
  title: z.string().min(1, "Title is required"),
  ticket_config: z
    .object({
      sec: z.number().nonoptional(),
      row: z.string().nonoptional(),
      seat: z.number().nonoptional(),
    })
    .nonoptional(),
  banner: z.url({
    message: "Banner must be a valid URL",
  }),
  date: z
    .object({
      start: z.coerce.date().nonoptional(),
      end: z.coerce.date().optional(),
    })
    .refine((d) => !d.end || d.end >= d.start, {
      message: "`end` date must not be earlier than `start` date",
      path: ["end"], // points error to `date.end`
    }),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().optional(),
});
