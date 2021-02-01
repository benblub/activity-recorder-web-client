import axios from "axios";

export function fetchActivities(
    page,
    description,
    activityDateAfter,
    activityDateBefore
) {
    const params = {}

    if (page) {
        params.page = page
    }

    if (description) {
        params.description = description
    }

    if (activityDateAfter) {
        params['activityDate[after]'] = activityDateAfter
    }

    if (activityDateBefore) {
        params['activityDate[before]'] = activityDateBefore
    }

    let request = axios.get('http://localhost:8000/api/activities', {
        params,
    })

    return request
}