import { useState, useEffect } from 'react'
import { getImageUrl } from '../services/imageUrl.js'

export const useCatImage = ({ fact }) => {
  const [imageUrl, setImageUrl] = useState()

  // para recuperar la imagen al tener una cita nueva
  useEffect(() => {
    if (!fact) return
    const firstThreeWords = fact.split(' ', 3).join(' ')
    console.log(firstThreeWords)
    getImageUrl(firstThreeWords).then(newImageUrl => setImageUrl(newImageUrl))
  }, [fact])

  return { imageUrl }
}
