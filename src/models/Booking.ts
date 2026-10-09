import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  productTitle: string;
  customerName: string;
  phone: string;
  eventDate: string;
  rentalDuration: string;
  city: string;
  notes?: string;
  status: 'new' | 'contacted' | 'booked' | 'returned' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    productTitle: { type: String, required: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    eventDate: { type: String, default: '' },
    rentalDuration: { type: String, default: '3 Days' },
    city: { type: String, default: 'Punjab' },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'booked', 'returned', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
