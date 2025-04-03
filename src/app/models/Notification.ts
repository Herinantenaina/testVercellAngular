export interface Notification {
    _id: string;
    userId: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: Date;
    appointmentId?: string; // Optional as per your schema
  }