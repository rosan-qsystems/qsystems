import {create} from "zustand/react";

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

type AuthStore = {
    user: User;
    token: string;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    login: ({username, password}: {username:string, password:string}) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: {
        firstName: '',
        lastName: '',
        email: ''
    },
    token: '',
    setUser: (user) => set({user}),
    setToken: (token) => set({token}),
    login: ({username, password}: {username:string, password:string}) => {
        console.log(username, password);
        set({
            user: {
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin@prodline.com'
            }, token: '123'
        });
    },
    logout: () => set({
        user: {firstName: '', lastName: '', email: ''},
        token: ''
    })
}));