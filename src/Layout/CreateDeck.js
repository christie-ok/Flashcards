import React, {useState} from "react";
import {Link} from "react-router-dom";
import {createDeck} from "../utils/api/index";


function CreateDeck() {
    const [newDeck, setNewDeck] = useState({});

    const changeHandler = (event) => {
        setNewDeck({...newDeck, [event.target.name]: event.target.value});
    };

    function deckSubmitHandler(event) {
        event.preventDefault();
        createDeck(newDeck);
        setNewDeck({name: "", description: ""});
    }

    return (
        <div>
        <h3>Create Deck</h3>
        <form id="create-deck-form" onSubmit={deckSubmitHandler}>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" value={newDeck.name} onChange={changeHandler}/> 
            <br />
            <label for="description">Description</label>
            <textarea id="description" name="description" value={newDeck.description} onChange={changeHandler}></textarea>
            <br />
            <Link to="/"><button>Cancel</button></Link>
            <button type="submit">Submit</button>
        </form>        
    </div>
    )
}

export default CreateDeck;