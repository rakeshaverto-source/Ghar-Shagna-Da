import mongoose, { Schema, Document } from 'mongoose';

// Bell notifications in the admin panel (new leads, published blogs).
// Reading or clearing one never changes the lead itself.
export interface IAdminNotification extends Document {
  type: 'lead' | 'blog';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminNotificationSchema = new Schema<IAdminNotification>(
  {
    type: { type: String, enum: ['lead', 'blog'], required: true },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    link: { type: String, default: '' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.AdminNotification ||
  mongoose.model<IAdminNotification>('AdminNotification', AdminNotificationSchema);
