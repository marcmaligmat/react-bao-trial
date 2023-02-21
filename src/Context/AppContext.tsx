import React, { createContext, ReactNode, useContext, useReducer } from "react"
import { FruitCartInterface, FruitsInterface } from "../App"

export type AppContextType = {
  isLoading: boolean
  errorOnQuery: boolean
  fruits: FruitsInterface[]
  filteredFruits: FruitsInterface[]
  cartItems: FruitCartInterface[]
  showDropDown: boolean
}

interface AppContextInterface {
  state: AppContextType
  setState: React.Dispatch<Partial<AppContextType>>
}

const AppContext = createContext<AppContextInterface>({} as AppContextInterface)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useReducer(dispatcher, {
    isLoading: true,
    errorOnQuery: false,
    fruits: [],
    filteredFruits: [],
    cartItems: [],

    showDropDown: false,
  })

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>
}

const dispatcher = (state: AppContextType, action: Partial<AppContextType>) => ({
  ...state,
  ...action,
})

export const useAppContext = () => useContext(AppContext)
