import { ChangeEvent, createContext, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/products_card/ProductsCard";
import NavigationLayout from "./NavigationLayout";
import { Category, createCategory, getAllCategories, getCategoryById } from "../services/category";
import { Product, get_all_products } from "../services/products";
import ProductList from "../components/product_list/ProductList";

interface IData {
  categories: Category[];
  products: Product[];
}


export const ContextoSearch = createContext({ search_text: "" });

export default function Products() {
  
  // const [search, setSearch] = useState<string>("");

  const [search_text, set_search_text] = useState("");

  // const [category_info, setCategory_info] = useState<Category[]>([]);
  // const [products, setProducts] = useState<Product[]>([]);
  const [dataItems, setDataItems] = useState<IData>({
    categories: [],
    products: [],
  });


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
          <form action="" className="w-full flex justify-center items-center ">
            <label className="text-white" >Buscar: </label>
            <input type="text" className=" p-2 rounded-lg m-4 w-[30%]" value={search_text} onChange={(e: ChangeEvent<HTMLInputElement>) =>
              set_search_text(e.target.value)}/>
            {/* <button className="bg-secondary_blue text-primary_blue p-2 m-4">
              Buscar
            </button> */}
          </form>
          <div className="flex-row flex min-h-[70vh]">
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
              <ContextoSearch.Provider value={{ search_text }}>
                <ProductList products={dataItems.products} /> 
              </ContextoSearch.Provider>

              {/* <ProductList products={dataItems.products} /> */}
              
            </div>

            {/* productos */}
          </div>
          <footer className="w-full h-[200px] bg-slate-400"></footer>
        </div>
      </div>
    </NavigationLayout>
  );
}
