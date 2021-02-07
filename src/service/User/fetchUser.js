import axios from "axios";

export function fetchUser(userIri) {
    return axios.get(userIri)
}