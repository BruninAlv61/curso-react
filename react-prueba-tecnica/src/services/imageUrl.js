export const getImageUrl = async (firstThreeWords) => {
  const res = await fetch(`https://cataas.com/cat/says/${firstThreeWords}?fontSize=50&fontColor=red&json=true`)
  const data = await res.json()
  const { url } = data
  return url
}
