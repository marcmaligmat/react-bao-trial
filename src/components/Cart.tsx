import { useAppContext } from "../Context/AppContext"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"

import { FruitCartInterface } from "../App"

const Cart = () => {
  const { state, setState } = useAppContext()

  const handleAddIcon = (fruitName: string) => {
    const updated = state.cartItems.map((fruit) => {
      return fruit.name === fruitName ? { ...fruit, quantity: (fruit.quantity! += 1) } : fruit
    })
    setState({ cartItems: updated })
  }

  const handleMinusIcon = (fruitName: string) => {
    const firstStep = state.cartItems.map((fruit) => {
      if (fruit.name === fruitName) {
        return { ...fruit, quantity: (fruit.quantity! -= 1) }
      }

      return fruit
    })

    const target = firstStep.find((item) => item.name === fruitName)

    if (target?.quantity! < 1) {
      const updated = firstStep.filter((item) => item.name !== fruitName)
      setState({ cartItems: updated as FruitCartInterface[] })
    } else {
      setState({ cartItems: firstStep })
    }
  }
  return (
    <>
      {state.cartItems.length > 0 ? (
        state.cartItems.map((item) => {
          return (
            <div key={item.name} className="border border-gray-200 ">
              <div className="flex flex-col justify-between p-5">
                <div key={item.name} className="flex justify-between">
                  <div className="w-3/4">{item.name}</div>
                  <div className="flex items-center justify-center w-1/4 ">
                    <RemoveIcon
                      onClick={() => handleMinusIcon(item.name)}
                      className="mx-3 rounded cursor-pointer hover:bg-red-300"
                    />
                    <div className="flex justify-center w-4 px-4 rounded bg-slate-200">
                      {item.quantity}
                    </div>
                    <AddIcon
                      onClick={() => handleAddIcon(item.name)}
                      className="mx-3 rounded cursor-pointer hover:bg-green-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center bg-no-repeat border-slate-500 h-[400px]">
          <div
            style={{ backgroundImage: "url(./image1.svg)", width: "60px", height: "60px" }}
          ></div>
          <span className="inline-block">No product has benn added</span>
        </div>
      )}
    </>
  )
}
export default Cart
