import axios from "axios";

export function GET(url, params, headers) {
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

export function POST(url, params, headers) {
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

export function DELETE(url, params, headers) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {...params}, {...headers})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.data);
            })
    })
}


export function PUT(url, params, headers) {
    return new Promise((resolve, reject) => {
        axios.put(url, {...params}, {...headers})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.data);
            })
    })
}
