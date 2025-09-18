import {Calendar} from "@mantine/dates";

export const DashboardCalendar = ()=>{
    return (
        <Calendar
            styles={{

            }}
            getDayProps={(date) => {
                const d = new Date(date);
                const today = new Date();

                const isToday =
                    d.getDate() === today.getDate() &&
                    d.getMonth() === today.getMonth() &&
                    d.getFullYear() === today.getFullYear();

                return {
                    style: {
                        backgroundColor: isToday ? "#228be6" : undefined,
                        color: isToday ? "white" : undefined,
                        borderRadius: isToday ? "50%" : undefined,
                        fontWeight: isToday ? "700" : undefined,
                    },
                };
            }}
        />
    );
}