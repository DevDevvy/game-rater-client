import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { EditGame } from "./game/EditGame";
import { GameDetails } from "./game/GameDetails";
import { GameList } from "./game/GameList";
import { getGamer } from "./game/GameManager";
import { ReviewForm } from "./game/ReviewForm";

export const ApplicationViews = () => {


    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/game/:gameId(\d+)/review">
                <ReviewForm />
            </Route>
            <Route exact path="/edit/:gameId(\d+)">
                <EditGame />
            </Route>
            
        </main>
    </>
}