export type JWTUserData = {
    email   : string,
    iat     : number,
    name    : string,
    userId  : string,
}

export type AuthContextInfo = {
    user: JWTUserData, //this is the value that holdes the user info
    setUser: React.Dispatch<any> //used to set the user
}