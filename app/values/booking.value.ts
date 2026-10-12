import type { BookingForm } from "~/types";

export const bookingFormValue: BookingForm = {
  name: "",
  company: "",
  registerdNameCompany: "",
  ruc: "",
  idTax: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  service: "",
  dateBooking: "",
  amount: "" as unknown as number,
  fileBooking: undefined as unknown as File, // <-- Aquí aplicamos el cast para calmar a TypeScript
  methodContact: "email",
  privacy: false,
};
