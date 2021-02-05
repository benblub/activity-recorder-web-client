import axios from "axios";

export function login(email, password) {
    return axios.post('http://localhost:8000/api/login', {
        'email': email,
        'password': password
    })
}