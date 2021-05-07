import React, {useEffect, useState} from "react";
import {Link, useRouteMatch, useParams} from "react-router-dom";
import {readDeck} from "../utils/api/index";



function NavBar() {
    const {path, params} = useRouteMatch();
    const [deck, setDeck] = useState({name: "", description: "", cards: []});
    const deckId = useParams().deckId;

    useEffect(() => {
        readDeck(deckId)
        .then((response) => setDeck(response))
        .catch((error) => console.log(error.message))
    }, [deckId]);

    if (path === "/decks/new") {
        return (
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>

        )
    }

    if (path === "/decks/:deckId") {
        return (
            <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
      </nav>
        )
    }

    if (path === "/decks/:deckId/study") {
        return (
            <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item" aria-current="page"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Study</li>

        </ol>
      </nav>
        )
    }

    if (path === "/decks/:deckId/edit") {
        return (
            <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item" aria-current="page"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>

        </ol>
      </nav>
        )
    }
    
    if (path === "/decks/:deckId/cards/new") {
        return (
            <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item" aria-current="page"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Add Card</li>

        </ol>
      </nav>
        )
    }

    if (path === "/decks/:deckId/cards/:cardId/edit") {
        
        return (
            <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item" aria-current="page"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Edit Card {params.cardId}</li>

        </ol>
      </nav>
        )
    }

    return (
        <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
    )
}

export default NavBar;