export interface AuthResponse {
    access_token: string;
    id_token: string;
    token_type: string;
    expires_in: number;
    first_logged_in: boolean;
    refresh_token: string;
}
export type AuthStore = {
    user: UserProfile | null;
    token?: AuthResponse | null;
    setUser: (user: UserProfile) => void;
    setTokenDetails: (data: AuthResponse) => void;
    login: ({username, password}: {username:string, password:string}) => void;
    logout: () => void;
    isLoggedIn: boolean;
};

interface Timezone {
    timezone: string;
    tz_label: string;
    utc_offset: number;
    tz_abbrev: string;
    tz_alt: string;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    organization_id: number;
    is_verified: boolean;
    scope: string;
    scope_id: number;
    phone_number: string;
    phone_number_secondary: string;
    created_at: string;
    updated_at: string;
    timezone: Timezone;
}

