import express from "express";
import validate from "../middlewares/validate";
import { eventSchema } from "../validators/event.validator";
import { addEvent, getEvents } from "../controllers/events.controller";

const router = express.Router();

// get events
router.get("/", getEvents);

// add event
router.post("/", validate(eventSchema), addEvent);

export default router;
