import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGamer, getReviews, getSingleGame } from "./GameManager"
import { Reviews } from "./Review"
import { StarRater } from "./StarRater"


export const GameDetails = () => {
    const [game, setGame] = useState([])
    const [reviewsList, setReviews] = useState([])
    const gameId = useParams()


    useEffect(() => {
        getReviews(gameId.gameId)
        .then(data => setReviews(data))
    }, [])

    useEffect(() => {
        getSingleGame(gameId.gameId)
        .then(data => setGame(data))
    }, [])


    return (
        <>
            <section className="game-container">
                <StarRater gameId={gameId.gameId}/>
                <h2 className="games-detail">Games detail:</h2>
                <h2>{game.title}</h2>
                by {game.designer} released in {game.year_released}
                <p>{game.description}</p>
                <p>Players: {game.number_of_players} --- Age: {game.age_rec} --- Time to Play: {game.est_time_to_play}
                </p>
            </section>
            {reviewsList.length > 0 ? <Reviews reviewsList={reviewsList}/> : ""}
        </>
    )
}