import React, { useState } from "react"

import { useAppContext } from "../Context/AppContext"

const Search = () => {
  const { state, setState } = useAppContext()
  const [disabledAddBtn, setDisabledAddBtn] = useState<boolean>(true)
  // const [showDropDown, setShowDropdown] = useState<boolean>(false)
  const [customValue, setCustomValue] = useState<string>("")

  const addNewOrIncrement = (inputValue: string) => {
    const fruitObject = state.cartItems.find((fruit) => fruit.name === inputValue)
    if (fruitObject) {
      const updated = state.cartItems.map((fruit) => {
        if (fruit.name === inputValue) {
          return { name: fruit.name, quantity: (fruit.quantity! += 1) }
        }
        return fruit
      })
      setState({ cartItems: updated })
    } else {
      setState({ cartItems: [...state.cartItems, { name: inputValue, quantity: 1 }] })
    }
  }

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setState({ searchedText: event.target.value.toLowerCase() })
    const searchText = event.target.value.toLowerCase()
    const searchedData = state.fruits.filter((item) => {
      return searchText === "" ? item : item.name.toLowerCase().includes(searchText)
    })
    if (searchedData.length === 0) {
      setCustomValue(event.target.value)
      setDisabledAddBtn(false)

      setState({ showDropDown: false })
    } else {
      setState({ showDropDown: true })
      setDisabledAddBtn(true)
    }
    setState({ filteredFruits: searchedData })
  }

  const handleItemClick = (name: string) => {
    addNewOrIncrement(name)

    setState({ showDropDown: false })
  }
  const handleAddBtn = () => {
    addNewOrIncrement(customValue)

    setState({ showDropDown: false })
  }

  return (
    <div className="flex gap-4 ">
      <div className="w-[90%] relative">
        <input
          type="text"
          placeholder="Search Products"
          className="w-full p-3 border border-gray-300 rounded"
          onChange={handleOnchange}
          //onBlur={() => setShowDropdown(false)}
          onFocus={() => state.filteredFruits.length > 0 && setState({ showDropDown: true })}
        />
        {state.showDropDown && (
          <div className="absolute z-50 w-full px-3 py-1 overflow-auto bg-white border border-gray-300 max-h-72">
            <ul>
              {state.filteredFruits.map((fruit) => {
                return (
                  <li
                    key={fruit.name}
                    onClick={() => {
                      handleItemClick(fruit.name)
                    }}
                    className="py-3 cursor-pointer hover:bg-slate-300"
                  >
                    {fruit.name}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      <input
        type="button"
        onClick={handleAddBtn}
        className={`${
          disabledAddBtn ? " bg-gray-200" : " bg-blue-600 hover:bg-blue-500 cursor-pointer"
        } w-[10%] rounded text-white text-center `}
        value="ADD"
      />
    </div>
  )
}
export default Search
