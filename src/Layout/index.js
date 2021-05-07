import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList"
import CreateDeck from "./CreateDeck"
import DeckInfo from "./DeckInfo"
import StudyDeck from "./StudyDeck"
import EditDeck from "./EditDeck"
import AddCard from "./AddCard"
import EditCard from "./EditCard"
import NavBar from "./NavBar"

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <NavBar />
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <NavBar />
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <NavBar />
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <NavBar />
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <NavBar />
            <EditCard />
          </Route>
          <Route path="/decks/:deckId">
            <NavBar />
            <DeckInfo />
          </Route>
          
        <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
