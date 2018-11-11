import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HighScoreInput from './HighScoreInput'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750;

class App extends Component {
    state = {
        cards: this.generateCards(),      // Liste des cartes
        currentPair: [],                  // Paire actuelle (0,1 ou 2 élements)
        guesses: 0,                       // Tentatives de la partie actuelle
        matchedCardIndices: [],           // Liste des cartes visibles (paires trouvées)
        hallOfFame: null,                 // Tableau des vainqueurs à jour
    }

    // Arrow fx -> bind 'this'
    displayHallOfFame = hallOfFame => {
        this.setState({ hallOfFame });
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

        // array.includes(x) renvoie true si x est dans array
        const indexMatched = matchedCardIndices.includes(index) //indexMatched vaut true si la carte est dans la liste des cartes visibles

        if (currentPair.length < 2) {
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
            // si la carte est dans idexMatched OU que c'est la carte cliquée, on l'affiche, sinon cachée
        }

        // array.includes(x) renvoie true si x est dans array
        if (currentPair.includes(index)) { 
            return indexMatched ? 'justMatched' : 'justMismatched' 
            // si la carte fait partie de la currentPair, et de indexMatched, elle est 'justMatched' sinon 'justMisatched'
        }
        return indexMatched ? 'visible' : 'hidden'
    }

    // update du jeu 
    handleNewPairClosedBy(index) {
        const { cards, currentPair, guesses, matchedCardIndices} = this.state;

        const newPair = [currentPair[0], index];                    // 
        const newGuesses = guesses + 1;                             //
        const matched = cards[newPair[0]] === cards[newPair[1]];    //
        this.setState({currentPair: newPair, guesses: newGuesses}); // maj des données calculées plus haut

        if (matched) {
            this.setState({matchedCardIndices: [...matchedCardIndices, ...newPair] });
            /*
            x: [...y, ...z] // Syntaxe: spread
            étale le contenu des itérables y et z dans x
            ici équivalent à : matchedCardIndices.concat(newPair) vu que matchedCardIndices et newPair sont deux arrays et que matchedCardIndices est la cible
            */
        }
        setTimeout(() => this.setState({currentPair: []}), VISUAL_PAUSE_MSECS); // setState() avec un offset temporel pour avoir le temps de visualiser la paire cliquée avant d'actualiser
    }

    render() {
        const { cards, guesses, hallOfFame, matchedCardIndices } = this.state
        const won = matchedCardIndices.length >= 4
        //    const won = matchedCardIndices.length === cards.length    // won === true si le nombre de cartes visibles === le nombre de cartes en jeu
        return (
            <div className="memory">
                <GuessCount guesses={guesses} />

                {cards.map((card, index) => (  // this.cards.map() fait l'équivalent d'un foreach  
                    <Card
                        card={card}
                        feedback={this.getFeedbackForCard(index)}
                        index={index}
                        // key: obligatoire pour distinguer chaque nouveau composant
                        key={index} // ici utiliser l'index comme key est acceptable mis ça sera pas juste dans plein d'autres cas
                        onClick={this.handleCardClick}
                    />
                ))}

                {
                    won && // si on a gagné
                        (hallOfFame ? (                             // on cherche si un tableau d'honneur existe
                            <HallOfFame entries={hallOfFame} />     // si oui (donc on a saisi le nom) on affiche ce tableau
                        ) : (                                       // si non (donc on n'a pas saisi le nom) on cherche le formulaire d'ajout
                            <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />
                        ))
                }
            </div>
        )
    }
}

export default App