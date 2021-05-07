import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {listDecks, deleteDeck} from "../utils/api/index";


function DeckList() {
   const [deckList, setDeckList] = useState([]);

useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
    .then((response) => setDeckList(response))
    .catch((error) => console.log(error.message))
    return () => abortController.abort();

}, []);

function deleteDeckClickHandler({target}) {
    const deckToDelete = target.parentNode.id;
    const response = window.confirm("Are you sure you want to delete?");
    if (response) {
        deleteDeck(deckToDelete).catch((error) => console.log(error.message))
        target.parentNode.setAttribute("hidden", "true");

    }
}

    return (
        <div>
        <Link to="/decks/new"><button>Create Deck</button></Link>
        <ul>
            {deckList.map((deck) => {
                const {name, description, cards, id} = deck;
                return (
                    <li className="border" key={id} id={id}>
                        <h4>{name}</h4>
                        <br />
                        <p>{description}</p>
                        {cards.length} cards
                        <br />
                        <Link to={`/decks/${id}`}><button>View</button></Link>
                        <Link to={`/decks/${id}/study`}><button>Study</button></Link>
                        <button onClick={deleteDeckClickHandler}>Delete</button>
                    </li>

                )
            })}
        </ul>

        </div>
    )
}

export default DeckList;