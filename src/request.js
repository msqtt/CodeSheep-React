import axios from "axios";

export function get(url, params, headers) {
    return new Promise((resolve, reject) => {
        axios.get(url, {...params}, {...headers})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.data);
            })
    })
}

export function post(url, params, headers) {
    return new Promise((resolve, reject) => {
        axios.post(url, {...params}, {...headers})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.data);
            })
    })
}
