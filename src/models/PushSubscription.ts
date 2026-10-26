import mongoose, { Schema, Document } from 'mongoose';

// A browser that allowed push notifications.
// "admin" devices get new-lead alerts; "visitor" devices get new-blog alerts.
export interface IPushSubscription extends Document {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  audience: 'admin' | 'visitor';
  createdAt: Date;
  updatedAt: Date;
}

const PushSubscriptionSchema = new Schema<IPushSubscription>(
  {
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
    audience: { type: String, enum: ['admin', 'visitor'], required: true },
  },
  { timestamps: true }
);

// One row per browser and audience (an admin's browser can also follow the blog)
PushSubscriptionSchema.index({ endpoint: 1, audience: 1 }, { unique: true });

export default mongoose.models.PushSubscription ||
  mongoose.model<IPushSubscription>('PushSubscription', PushSubscriptionSchema);
