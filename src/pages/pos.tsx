import {
  Pizza,
  Search,
  Sandwich,
  CakeSlice,
  CupSoda,
  Beer,
  ListRestart,
  Menu,
  MenuSquare,
  MenuIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { CategoryButton } from "../components/categoryButton";
import { OrderSumary } from "../components/orderSumary";
import { CartProvider } from "../context/cartContext";
import { AnimatePresence } from "framer-motion";
import useWindowDimensions from "../hooks/screenSize";

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
      id: "1",
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
      id: "2",
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
      id: "3",
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

  const { width } = useWindowDimensions();
  const [areCategoriesVisible, setAreCategoriesVisible] = useState(
    width > 720 ? true : false
  );

  const [allProducts, setAllProducts] =
    useState<ProductsObj[]>(initialProducts);
  const [displayedProducts, setDisplayedProducts] =
    useState<ProductsObj[]>(initialProducts);
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(
    width > 720 ? true : false
  );

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

  const toggleCategoriesVisibility = () => {
    setAreCategoriesVisible(!areCategoriesVisible);
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
      <div className="min-h-screen py-4 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full max-w-7xl mx-auto">
          <div className="w-full lg:w-3/4 space-y-8">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                Bem-vindo, Victor
              </h2>

              <div className="flex flex-row-reverse gap-1 items-center justify-center">
                <button
                  className={`md:hidden text-white py-2 px-4 rounded transition duration-150 ease-in-out ${
                    areCategoriesVisible ? "bg-gray-500" : "bg-orange-500"
                  }`}
                  onClick={toggleCategoriesVisibility}
                >
                  {areCategoriesVisible ? <MenuSquare /> : <Menu />}
                </button>
                <div className="relative w-full lg:max-w-md">
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
            </div>

            {areCategoriesVisible && (
              <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4">
                {categories.map((category, index) => (
                  <CategoryButton
                    key={index}
                    Props={category}
                    categorySearch={categorySearch}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 overflow-auto p-4 rounded-lg">
              {displayedProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/4">
            <button
              className="md:hidden bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
              onClick={() => setIsOrderSummaryVisible(!isOrderSummaryVisible)}
            >
              {isOrderSummaryVisible ? "Ocultar Resumo" : "Mostrar Resumo"}
            </button>

            <AnimatePresence>
              {isOrderSummaryVisible && <OrderSumary />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
