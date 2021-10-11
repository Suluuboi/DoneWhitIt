import { StackNavigationProp } from "@react-navigation/stack"
import { ImageSourcePropType } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum FeedNavigationPages {
    Listings = 'Listings',
    ListingsDetails = 'ListingsDetails'
}

export type FeedNavigationParams={
    [FeedNavigationPages.Listings] : undefined
    [FeedNavigationPages.ListingsDetails] : {
        title:string,
        price: string,
        description: string,
        image: ImageSourcePropType
    }
}

export type ListingsSceenProps = NativeStackScreenProps<FeedNavigationParams, FeedNavigationPages.Listings>;
export type ListingsDetailsSceenProps = NativeStackScreenProps<FeedNavigationParams, FeedNavigationPages.ListingsDetails>;

