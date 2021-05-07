import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck} from "../utils/api/index";
import ReactDOM from 'react-dom'


function StudyDeck() {
    const [deck, setDeck] = useState({name: "", description: "", cards: []});
    const [card, setCard] = useState({front: "", back: "", id: null, deckId: null})
    const deckId = useParams().deckId;
    
    useEffect(() => {
        readDeck(deckId)
        .then((response) => setDeck(response))
        .catch((error) => console.log(error.message))
    }, [deckId])

    useEffect(() => {
        if (deck.cards.length) setCard(deck.cards[0])
    }, [deck])

    if (deck.cards.length <= 2) {
        return (
                <div>
                    <h3>Not enough cards.</h3>
                    <p>You need at lease 3 cards to study.  There are only {deck.cards.length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`}><button>Add Cards</button></Link>
                </div>
        )
    }
    
    
    
    const nextHandler = ({target}) => {

        setCard((currentCard) => {
            const index = deck.cards.indexOf(currentCard)
            if (index+1 === deck.cards.length) {
                const result = window.confirm("Restart deck?")
                return deck.cards[0]
            }
            return deck.cards[index+1]
            });
         
        const closest = target.closest("#card")
        const frontSide = closest.querySelector("#front")
        const backSide = closest.querySelector("#back")
        const nextButton = closest.querySelector("#next")
        const flipButton = closest.querySelector("#flip")
    
        ReactDOM.unmountComponentAtNode(closest.querySelector("#next-placeholder"))
        frontSide.removeAttribute("hidden")
        backSide.setAttribute("hidden", "true")
        flipButton.removeAttribute("disabled")
    }

    const flipHandler = (event) => {
        const flipButton = event.target;
        flipButton.setAttribute("disabled", "true");

        const parent = event.target.closest("div");
        const nextButtonElement = (<button id='next' onClick={nextHandler}>Next</button>);

        ReactDOM.render(nextButtonElement, parent.querySelector("#next-placeholder"));

        const cardFront = parent.querySelector("#front");
        const cardBack = parent.querySelector("#back");
        cardFront.setAttribute("hidden", "true");
        cardBack.removeAttribute("hidden")
    }
    



    return (
        <div>
        <h2>Study: {deck.name}</h2>
        <div className="border" id="card">
            <h4>Card {deck.cards.indexOf(card) + 1} of {deck.cards.length}</h4>
            <p id="front">{card.front}</p>
            <p id="back" hidden>{card.back}</p>
            <button id="flip" onClick={flipHandler}>Flip</button>
            <div id="next-placeholder"></div>
        </div>
        </div>
    )
}

export default StudyDeck;