import axios from "axios";

export function updateActivity(
    id,
    date,
    time,
    description
) {
    let request = axios.put('/api/activities/'+id, {
        activityDate: date,
        performendTime: parseFloat(time),
        description: description,
        user: localStorage.getItem('userIri')
    })

    return request
}