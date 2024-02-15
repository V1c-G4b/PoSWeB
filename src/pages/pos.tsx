import {
  Pizza,
  Search,
  Sandwich,
  CakeSlice,
  CupSoda,
  Beer,
  ListRestart,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { CategoryButton } from "../components/categoryButton";
import { OrderSumary } from "../components/orderSumary";
import { CartProvider } from "../context/cartContext";

export interface ProductsObj {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  image: string;
  category: string;
}

export function PointOfSale() {
  const initialProducts = [
    {
      id: crypto.randomUUID(),
      name: "Pizza de Pepperoni Caseira",
      price: 8.0,
      quantity: 2,
      category: "Pizza",
      details:
        "Uma deliciosa pizza de pepperoni com massa caseira e ingredientes frescos.",
      image:
        "https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg",
    },
    {
      id: crypto.randomUUID(),
      name: "Hambúrguer Artesanal",
      price: 12.0,
      quantity: 1,
      category: "Sandwich",
      details:
        "Hambúrguer feito com carne 100% bovina, queijo cheddar, alface, tomate e nosso molho especial.",
      image:
        "https://img.freepik.com/fotos-gratis/foto-de-delicioso-hamburguer-isolado-no-fundo-branco_125540-3378.jpg",
    },
    {
      id: crypto.randomUUID(),
      name: "Hambúrguer Artesanal",
      price: 12.0,
      quantity: 1,
      category: "Sandwich",
      details:
        "Hambúrguer feito com carne 100% bovina, queijo cheddar, alface, tomate e nosso molho especial.",
      image:
        "https://png.pngtree.com/png-vector/20230417/ourmid/pngtree-food-burger-sauce-png-image_6712846.png",
    },
  ];

  const [allProducts, setAllProducts] = useState<ProductsObj[]>(initialProducts);
  const [displayedProducts, setDisplayedProducts] = useState<ProductsObj[]>(initialProducts);

  const [textSearch, setTextSearch] = useState("");

  const categories = [
    { Icon: ListRestart, label: "Todos" },
    { Icon: Pizza, label: "Pizza" },
    { Icon: Sandwich, label: "Sandwich" },
    { Icon: CakeSlice, label: "Cakes" },
    { Icon: CupSoda, label: "Soda" },
    { Icon: Beer, label: "Drinks" },
  ];

  const categorySearch = (categoryLabel: string) => {
    if (categoryLabel === "Todos") {
      setDisplayedProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === categoryLabel
      );
      setDisplayedProducts(filteredProducts);
    }
  };

  const filterSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const textSearch = event.target.value;

    if (textSearch != "" || null) {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toUpperCase().includes(textSearch.toUpperCase())
      );

      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(allProducts);
    }

    setTextSearch(textSearch);
  };

  return (
    <CartProvider>
      <div className="min-h-screen mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <h2 className="text-4xl font-semibold text-gray-900">
                Bem-vindo, Victor
              </h2>
              <div className="relative w-full sm:max-w-xs">
                <input
                  onChange={filterSearch}
                  value={textSearch}
                  type="text"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  placeholder="Pesquisar..."
                />
                <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 w-full justify-center items-center h-auto">
              {categories.map((category, index) => (
                <CategoryButton
                  key={index}
                  Props={category}
                  categorySearch={categorySearch}
                />
              ))}
            </div>

            <div className="flex flex-row gap-8 overflow-auto flex-wrap max-h-[80vh] justify-center p-4 rounded-lg">
              {displayedProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>

          <OrderSumary />
        </div>
      </div>
    </CartProvider>
  );
}
