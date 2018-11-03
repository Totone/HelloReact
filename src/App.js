import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends Component {
  state = {
    cards: this.generateCards(),      // Liste des cartes
    currentPair: [],                  // Paire actuelle (0,1 ou 2 élements)
    guesses: 0,                       // Tentatives de la partie actuelle
    matchedCardIndices: [],           // Liste des cartes visibles
  }

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  // fonction fléchée pour garder le bind de this
  handleCardClick = index => {
    const {currentPair} = this.state;

    if (currentPair.length === 2) {return}
    if (currentPair.length === 0) {
      this.setState({currentPair: [index]});
      return;
    }
    this.handleNewPairClosedBy(index);
  }

  // set l'apparence d'une carte (visible ou non)
  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state

    //array.includes(x) renvoie true si x est dans array
    const indexMatched = matchedCardIndices.includes(index) //indexMatched vaut true si la carte est dans la liste des cartes visibles
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
      // si la carte est dans idexMatched OU que c'est la carte cliquée, on l'affiche, sinon cachée
    }
  
    //array.includes(x) renvoie true si x est dans array
    if (currentPair.includes(index)) { 
      return indexMatched ? 'justMatched' : 'justMismatched' 
      // si la carte fait partie de la currentPair, et de indexMatched, elle est 'justMatched' sinon 'justMisatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }

  render() {
    const { cards, guesses, matchedCardIndices } = this.state
    const won = matchedCardIndices.length === cards.length    // won === true si le nombre de cartes visibles === le nombre de cartes en jeu
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        
        {cards.map((card, index) => (  //this.cards.map() fait l'équivalent d'un foreach  
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            index={index}
            // key: obligatoire pour distinguer chaque nouveau composant
            key={index} // ici utiliser l'index comme key est acceptable mis ça sera pas juste dans plein d'autres cas
            onClick={this.handleCardClick}
          />
        ))}

        {won && <HallOfFame entries={FAKE_HOF}/>}
      </div>
    )
  }
}

export default App