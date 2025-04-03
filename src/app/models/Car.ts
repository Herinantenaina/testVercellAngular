
export interface Car {
    _id: string ,
    customerId: string,
    brand: string;
    model: string;
    year: number;
    licensePlate: string;
    vin: string | null;
    createdAt: Date;
    updatedAt: Date;
 }

