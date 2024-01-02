import { ChangeEvent, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/products_card/ProductsCard";
import NavigationLayout from "./NavigationLayout";
import { Category, createCategory, getAllCategories, getCategoryById } from "../services/category";
import { Product, get_all_products } from "../services/products";

interface IData {
  categories: Category[];
  products: Product[];
}



export default function Products() {
  const [search, setSearch] = useState<string>("");

  // const [category_info, setCategory_info] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [products, setProducts] = useState<Product[]>([]);
  const [dataItems, setDataItems] = useState<IData>({
    categories: [],
    products: [],
  });

  const filteredProducts = useMemo(
    () => generateFilteredProducts(currentPage),
    [search]
  );


  const maxPage =
    Math.ceil(filteredProducts.length / 5) === 0
      ? 1
      : Math.ceil(filteredProducts.length / 5);

  function generateFilteredProducts(correntPage: number): Product[] {
    if (search === "") {
      return dataItems.products;
    }
    const filteredProducts = dataItems.products.filter((product) =>
      [product.name, product.description].some((field) => {
        return field.toLowerCase().includes(search.toLowerCase());
      })
    );
    return filteredProducts;
  }

  const nextPage = () => {
    if (filteredProducts.length > currentPage + 5)
      setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = (text: string) => {
    setCurrentPage(0);
    setSearch(text);
  };

  useEffect(() => {
    //console.log(search_text);
    onSearchChange(search);
  }, [search]);

  useEffect(() => {
    //console.log(search_text);
    const get_products = async () => {
      const category = await getAllCategories();
      if (!category) return;
      const category_data =await category.json();
      console.log(category_data);

      
      const products = await get_all_products();

      if (!products) return;


      const products_data =await products.json();
      console.log(products_data);

      setDataItems({...dataItems, categories: category_data, products: products_data});
      
    }
    get_products();
  }, []);

  return (
    <NavigationLayout selectedPage={1}>
      <div className="mt-[70px]">
        <div className=" flex flex-col justify-center">
          <form action="" className="w-full flex justify-center ">
            <input type="text" className=" p-2 rounded-lg m-4 w-[30%]" value={search} onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)}/>
            <button className="bg-secondary_blue text-primary_blue p-2 m-4">
              Buscar
            </button>
          </form>
          <div className="flex-row flex">
            {/* categorias */}
            <div className="w-[20%] flex flex-col text-white m-8">
              <h1>Categorias</h1>
              <ul className="pl-5">

                
                {dataItems.categories.map(
                  (category, index) =>
                    (
                      <li key={index} className="my-2">
                        {category.name}
                      </li>
                    ) 
                )}
              </ul>
            </div>
            <div className="w-[60%]">
              <div className=" rounded-lg bg-white">
                {dataItems.products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
              {/* paginacion */}
              <div className="flex justify-center items-center text-white my-10">
                {/* paginador */}
                <button className="m-4" onClick={prevPage}>Anterior</button>
                <div className=" p-2  bg-gray-400 border-2 border-black rounded-md">
                  {currentPage}
                </div>
                <p className="m-4">de</p>

                <div className="m-4">{maxPage}</div>
                <button className="m-4" onClick={nextPage} >Siguiente</button>
              </div>
            </div>

            {/* productos */}
          </div>
          <footer className="w-full h-[200px] bg-slate-400"></footer>
        </div>
      </div>
    </NavigationLayout>
  );
}
