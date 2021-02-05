import axios from "axios";

export function fetchActivities(
    page,
    description,
    activityDateAfter,
    activityDateBefore,
    orderById,
    orderByActivityDate,
    orderByPerformedTime,
    orderByDescription
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

    if (orderById) {
        params['order[id]'] = orderById
    }

    if (orderByPerformedTime) {
        params['order[performendTime]'] = orderByPerformedTime
    }

    if (orderByDescription) {
        params['order[description]'] = orderByDescription
    }

    if (orderByActivityDate) {
        params['order[activityDate]'] = orderByActivityDate
    }

    let request = axios.get('/api/activities', {
        params,
    })

    return request
}