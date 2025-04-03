export interface Payment {
    appointmentId: string;
    customerId:string;
    amount: number;
    paymentMethod: string;
    paymentStatus: string;
}