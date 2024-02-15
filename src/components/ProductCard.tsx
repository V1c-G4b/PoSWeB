// Componente ProductCard.jsx
import { ShoppingCart } from "lucide-react";
import { ProductsObj } from "../pages/pos";
import { useCart } from "../context/cartContext";

interface ProductProps {
  product: ProductsObj;
}

export function ProductCard({ product }: ProductProps) {


  const { addProductToCart } = useCart();



  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative w-72 h-96 p-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <button
        onClick={() => addProductToCart(product)}
        className="absolute top-0 right-0 m-4 p-2 bg-white/80 rounded-md shadow-md cursor-pointer"
      >
        <ShoppingCart className="text-orange-500 w-6 h-6" />
      </button>
      <div className="p-4 h-48 flex flex-col justify-between space-y-2">
        <div>
          <h3 className="font-semibold text-xl text-gray-800 h-14">
            {product.name}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">
            {product.details}
          </p>
        </div>
        <div className="font-bold text-lg text-orange-500">
          R${product.price}{" "}
          <span className="text-base font-normal text-gray-500">
            / {product.quantity} UND
          </span>
        </div>
      </div>
    </div>
  );
}
