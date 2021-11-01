import { StackNavigationProp } from "@react-navigation/stack"
import { ImageSourcePropType } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Listing } from "../../api/listings/types";
import { MaterialCommunityIconsSet } from "../../components/icon/types";

export enum FeedNavigationPages {
    Listings = 'Listings',
    ListingDetails = 'ListingDetails',
    ListingImage = 'ListingImage'
}
//const listing: Listings
export type FeedNavigationParams={
    [FeedNavigationPages.Listings] : undefined
    [FeedNavigationPages.ListingDetails] : Listing
    [FeedNavigationPages.ListingImage] : {  
                                            image_url           : string, 
                                            left_icon           ?: MaterialCommunityIconsSet
                                            handleLeftPress     ?: ()=>void,
                                            right_icon          ?: MaterialCommunityIconsSet,
                                            handleRightPress    ?: ()=>void
                                        }
}

export type ListingsSceenProps = NativeStackScreenProps<FeedNavigationParams, FeedNavigationPages.Listings>;
export type ListingDetailsSceenProps = NativeStackScreenProps<FeedNavigationParams, FeedNavigationPages.ListingDetails>;
export type ListingImageSceenProps = NativeStackScreenProps<FeedNavigationParams, FeedNavigationPages.ListingImage>;

