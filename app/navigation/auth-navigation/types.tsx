import { StackNavigationProp } from "@react-navigation/stack"

export enum AuthNavigationPages {
    Welcome = 'Welcome',
    Login = 'Login',
    Register = 'Register'
}

export type AuthNavigationParams={
    [AuthNavigationPages.Welcome] : undefined
    [AuthNavigationPages.Login] : undefined
    [AuthNavigationPages.Register] : undefined
}

export type AuthNavigationProps<RouteName extends keyof AuthNavigationParams = AuthNavigationPages> 
    = StackNavigationProp<AuthNavigationParams, RouteName>