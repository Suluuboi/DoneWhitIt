import { ImageSourcePropType } from "react-native"

type MessageUser = {
    id: number,
    name: string
}

export type AppMessage = {
    content     : string,
    dateTime    : number,
    fromUser    : MessageUser
    id          : number,
    listingId   : number,
    toUser      : MessageUser
    image?      : ImageSourcePropType
}