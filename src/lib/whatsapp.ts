import { business } from '../config'
const link = (m: string) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(m)}`
export const generalBooking = () => link('Hello Triple G Beauty HQ, I would like to enquire about booking an appointment.')
export const styleBooking = (name: string) =>
  link(`Hello Triple G Beauty HQ, I'm interested in booking ${name}. Please share the booking details.`)
