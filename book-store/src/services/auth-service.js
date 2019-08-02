export const registerFetch = function (userData) {
    return fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      }).then(response => response.json())
        .catch(function (err) {
            console.log(err);
        })
}

export const loginFetch = function (userData) {
    return fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      }).then(response => response.json())
        .catch(function (err) {
            console.log(err);
        })
}