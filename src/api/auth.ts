import {GetRequest, PostRequest} from "../plugins/https.ts";
import {routeConstants} from "../config/global.ts";

export const APILogin = (body: FormData)=>{
    return PostRequest('/tokens/grant', body);
}

export const APIGetMyData = ()=>{
    return GetRequest(routeConstants.PROFILE_URL);
}

export const APISignUp = (data: any) => {
  return PostRequest("/users/sign-up", data);
};

export const ValidateUserNameEmail = (queryParams: Record<string, string>) => {
  const queryString = new URLSearchParams(queryParams).toString();
  return GetRequest(`/users/validate-unique?${queryString}`);
};

export const ConfirmSignUp = (data: { username: string; confirmation_code: string }) => {
  return PostRequest("/users/sign-up/confirm", data);
}

export const ResendConfirmationCode = (data: { username: string }) => {
  return PostRequest("/users/confirmations/resend", data);
}
