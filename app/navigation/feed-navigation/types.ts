import { StackNavigationProp } from "@react-navigation/stack"
import { ImageSourcePropType } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Listing } from "../../api/listings/types";

export enum FeedNavigationPages {
    Listings = 'Listings',
    ListingsDetails = 'ListingsDetails'
}
//const listing: Listings
export type FeedNavigationParams={
    [FeedNavigationPages.Listings] : undefined
    [FeedNavigationPages.ListingsDetails] : Listing
}

export type ListingsSceenProps = NativeStackScreenProps<FeedNavigationParams, FeedNavigationPages.Listings>;
export type ListingsDetailsSceenProps = NativeStackScreenProps<FeedNavigationParams, FeedNavigationPages.ListingsDetails>;

