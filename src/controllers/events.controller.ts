import { Request, Response } from "express";
import EventModel from "../models/event";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventModel.find().populate("tickets");

    return res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({
        message: "Failed to fetch events",
        error: err.message,
      });
    }

    // fallback for non-standard errors
    return res.status(500).json({
      message: "An unexpected error occured",
      err,
    });
  }
};

import TicketModel from "../models/ticket";

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { tickets, banner, artist, title, date, venue, description } =
      req.body;

    const parsedDate = {
      start: new Date(date.start),
      ...(date.end && { end: new Date(date.end) }),
    };

    // Check for duplicate event by title, date.start, and venue
    const duplicateEvent = await EventModel.findOne({
      title,
      "date.start": parsedDate.start,
      venue,
    });

    if (duplicateEvent) {
      return res.status(409).json({
        message:
          "Duplicate event detected: An event with the same title, date, and venue already exists.",
        event: duplicateEvent,
      });
    }

    // Create the event first (tickets will be added after)
    const event = new EventModel({
      title,
      description,
      artist,
      date: parsedDate,
      banner,
      venue,
      tickets: [],
    });

    await event.save();

    // Create ticket documents, referencing the event
    const ticketDocs = tickets.map((ticket: { price: number; quantity: number }) => ({
      ...ticket,
      event: event._id,
    }));

    const savedTickets = await TicketModel.insertMany(ticketDocs);

    // Store ticket IDs in the event
    event.tickets = savedTickets.map((t) => t._id);
    await event.save();

    return res.status(201).json({
      message: "Event created successfully",
      event,
      tickets: savedTickets,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        message: "Failed to create event",
        error: err.message,
      });
    }

    // fallback for non-standard errors
    return res.status(500).json({
      message: "An unexpected error occured",
      err,
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id).populate("tickets");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Event fetched successfully",
      event,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        message: "Failed to fetch event",
        error: err.message,
      });
    }

    return res.status(500).json({
      message: "An unexpected error occured",
      err,
    });
  }
};
