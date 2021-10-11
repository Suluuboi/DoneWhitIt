import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountNavigationParams } from '../account-navigation/types';
import { FeedNavigationParams } from "../feed-navigation/types";

export enum AppNavigationPages {
    Feed = 'Feed',
    ListingEdit = 'ListingEdit',
    User = 'User'
}

export type AppNavigationParams={
    [AppNavigationPages.Feed] : NavigatorScreenParams<FeedNavigationParams>
    [AppNavigationPages.ListingEdit] : undefined
    [AppNavigationPages.User] : NavigatorScreenParams<AccountNavigationParams>
}

export type ListingEditSceenProps = NativeStackScreenProps<AppNavigationParams, AppNavigationPages.ListingEdit>;
