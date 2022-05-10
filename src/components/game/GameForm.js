import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getCategories } from "../categories/CategoryManager.js"
import { createGame, getGames, } from './GameManager.js'


export const GameForm = ({setClicked, clicked, updateList}) => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        year_released: 0,
        number_of_players: 0,
        est_time_to_play: 0,
        age_rec: 0,
        category_id: 0
    })

    useEffect(() => {
        getCategories()
        .then(data => setCategories(data))
    }, [])

    const changeGameState = (domEvent) => {
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

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
            <fieldset>
                <div className="form-group">
                    <select name="category_id" required className="form-control"
                        value={currentGame.category}
                        placeholder="Select Category..."
                        onChange={changeGameState}>
                            <option value="0">Choose Category...</option>
                            {
                                categories.map((category, index) => {
                                    return <option key={index} value={category.id} name="category">{category.category}</option>
                                })
                            }
                        </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        year_released: parseInt(currentGame.year_released),
                        number_of_players: parseInt(currentGame.number_of_players),
                        est_time_to_play: parseInt(currentGame.est_time_to_play),
                        age_rec: parseInt(currentGame.age_rec),
                        category_id: parseInt(currentGame.category_id)
                    }

                    // Send POST request to your API
                    createGame(game)
                    .then(updateList)
                    .then(setClicked(!clicked))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}