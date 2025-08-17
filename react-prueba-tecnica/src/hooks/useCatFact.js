import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

export const useCatFact = () => {
  const [fact, setFact] = useState()

  const refreshFact = async () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  // para recuperar la cita al cargar la página
  useEffect(refreshFact, [])
  return { fact, refreshFact }
}
