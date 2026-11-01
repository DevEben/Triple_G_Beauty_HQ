import { business } from '../config'
const link = (m: string) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(m)}`
export const generalBooking = () => link("Hello Triple G Beauty and Braids, I'd like to make a hair appointment.")
export const styleBooking = (name: string) =>
  link(`Hello Triple G Beauty and Braids, I'm interested in booking ${name}. Please share the booking details.`)
