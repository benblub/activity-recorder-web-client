import axios from "axios";

export function createActivity(
    date,
    time,
    description
) {
    let request = axios.post('/api/activities', {
        activityDate: date,
        performendTime: parseFloat(time),
        description: description,
        user: '/api/users/23'
    })

    return request
}
