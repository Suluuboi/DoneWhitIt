import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Listing } from '../../api/listings/types';

export enum AccountNavigationPages {
    Account = 'Account',
    Messages = 'Messages',
    UserListings = 'UserListings',
    ListingDetails = 'ListingDetails'
}

export type AccountNavigationParams={
    [AccountNavigationPages.Account] : undefined
    [AccountNavigationPages.Messages] : {}
    [AccountNavigationPages.UserListings] : {}
    [AccountNavigationPages.ListingDetails]: Listing
}

export type AccountSceenProps = NativeStackScreenProps<AccountNavigationParams, AccountNavigationPages.Account>;
export type MessagesSceenProps = NativeStackScreenProps<AccountNavigationParams, AccountNavigationPages.Messages>;
export type UserListingsSceenProps = NativeStackScreenProps<AccountNavigationParams, AccountNavigationPages.UserListings>;

