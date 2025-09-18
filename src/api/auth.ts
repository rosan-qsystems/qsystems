import {GetRequest, PostRequest} from "../plugins/https.ts";
import {routeConstants} from "../config/global.ts";

export const APILogin = (body: FormData)=>{
    return PostRequest('/tokens/grant', body);
}

export const APIGetMyData = ()=>{
    return GetRequest(routeConstants.PROFILE_URL);
}