import jwtDecode from "jwt-decode";
import { useContext } from "react";
import authStorage from "../auth/auth-storage";
import AuthContext from "../auth/context";

/**A custom hook 
 * that keeps the context of the auth variables and makes 
 * them available to all components in the app without having to import 
 * send them down to every coponent via the props*/

export default function useAuth(){
    const { user, setUser } = useContext(AuthContext)

    /**Logout of the app locally */
    function logOut(){
        try {
            setUser(null)
            authStorage.removeToken()
        } catch (error) {
            console.log('Faild to logout', error)         
        }
    }

    /**Sore logged in details locally */
    function logIn(authToken: string){
        const user = jwtDecode(authToken) 
        setUser(user)
        authStorage.storeToken(authToken)
    }

    return {user, logIn, logOut}
}