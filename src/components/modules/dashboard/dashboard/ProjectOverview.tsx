import {useMemo} from "react";
import {DonutChart} from "@mantine/charts";
import {Dot} from "lucide-react";

export const ProjectOverview = () => {
    const data = useMemo(() => ([
        {name: 'Completed', value: 100, color: 'indigo'},
        {name: 'Review', value: 400, color: 'green'},
        {name: 'Pending', value: 600, color: 'pink'},
    ]), [])
    return <div className={'h-full flex flex-col'}>
        <div className="text-lg">Project Overview</div>
        <div className="flex justify-center flex-grow">
            <DonutChart data={data} mx={'auto'} size={120} />
        </div>
        {data.map(((v,key)=>(
            <div className={'flex'}>
                <div className="icon"><Dot color={v.color} size={24}/></div>
                <div className="">{v.value}</div>
                <div className={'w-[100px]'}>{v.name}</div>
            </div>
        )))}
    </div>
}