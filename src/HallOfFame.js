import React from 'react';
import PropTypes from 'prop-types';

import './HallOfFame.css'

const HallOfFame = ({ entries }) => (
  <table className="hallOfFame">
    <tbody>
        {entries.map(({ date, guesses, id, player }) => (
            <tr key={id}>
                <td className="date">{date}</td>
                <td className="guesses">{guesses}</td>
                <td className="player">{player}</td>
            </tr>
        ))}
    </tbody>
  </table>
)

HallOfFame.propTypes = {
  entries: PropTypes.arrayOf(                 // .arrayOf: entries est un array d'objets
    PropTypes.shape({                         // .shape: objet dont les clés sont connues
      date: PropTypes.string.isRequired,
      guesses: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      player: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default HallOfFame

// == Internal helpers ==============================================

export const FAKE_HOF = [
  { id: 4, guesses: 28, date: '28/03/2019', player: 'Turfu' },
  { id: 3, guesses: 40, date: '11/10/2018', player: 'Johnny' },
  { id: 2, guesses: 20, date: '10/10/2018', player: 'Billy' },
  { id: 1, guesses: 91, date: '06/10/2018', player: 'Perry' },
  { id: 0, guesses: 38, date: '14/10/2018', player: 'Puppy' },
]

const HOF_KEY = '::Memory::HallofFame'
const HOF_MAX_SIZE = 10

// sauvegarder une entrée 
export function saveHOFEntry(entry, onStored) {
  entry.date = new Date().toLocaleDateString()
  entry.id = Date.now()

  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]')
  const insertionPoint = entries.findIndex(
    ({ guesses }) => guesses >= entry.guesses
  )

  if (insertionPoint === -1) {
    entries.push(entry)
  } else {
    entries.splice(insertionPoint, 0, entry)
  }
  if (entries.length > HOF_MAX_SIZE) {
    entries.splice(HOF_MAX_SIZE, entries.length)
  }

  localStorage.setItem(HOF_KEY, JSON.stringify(entries))
  onStored(entries)
}