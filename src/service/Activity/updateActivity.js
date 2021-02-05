import axios from "axios";

export function updateActivity(
    id,
    date,
    time,
    description
) {
    let request = axios.put('http://localhost:8000/api/activities/'+id, {
        activityDate: date,
        performendTime: parseFloat(time),
        description: description,
        user: '/api/users/23'
    })

    return request
}