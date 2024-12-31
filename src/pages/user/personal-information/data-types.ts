export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
    type:string;
}

export interface Email {
    email: string;
    preferred: string;
    type:string;
}

export interface Phone {
    phone: string;
    preferred: string;
    type:string;
}


export interface Hair {
    color: string;
    type: string;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface CompanyAddress {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

export interface Company {
    department: string;
    name: string;
    title: string;
    address: CompanyAddress;
}

export interface Occupations {
    occupation: string;
    fromDate: string;
    toDate: string;
}
export interface Identifications {
    type : string;
    expiryDate: string;
    file: string | File | null;
}


export interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

export interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: Email[];
    phone: Phone[];
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address[];
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company[];
    occupations: Occupations[];
    identifications: Identifications[];
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}



export interface UserDataList {
    users: UserData[];
    total: number;
    skip: number;
    limit: number;
  }