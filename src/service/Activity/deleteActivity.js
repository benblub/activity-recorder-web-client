import axios from "axios";

export function deleteActivity(id) {
    let request = axios.delete('/api/activities/'+id)

    return request
}