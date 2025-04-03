
export interface Appointment {
  _id: string;
  customerId: string;
  carId: string;
  mechanicId: string;
  serviceId: string;
  appoDate: Date;
  appoStatus: string;
  appoPriceEstimate: number;
  appoNotes: string;
  serviceName?: string;
  serviceAmount?: number;
  carLicensePlate?: string;
  serviceDesc?: string;
  carModel?: string;
}
