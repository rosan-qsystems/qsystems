import {Link} from "react-router";
import {Button} from '@mantine/core';
export const ActivitiesList = ()=>{
    const getNavigationRoute= (entityType, metadata)=>{
        const queryParams = {
            epic: metadata.epic_id ?? null,
            story: metadata.story_id ?? null,
        };
        const navRoute = {
            "tests": `/project/boards/${metadata.project_id}/overlay/review-test-cases?${queryString.stringify(queryParams)}`,
            "prd": `/ideation/${metadata.project_id}/overlay/prd`,
            "task": `/project/boards/${metadata.project_id}/overlay/review-tasks?${queryString.stringify(queryParams)}`,
            "story": `/project/boards/${metadata.project_id}/overlay/stories?${queryString.stringify(queryParams)}`,
            "epic": `/project/boards/${metadata.project_id}/overlay/stories?${queryString.stringify(queryParams)}`,
        }

    }
    const handleRedirect = (notif) => {
        const { entity_type, metadata, id: notifId, mark_as_read } = notif;
        let navigateRoute = getNavigationRoute(entity_type, metadata);
        navigate(navigateRoute);
        if (!mark_as_read) {
            setNotificationId(notifId);
        }
    };

    const activitiesList = [
        { label: 'this is a '}
    ]
    return <div>
        <div className={"text-lg"}>Activities</div>
        <div>
            <div>this is a notification</div>
            <div className={'pointer-cursor text-primary-700 text-sm'} onClick={handleRedirect} size={'xs'} variant={'subtle'}>EPICs</div>
        </div>
    </div>
}