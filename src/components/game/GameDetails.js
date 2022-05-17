import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ActionPhotoForm } from "./ActionPhotoForm"
import { getGamer, getGamerRatingForGame, getReviews, getSingleGame } from "./GameManager"
import { Reviews } from "./Review"
import { StarRater } from "./StarRater"


export const GameDetails = () => {
    const [game, setGame] = useState([])
    const [reviewsList, setReviews] = useState([])
    const [gamerRating, setGamerRating] = useState([])
    const gameId = useParams()
    const [clicked, setClicked] = useState(false)
    const [gamer, setGamer] = useState({})

    useEffect(() => {
        getGamer()
            .then(data => setGamer(data))
    }, [])

    useEffect(() => {
        getSingleGame(gameId.gameId)
            .then(data => setGame(data))
            .then(getReviews(gameId.gameId))
            .then(data => setReviews(data))
    }, [])

    useEffect(() => {
        if (gamer.id){
            getGamerRatingForGame(gamer.id)
            .then(data => setGamerRating(data))
        }
    }, [gamer])



    
    return (
        <>
            <section className="game-container">
                { gamerRating.length > 0 ? <p>You voted: {gamerRating[0]?.rating} stars</p> : <StarRater gameId={gameId.gameId}/>}
                <h2 className="games-detail">Games detail:</h2>
                <h2>{game?.title}</h2>
                by {game?.designer} released in {game?.year_released}
                <p>{game?.description}</p>
                <p>Players: {game?.number_of_players} --- Age: {game?.age_rec} --- Time to Play: {game?.est_time_to_play}
                </p>
            </section>
            <button onClick={()=> setClicked(!clicked)}>Upload Action Picture</button>
            { clicked ? <ActionPhotoForm game={game}/> : "" }
            { reviewsList?.length > 0 ? <Reviews reviewsList={reviewsList}/> : "" }
        </>
    )
}