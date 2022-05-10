import React from "react"


export const Reviews = ({reviewsList}) => {
    



    return (
        <><h2>Reviews</h2>
            {
                reviewsList?.map(review => {
                    return(
                    <section key={review.id} className="review-container">
                        <p>
                            {review.review} 
                            <br></br>
                            by gamer# {review.gamer.user}
                        </p>
                        
                    </section>
                    )
                })
            }
        </>
    )
}