import axios from "axios";

export function fetchActivity(id) {
    return axios.get('/api/activities/'+id)
}
