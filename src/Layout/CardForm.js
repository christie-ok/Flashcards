import React from "react";
import {Link} from "react-router-dom";

function CardForm({front, back, deckId, submitHandler, changeHandler}) {

    return (
        <form id="card-form" onSubmit={submitHandler}>
            <label for="front">Front</label>
            <textarea id="front" name="front" value={front} onChange={changeHandler}></textarea>
            <label for="back">Back</label>
            <textarea id="back" name="back" value={back} onChange={changeHandler}></textarea>
            <Link to={`/decks/${deckId}`}><button>Done</button></Link>
            <button type="submit">Submit</button>
        </form>
    )
    }

export default CardForm;