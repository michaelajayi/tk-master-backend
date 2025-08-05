import express from "express";
import validate from "../middlewares/validate";
import { eventSchema } from "../validators/event.validator";
import { addEvent, getEvents } from "../controllers/events.controller";

const router = express.Router();

// get events
router.get("/events", getEvents);

// add event
router.post("/events", validate(eventSchema), addEvent);

export default router;
