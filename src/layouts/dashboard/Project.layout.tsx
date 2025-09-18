import {Routes} from "react-router";
import {ProjectAvatars} from "../../components/modules/dashboard/projects/ProjectAvatars.tsx";
import {Card} from '@mantine/core';
import {NavLink} from "react-router-dom";
import {ProjectLayoutNavItems} from "../ProjectLayout.nav-items.tsx";

export const ProjectLayout = () => {
  return <main className={'flex gap-sm'} style={{height: "calc(100vh - 130px)"}}>
    <div>
      <ProjectAvatars/>
    </div>
    <div className="w-[250px]">
      <Card withBorder className={'h-full'}>
        {ProjectLayoutNavItems.map((v,key)=>(
            <NavLink className={'px-xs py-xs items-center rounded-sm project-nav-item flex gap-xs'} to={v.link} key={key}>
              <div>
                {v.icon}
              </div>
              <div>{v.label}</div>
            </NavLink>
        ))}
      </Card>
    </div>
    <div>
      <Routes>

      </Routes>
    </div>
  </main>;
};
