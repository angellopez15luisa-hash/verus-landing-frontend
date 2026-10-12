import { z } from "zod";
import type { bookingSchema } from "~/schemas";

export type Booking = z.infer<typeof bookingSchema>;

export type BookingForm = Booking;
