import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {updateDeck, readDeck} from "../utils/api/index";


function EditDeck() {
    const [updatedDeck, setUpdatedDeck] = useState({});
    const deckId = useParams().deckId;

    useEffect(() => {
        readDeck(deckId)
        .then((response) => setUpdatedDeck(response))
        .catch((error) => console.log(error.message))
    
    }, [deckId])

    const changeHandler = (event) => {
        setUpdatedDeck({id: deckId,  ...updatedDeck, [event.target.name]: event.target.value});
    };

    function editDeckSubmitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        updateDeck(updatedDeck, abortController.signal);
        setUpdatedDeck({name: "", description: ""});
        return () => abortController.abort();
    };

    return (
        <div>
        <h2>Edit Deck</h2>
        <form id="edit-deck-form" onSubmit={editDeckSubmitHandler}>
            <label for="name">Name</label>
            <input type="text"  id="name" name="name" value={updatedDeck.name} onChange={changeHandler} />
            <label for="description">Description</label>
            <textarea id="description"  name="description" value={updatedDeck.description} onChange={changeHandler}></textarea>
            <Link to={`/decks/${deckId}`}><button>Cancel</button></Link>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
};

export default EditDeck;