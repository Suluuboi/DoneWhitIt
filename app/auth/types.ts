export type JWTUserData = {
    "email": "mosh@domain.com",
    "iat": 1635325491,
    "name": "Mosh",
    "userId": 1,
}

export type AuthContextInfo = {
    user: JWTUserData, //this is the value that holdes the user info
    setUser: React.Dispatch<any> //used to set the usetr
}