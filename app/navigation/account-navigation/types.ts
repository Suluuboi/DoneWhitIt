import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum AccountNavigationPages {
    Account = 'Account',
    Messages = 'Messages'
}

export type AccountNavigationParams={
    [AccountNavigationPages.Account] : undefined
    [AccountNavigationPages.Messages] : {}
}

export type AccountSceenProps = NativeStackScreenProps<AccountNavigationParams, AccountNavigationPages.Account>;
export type MessagesSceenProps = NativeStackScreenProps<AccountNavigationParams, AccountNavigationPages.Messages>;

