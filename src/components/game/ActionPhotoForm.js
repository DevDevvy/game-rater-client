import { useState } from "react";
import { createPhoto } from "./GameManager";

export const ActionPhotoForm = ({game})=> {
    const [base64String, setBase64] = useState()
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setBase64(base64ImageString)
            // Update a component state variable to the value of base64ImageString
        });
    }
    return (<>
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="game_id" value={game.id} />
            <button onClick={() => {
                
                const new_photo = {
                    game_image: base64String,
                    game_id: game.id
                }
                createPhoto(game.id, new_photo)
                // Upload the stringified image that is stored in state
            }}>Upload</button>
        </>
    )
}