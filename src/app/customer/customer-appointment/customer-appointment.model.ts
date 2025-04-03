
export interface Appointment {
    _id: string,
    customerId: string,
    carId: string,
    mechanicId: string,
    serviceId: string,
    appoDate: string,
    appoStatus: string,
    appoPriceEstimate: number,
    appoActualPrice: number,
    appoNote: String;
} 