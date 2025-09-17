import {create} from "zustand/react";
import {
    clearStorage,
    getFullToken,
    getUser,
    saveFullToken,
    saveUser
} from "../../../utils/helper/tokenStorage.helper.ts";
import type { AuthResponse, AuthStore } from "./auth.interface.ts";


export const useAuthStore = create<AuthStore>((set) => ({
    user: getUser(),
    isLoggedIn: false,
    token: getFullToken(),
    setUser: (user) => {
        set({user})
        saveUser(user);
    },
    setTokenDetails: (data?:AuthResponse | null) => {
        if(data){
            set({
                token:data
            });
            saveFullToken(data);
        }
    },
    login: (data: {username:string, password:string}) => {
        console.log(data);
    },
    logout: () => {
        set({
            user: null,
            isLoggedIn: false,
            token: null
        });
        clearStorage();
    }
}));