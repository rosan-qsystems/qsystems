import {Target} from "lucide-react";
import {Text} from "@mantine/core";

export const Logo = ()=>{
    return      <div className="flex items-center gap-2 mb-6">
        <div><Target/></div>
        <Text fw={700}>Projectify</Text>
    </div>
}