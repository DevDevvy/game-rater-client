import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GameForm } from "./GameForm"
import { getGamer, getGames, sendSearchQuery } from "./GameManager"
import "./GameList.css"



export const GameList = () => {
    const [games, setGames] = useState([])
    const [gamer, setGamer] = useState({})
    const [clicked, setClicked] = useState(false)
    const [search, setSearch] = useState("")
    const [params, setParams] = useState()
    const gamerId = gamer.user_id
    // get gamer provides user id ^^
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
    const changeSearchState = (e)=> {
        const chosen = e.target.value
        setParams(chosen)
        .then(sortList(params))
    }
    return (
        <>  
            <select value={params}
                        onChange={changeSearchState}>
                <option>Choose sort option</option>
                <option value="yearReleased">Release Year</option>
                <option value="estimatedPlayTime">Estimated Play Time</option>
                <option value="designer">Designer</option>
            </select>
            {/* search bar and button */}
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <button onClick={()=>sendSearchQuery(params, search).then(data=> setGames(data))}>Search</button>

            <section className="games-list-container">
                <button onClick={()=> setClicked(!clicked)}>REGISTER NEW GAME</button>
                {/* ternary to show game form in dom to make new game */}
                { clicked ? <GameForm 
                    setClicked={setClicked} 
                    clicked={clicked}
                    updateList={updateList}
                    /> 
                    : ""}
                    {
                        games.map(game => {
                            
                            return <div key={game.id} className="games">
                                {/* link to review game */}
                                <Link to={`/game/${game.id}/review`}><button className="button">Review Game</button></Link>
                                {/* ternary to show edit button for user made games */}
                                {gamerId === game.gamer.id ? <Link to={`/edit/${game.id}`}><button className="button">Edit Game</button></Link> : ""}
                                {/* link to game details */}
                                <h2><Link to={`/games/${game.id}`}>{game.title}</Link></h2>
                            </div>
                        })
                    }
                
            </section>
        </>
    )
}