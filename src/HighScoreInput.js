import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
    state = {
        winner: ''
    }

    // Update le localstate avec le nom du vainqueur en majuscules
    // Arrow fx for binding 'this'
    handleWinnerUpdate = (event) => {
        this.setState({ 
            winner: event.target.value.toUpperCase() 
        })
    }

    // Persiste le nouveau vainqueur
    // Arrow fx-> bind 'this'
    persistWinner = (event) => {
        event.preventDefault()              
        const newEntry = {
            guesses: this.props.guesses, 
            player: this.state.winner
        }
        saveHOFEntry(newEntry, this.props.onStored)
    }

    render() {
        return (
            <form className="highScoreInput" onSubmit={this.persistWinner}>
                <p>
                    <label>
                        Bravosax ! Entre ton prénom :
                        <input 
                            type="text" 
                            autoComplete="given-name" 
                            onChange={this.handleWinnerUpdate} // modifie le localstate en live
                            value={this.state.winner} 
                        />
                    </label>
                    <button type="submit">J’ai gagné !</button>
                </p>
            </form>
        )
    }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired, 
  onStored: PropTypes.func.isRequired,
}

export default HighScoreInput