import React, { createContext, useContext, ReactNode, useState } from "react";
import { ProductsObj } from "../pages/pos"; // Ajuste o caminho conforme necessário

interface CartContextType {
  cartProducts: ProductsObj[];
  addProductToCart: (product: ProductsObj) => void;
  removeProductFromCart: (productID: string) => void;
  clearCart: () => void;
  decrementQuantity: (productOg:ProductsObj) => void;
  incrementQuantity: (productOg:ProductsObj) => void;
}

const CartContextDefaultValues: CartContextType = {
  cartProducts: [],
  addProductToCart: () => {},
  decrementQuantity: () => {},
  incrementQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(CartContextDefaultValues);

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ProductsObj[]>([]);

  const addProductToCart = (productToAdd: ProductsObj) => {
    if (productToAdd.quantity <= 0) {
      return;
    }

    setCartProducts((currentProducts) => {
      const existingProductIndex = currentProducts.findIndex(
        (p) => p.id === productToAdd.id
      );

      if (existingProductIndex !== -1) {
        return currentProducts.map((product, index) =>
          index === existingProductIndex
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        const newProduct = { ...productToAdd, quantity: 1 };
        return [...currentProducts, newProduct];
      }
    });

    productToAdd.quantity--;
  };

  const removeProductFromCart = (productId: string) => {
    setCartProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  const incrementQuantity = (productOg:ProductsObj) => {
    setCartProducts((currentProducts) => {
      return currentProducts.map((product) => {
        if (product.id === productOg.id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    });
  };
  
  const decrementQuantity = (productOg:ProductsObj) => {
    setCartProducts((currentProducts) => {
      return currentProducts.map((product) => {
        if (product.id === productOg.id && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        else if(product.id === productOg.id && product.quantity == 1){
          removeProductFromCart(productOg.id)
        }
        return product;
      });
    });
  };
  

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        clearCart,
        decrementQuantity,
        incrementQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
