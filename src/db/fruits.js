export const fetchFruits = async () => {
  const response = await fetch(
    "https://cors-anywhere.herokuapp.com/https://fruityvice.com/api/fruit/all"
  )
  if (!response.ok) {
    throw new Error("Something went wrong!")
  }
  return response.json()
}
// ,
//     {
//       headers: {
//         "Access-Control-Allow-Origin": "http://localhost:3001",
//         "Content-Type": "application/json",
//       },
//       allowedHeaders: { "Access-Control-Allow-Origin": "*" },
//     }
