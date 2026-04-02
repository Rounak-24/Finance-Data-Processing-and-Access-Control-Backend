export interface IUser {
    email:string
    password:string
    fullname:string
    role:string
    isActive:Boolean
    phone?:string
    refreshToken?:string
}

export interface IRecord {
    amount:number
    type:string
    category:string
    date:Date
    description?:string
}

export interface IAccessDecodedPayload {
    _id:string,
    fullname:string,
    isActive: boolean,
    role: string
}

export interface IRefreshDecodedPayload {
    _id:string,
    fullname:string,
    isActive: boolean,
    role: string,
    phone: string
}

