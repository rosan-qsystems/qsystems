import {SignInPage} from "../../pages/auth/SignIn.page.tsx";
import {SignupPage} from "../../pages/auth/Signup.page.tsx";
import {ForgotPasswordPage} from "../../pages/auth/ForgetPassword.page.tsx";
// import {ResetPasswordPage} from "../../pages/auth/ChangePassword.page.tsx";
import {ResetConfirmationPage} from "../../pages/auth/ResetConfirmation.page.tsx";
import { OTPPage } from "../../pages/auth/otp.page.tsx";
import { ResetForgetPasswordPage } from "../../pages/auth/SetForgetPassword.page.tsx";

export const AuthRoutes = [
    {
        path: '',
        component: <SignInPage/>,
        name: 'Sign In',
    },
    {
        path: '/signup',
        component: <SignupPage/>,
        name: 'Sign Up',
    },
    {
        path: '/forgot-password',
        component: <ForgotPasswordPage/>,
        name: 'Forgot Password',
    },
    {
        path: '/reset-password',
        component: <ResetForgetPasswordPage/>,
        name: 'Reset Password',
    },
    {
        path: '/reset-confirmation',
        component: <ResetConfirmationPage/>,
        name: 'Reset Confirmation',
    },
    {
        path: '/otp',
        component: <OTPPage/>,
        name: 'OTP Confirmation',
    }
];