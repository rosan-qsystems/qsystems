import { BaseTheme } from "./theme"
export const MainContainer =(props:any)=>{
    return (
        <BaseTheme>
        {props.children}
        </BaseTheme>
        )

}