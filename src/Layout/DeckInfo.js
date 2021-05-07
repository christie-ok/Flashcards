import React, {useEffect, useState} from "react";
import {Link, useParams, useRouteMatch} from "react-router-dom";
import {readDeck, deleteCard} from "../utils/api/index";


function DeckInfo() {
const [deck, setDeck] = useState({name: "", description: "", cards: []});
const deckId = useParams().deckId;
const url = useRouteMatch().url;


useEffect(() => {
    readDeck(deckId)
    .then((response) => setDeck(response))
    .catch((error) => console.log(error.message))

}, [deckId])

const deleteCardHandler = (event) => {
    const response = window.confirm("Are you sure you want to delete this card?");
    if (response) {
        const cardToDelete = event.target.parentNode.id;
        deleteCard(cardToDelete);
        event.target.parentNode.setAttribute("hidden", "true");
    }
}

    return (
    <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`${url}/edit`}><button>Edit</button></Link>
        <Link to={`${url}/study`}><button>Study</button></Link>
        <Link to={`${url}/cards/new`}><button>Add Cards</button></Link>
        <button>Delete</button>
        <h2>Cards</h2>
        <ul>
            {deck.cards.map((card) => {
                const {front, back, id} = card;
                return (
                    <li className="border" key={id} id={id}>
                        <p>{front}</p>
                        <p>{back}</p>
                        <Link to={`${url}/cards/${id}/edit`}><button>Edit</button></Link>
                        <button onClick={deleteCardHandler}>Delete</button>
                    </li>
                )
            })}
        </ul>
    </div>
    )
}

export default DeckInfo;