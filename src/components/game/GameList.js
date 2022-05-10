import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GameForm } from "./GameForm"
import { getGamer, getGames } from "./GameManager"
import "./GameList.css"



export const GameList = () => {
    const [games, setGames] = useState([])
    const [clicked, setClicked] = useState(false)
    const [gamer, setGamer] = useState({})
    const gamerId = gamer.user_id
    
    useEffect(() => {
        getGames()
        .then(data => setGames(data))
        .then(getGamer)
        .then(data => setGamer(data))
    }, [])
    // update state after click
    const updateList = () => {
        getGames().then(data => setGames(data))
    }
    
    return (
        <>
            <section className="games-list-container">
                <button onClick={()=> setClicked(!clicked)}>REGISTER NEW GAME</button>
                
                { clicked ? <GameForm 
                    setClicked={setClicked} 
                    clicked={clicked}
                    updateList={updateList}
                    /> 
                    : ""}
                    {
                        games.map(game => {
                            
                            return <div key={game.id} className="games">
                                <Link to={`/game/${game.id}/review`}><button className="button">Review Game</button></Link>
                                {gamerId === game.gamer.id ? <Link to={`/edit/${game.id}`}><button className="button">Edit Game</button></Link> : ""}
                                <h2><Link to={`/games/${game.id}`}>{game.title}</Link></h2>
                            </div>
                        })
                    }
                
            </section>
        </>
    )
}