import { Plus, Minus } from "lucide-react";
import { ProductsObj } from "../pages/pos";
import { useCart } from "../context/cartContext";

interface orderItemProps {
  item: ProductsObj;
}

export function OrderItem({ item }: orderItemProps) {
  const { decrementQuantity, incrementQuantity } = useCart();

  return (
    <div className="flex items-center bg-white shadow-md mb-3 p-4 rounded-xl transition duration-150 ease-in-out hover:shadow-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-orange-500">
            R${item.price}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => decrementQuantity(item)}
              className="p-1 rounded-md bg-orange-400 text-white hover:bg-orange-500 transition duration-150 ease-in-out"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium text-gray-700">
              {item.quantity}
            </span>
            <button
              onClick={() => incrementQuantity(item)}
              className="p-1 rounded-md bg-orange-400 text-white hover:bg-orange-500 transition duration-150 ease-in-out"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
