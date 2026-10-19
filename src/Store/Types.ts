export interface Data {
    id: any,
    name: string,
    job: string,
    email: string,
    age: any,
    avatar: string
}

export interface Users {
    users: Data[]
    loading: boolean
}