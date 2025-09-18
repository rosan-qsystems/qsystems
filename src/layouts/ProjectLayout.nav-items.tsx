import {Calendar, Grid, Flag, Globe, List, Waves, TestTube, ListChecks, ChartBar} from "lucide-react";

export const ProjectLayoutNavItems = [
    { label: 'Summary', link: 'summary', icon: <Globe size={16}/> },
    { label: 'Epics', link: 'epic', icon: <Waves size={16}/> },
    { label: 'List', link: 'list', icon: <List size={16}/> },
    { label: 'Backlog', link: 'backlog', icon: <Flag size={16}/> },
    { label: 'Board', link: 'board', icon: <Grid size={16}/> },
    { label: 'Timeline', link: 'timeline', icon: <Calendar size={16}/>},
    { label: 'Testing', link: 'testing', icon: <TestTube size={16}/> },
    { label: 'Compliance', link: 'compliance', icon: <ListChecks size={16}/> },
    { label: 'Report', link: 'report', icon: <ChartBar size={16}/> },
]