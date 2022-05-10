import { useEffect, useState } from "react";
import {  AiFillStar } from "react-icons/ai"
import { createRating, getRatings } from "./GameManager";
import "./StarRater.css"
export const StarRater = ({gameId}) => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    
    const newRating = {
        rating: hover
    }
    useEffect(() => {
        getRatings(gameId).then(data => setRating(data))
    }, [])
    return (
        <div className="star_rating">
            {[...Array(10)].map((star, index) => {
                
                index += 1
                return (
                    <button
                        id="rating_button"
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={
                            // if rating is 0
                            () => createRating(gameId, newRating)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}>
                        <span className="star">{AiFillStar()}</span>
                    </button>
                )
            })}
        </div>
    );
};
