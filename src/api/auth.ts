import {GetRequest, PostRequest} from "../plugins/https.ts";
import {routeConstants} from "../config/global.ts";

export const APILogin = (body: FormData)=>{
    return PostRequest('/tokens/grant', body);
}

export const APIGetMyData = ()=>{
    return GetRequest(routeConstants.PROFILE_URL);
}

export const ForgetPassword = (email: string) => {
  return PostRequest("/settings/general/password/forgot", { email });
};

export const ResetForgetPassword = (data: {
  email: string;
  confirmation_code: string;
  new_password: string;
}) => {
  return PostRequest("/settings/general/password/reset", data);
};