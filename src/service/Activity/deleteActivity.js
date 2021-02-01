import axios from "axios";

export function deleteActivity(id) {
    let request = axios.delete('http://localhost:8000/api/activities/'+id)

    return request
}