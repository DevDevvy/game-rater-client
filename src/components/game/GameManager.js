export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", { 
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    }).then(getGames)
}
export const editGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, { 
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
}

export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, { 
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
}


export const createReview = (review) => {
    return fetch("http://localhost:8000/reviews", { 
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
}

export const getReviews = (id) => {
    return fetch(`http://localhost:8000/reviews?game=${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const sendEditedGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, { 
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    }).then(getGames)
}

export const createRating = (gameId, rating) => {
    return fetch(`http://localhost:8000/games/${gameId}/ratings`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)
    })
    
}


export const getRatings = (gameId) => {
    return fetch(`http://localhost:8000/ratings?game=${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
export const getGamer = () => {
    return fetch(`http://localhost:8000/gamers`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createPhoto = (gameId, photo) => {
    return fetch(`http://localhost:8000/photos?game=${gameId}`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(photo)
    })
    .then(response => response.json())
}

export const sendSearchQuery = (query) => {
    return fetch(`http://localhost:8000/games?q=${query}`, {
        
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            
        },
        
    })
    .then(response => response.json())
}
export const sortList = (params) => {
    return fetch(`http://localhost:8000/games?orderby=${params}`, {
        
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            
        },
        
    })
    .then(response => response.json())
}

export const getGamerRatingForGame = (id) => {
    return fetch(`http://localhost:8000/ratings?gamer=${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}