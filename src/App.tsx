import { useQuery } from "react-query"
import React, { useEffect } from "react"
import "./styles.css"
import { fetchFruits } from "./db/fruits"
import { useAppContext } from "./Context/AppContext"
import Product from "./components/Product"

export interface FruitsInterface {
  name: string
}

export interface FruitCartInterface extends FruitsInterface {
  quantity?: number
}

const App: React.FC = () => {
  const { state, setState } = useAppContext()
  const { data: fruits, isLoading: isLoadingRQ, error } = useQuery("fruits", fetchFruits)

  useEffect(() => {
    if (fruits) {
      setState({ fruits })
      setState({ filteredFruits: fruits })
    }
  }, [fruits, setState])

  if (isLoadingRQ) return <div>Loading</div>

  if (error) return <div>Error</div>

  return (
    <div className="relative App">
      {state.showDropDown && (
        <div
          className="absolute z-30 w-screen h-[90vh] p-0 m-0 opacity-0"
          onClick={() => setState({ showDropDown: false })}
        ></div>
      )}

      <Product />
    </div>
  )
}
export default App
