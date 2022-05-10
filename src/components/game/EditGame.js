import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getCategories } from "../categories/CategoryManager.js"
import { createGame, getGames, getSingleGame, sendEditedGame, } from './GameManager.js'


export const EditGame = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const gameId = useParams()

    // get all game_categories for specific game
    // put them into state 

    useEffect(() => {
        getSingleGame(gameId.gameId)
        .then(data => setCurrentGame(data))
    }, [gameId])

    useEffect(() => {
        getCategories()
        .then(data => setCategories(data))
    }, [])

    const changeGameState = (domEvent) => {
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }
    // const changeCheckedBoxes = (domEvent) => {
    //     // get state
    //     const copy = {...currentGame}
    //     // if dom event name is category...
    //     if(domEvent.target.name === "category") {
    //         // if there is no target.name in state, create empty category array
    //         if(!(domEvent.target.name in copy)) {
    //             copy["categories"] = []
    //         }
    //         let val = parseInt(domEvent.target.id)
    //         // check if event was checked, if so, push the new event into category list 
    //         if (domEvent.target.checked) {
    //             // find corresponding category that matches target.id
    //             copy[domEvent.target.name].push(categories.find(category => category.id === val))
    //         } else {
    //             copy[domEvent.target.name] = copy[domEvent.target.name].filter(category => category.id !== val)
    //         }
    //         setCurrentGame(copy)
    // }}

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year: </label>
                    <input type="number" name="year_released" required className="form-control"
                        value={currentGame.year_released}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players"># Players: </label>
                    <input type="number" name="number_of_players" required className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="est_time_to_play">Estimated Game Length: </label>
                    <input type="number" name="est_time_to_play" required className="form-control"
                        value={currentGame.est_time_to_play}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_rec">Recommended Age: </label>
                    <input type="number" name="age_rec" required className="form-control"
                        value={currentGame.age_rec}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    
                            {
                                categories.map((category, index) => {
                                    let checked_status = false
                                    if ("category" in currentGame) {
                                        if (currentGame.category.length > 0) {
                                            let found_category = currentGame.category.find(cat => cat.id === category.id)
                                            if (found_category) {
                                                checked_status = true
                                            } else {
                                                checked_status = false
                                            }
                                        } else {
                                            checked_status = false
                                        }
                                    }
                                    return <>
                                    <input type="checkbox" 
                                        name="category"
                                        key={index} 
                                        onChange={changeCheckedBoxes} 
                                        checked={checked_status}
                                        id={category.id} />
                                    <label key={category.id}>{category.category}</label>
                                    </>
                                })
                            }
                        
                </div>
            </fieldset> */}
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    // let categoriesToAdd = []
                    // if(currentGame.category.length > 0) {
                    //     categoriesToAdd = currentGame.category.map(category => category.id)
                    // }
                    const game = {
                        id: currentGame.id,
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        year_released: parseInt(currentGame.year_released),
                        number_of_players: parseInt(currentGame.number_of_players),
                        est_time_to_play: parseInt(currentGame.est_time_to_play),
                        age_rec: parseInt(currentGame.age_rec),
                        category_id: parseInt(currentGame.category[0])
                    }

                    // Send POST request to your API
                    sendEditedGame(game)
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}