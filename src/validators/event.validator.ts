import { z } from "zod";
import { EEventTicketType } from "../interfaces/event.interface";

export const ticketSchema = z.object({
  sec: z.number().nonoptional(),
  row: z.string().nonempty().nonoptional(),
  seat: z.number().nonoptional(),
  type: z.enum(EEventTicketType),
});

export const eventSchema = z.object({
  artist: z.string().nonempty().nonoptional(),
  title: z.string().min(1, "Title is required"),
  tickets: z.array(ticketSchema).min(1, "At least one ticket is required"),
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
      path: ["end"],
    }),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().optional(),
});
