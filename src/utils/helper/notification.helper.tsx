import { notifications } from "@mantine/notifications";

const success= (message:string)=>{
    notifications.show({
                color:"green",
                title: 'Success',
                message: message
            });
}

const error= (message:string)=>{
    notifications.show({
                color:"red",
                title: 'Error',
                message: message
            });
}

export const notify = {
    success, 
    error
}