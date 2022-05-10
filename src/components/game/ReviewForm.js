import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getCategories } from "../categories/CategoryManager.js"
import { createGame, createReview, getGames, getSingleGame, } from './GameManager.js'


export const ReviewForm = ({setClicked, clicked, updateList}) => {
    const history = useHistory()
    const gameId = useParams()
    const [currentGame, setCurrentGame] = useState({})
    const [review, setReview] = useState({
        review: "",
        game: gameId.gameId
    })
    useEffect(() => {
        getSingleGame(gameId.gameId)
        .then(data => setCurrentGame(data))
    }, [])

    const changeFormState = (domEvent) => {
        const newReview = Object.assign({}, review)
        newReview[domEvent.target.name] = domEvent.target.value
        setReview(newReview)
    }

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">Write your review...</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <textarea  name="review" required autoFocus className="form-control"
                        value={review.review}
                        onChange={changeFormState}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newReview = {
                        review: review.review,
                        game: parseInt(gameId.gameId)
                    }

                    // Send POST request to your API
                    createReview(newReview)
                    .then(() => history.push(`/games/${gameId.gameId}`))
                }}
                className="btn btn-primary">Submit Review</button>
        </form>
    )
}