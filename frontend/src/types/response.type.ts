export type Meta = {
    page:number,
    limit:number,
    total:number
}
export type Response<T> = {
    success:boolean,
    statusCode:number,
    message:string,
    data:T,
    meta:Meta
}