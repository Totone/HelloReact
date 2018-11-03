import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends Component {
  cards = this.generateCards()

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
  handleCardClick = (card) => {
    console.log('clicked on', card, this)
  }

  render() {
    const won = true
    return (
      <div className="memory">
        <GuessCount guesses={0} />
        
        {this.cards.map((card, index) => (  //this.cards.map() fait l'équivalent d'un foreach  
          <Card
            card={card}
            feedback="visible"
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