export const fetchFruits = async () => {
  const response = await fetch("https://fruityvice.com/api/fruit/all")
  if (!response.ok) {
    throw new Error("Something went wrong!")
  }
  return response.json()
}
