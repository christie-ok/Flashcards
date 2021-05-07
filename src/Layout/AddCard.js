import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { createCard, readDeck} from "../utils/api/index.js";
import CardForm from "./CardForm";


function AddCard() {
    const deckId = useParams().deckId;
    const [newCard, setNewCard] = useState({front: "", back: ""});
    const [deck, setDeck] = useState({name: "", description: "", cards: []});

    useEffect(() => {
        readDeck(deckId)
        .then((response) => setDeck(response))
        .catch((error) => console.log(error.message))
    }, [deckId]);

    const changeHandler = (event) => {
        setNewCard({...newCard, [event.target.name]: event.target.value});
    };

    function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        createCard(deckId, newCard, abortController.signal);
        setNewCard({front: "", back: ""});
        return () => abortController.abort();
    };

    return (
        <div>
        <h3>{deck.name}: Add Card</h3>   
        <CardForm submitHandler={submitHandler} changeHandler={changeHandler} deckId={deckId} front={newCard.front} back={newCard.back} />
        </div>
        )
}

export default AddCard;