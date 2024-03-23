export enum CarTypes {
    SEDAN = 'sedan',
    CUPE = 'cupe',
    SPORT = 'sport',
    SUVS = 'suvs',
}

export type CarType = CarTypes

export interface Car {
    company: string,
    model: string,
    type: CarTypes,
    price: number
}