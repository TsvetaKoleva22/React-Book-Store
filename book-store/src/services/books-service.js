function getAuthHeader(){
    let jwt = sessionStorage.getItem('token');
    if(jwt && jwt.length){
        return {'Authorization': `Bearer ${jwt}`};
    } else{
        return {};
    }
}

export const getAllBooksF = function () {
    return fetch('http://localhost:5000/book/all')
        .then(function (results) {
            return results.json();
        })
        .catch(function (err) {
            console.log(err);
        })
}

export const createBookF = function (bookData) {
    const authHeader = getAuthHeader();

    return fetch('http://localhost:5000/book/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader
        },
        body: JSON.stringify(bookData)
        })
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log(err);
        })
}

export const editBookF = function (advData, id) {
    const authHeader = getAuthHeader();

    return fetch(`http://localhost:5000/book/edit/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader
        },
        body: JSON.stringify(advData)
        })
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log(err);
        })
}

export const buyBookF = function (advData, id) {
    const authHeader = getAuthHeader();

    return fetch(`http://localhost:5000/book/buy/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader
        },
        body: JSON.stringify(advData)
        })
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log(err);
        })
}

export const deleteBookF = function (id) {
    const authHeader = getAuthHeader();

    return fetch(`http://localhost:5000/book/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...authHeader
        },
        })
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log(err);
        })
}

