import { z } from "zod";
import type { contactSchema } from "~/schemas";

export type Contact = z.infer<typeof contactSchema>;

export type ContactForm = Contact;
