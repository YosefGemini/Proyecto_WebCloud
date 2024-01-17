import { useContext, useEffect, useMemo, useState } from "react";
import { Product } from "../../services/products";
import ProductCard from "../products_card/ProductsCard";
import { ContextoSearch } from "../../pages/Products";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { search_text } = useContext(ContextoSearch);
  const [currentPage, setCurrentPage] = useState(1);
  //   const [search, setSearch] = useState("");

  const filteredProducts = useMemo(
    () => {
        if (search_text.trim() === '') {
          // Si el texto de búsqueda está vacío, muestra todos los productos
          return products;
        } else {
          // Aplica el filtro en caso contrario
          return generateFilteredProducts();
        }
      },
    // generateFilteredProducts(currentPage),
    [search_text,products]
  );
  


  const maxPage =
    Math.ceil(filteredProducts.length / 5) === 0
      ? 1
      : Math.ceil(filteredProducts.length / 5);

  function generateFilteredProducts(): Product[] {
    if (search_text === "") {
      console.log("no hay nada en el search_text", products);

      return products;
    }

    const filtered = products.filter((product) =>
      [product.name, product.description].some((field) => {
        return field.toLowerCase().includes(search_text.toLowerCase());
      })
    );
    console.log("Productos Filtrados", filtered);
    return filtered;
  }

  const nextPage = () => {
    if (filteredProducts.length > currentPage + 5)
      setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = () => {
    setCurrentPage(0);

  };
  

  useEffect(() => {
    console.log(search_text);
    onSearchChange();
  }, [search_text]);
  //   useEffect(() => {
  //     console.log(search);
  //   }, [search]);

  return (
    <>
      <div className=" rounded-lg bg-white">
        {filteredProducts
          .slice(currentPage, currentPage + 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
      {/* paginacion */}
      <div className="flex justify-center items-center text-white my-10">
        {/* paginador */}
        <button
          className={`m-4 ${currentPage === 0 ? "hidden" : ""}`}
          onClick={prevPage}
        >
          Anterior
        </button>
        <div className=" p-2  bg-gray-400 border-2 border-black rounded-md">
          {Math.floor((currentPage + 5) / 5)}
        </div>
        <p className="m-4">de</p>

        <div className="m-4">{maxPage}</div>
        <button
          className={`m-4  ${currentPage + 1 === maxPage ? "hidden" : ""} `}
          onClick={nextPage}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
