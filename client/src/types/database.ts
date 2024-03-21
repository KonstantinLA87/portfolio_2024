export interface CarsCompany {
    company: string
    items: Car[]
}

export interface Car {
    name: string
    type: string
}

export enum CarTypes {
    SEDAN = 'sedan',
    CUPE = 'cupe',
    SPORT = 'sport',
    SUVS = 'suvs',
}

export type CarType = CarTypes