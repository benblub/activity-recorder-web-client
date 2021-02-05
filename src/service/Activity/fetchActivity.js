import axios from "axios";

export function fetchActivity(id) {
    return axios.get('http://localhost:8000/api/activities/'+id)
}
