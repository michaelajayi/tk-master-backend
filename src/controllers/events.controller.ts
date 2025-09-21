import { Request, Response } from "express";
import EventModel from "../models/event";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventModel.find();

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

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { tickets, banner, artist, title, date, venue, description } =
      req.body;

    // return console.log('req.body', req.body);

    const parsedDate = {
      start: new Date(date.start),
      ...(date.end && { end: new Date(date.end) }),
    };

    const event = new EventModel({
      title,
      description,
      artist,
      date: parsedDate,
      tickets,
      banner,
      venue,
    });

    // return console.log(event);

    await event.save();

    return res.status(201).json({
      message: "Event created successfully",
      event,
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
    const event = await EventModel.findById(id);

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
