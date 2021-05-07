import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {updateCard, readCard} from "../utils/api/index.js";
import CardForm from "./CardForm";


function EditCard() {
    const [updatedCard, setUpdatedCard] = useState({});
    const deckId = useParams().deckId;
    const cardId = useParams().cardId;

    useEffect(() => {
        readCard(cardId)
        .then((response) => setUpdatedCard(response))
        .catch((error) => console.log(error.message))
    }, [cardId])

    const changeHandler = (event) => {
        setUpdatedCard({id: cardId, deckId: deckId, ...updatedCard, [event.target.name]: event.target.value});
        console.log(updatedCard)
    };

    function editCardSubmitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        updateCard(updatedCard, abortController.signal)
        setUpdatedCard({front: "", back: ""})
        return () => abortController.abort();
    };

    return (
        <div>
        <h3>Edit Card</h3>
        <CardForm front={updatedCard.front} back={updatedCard.back} deckId={deckId} submitHandler={editCardSubmitHandler} changeHandler={changeHandler} />
        </div>
    )
}

export default EditCard;