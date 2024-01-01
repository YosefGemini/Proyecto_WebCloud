import ProductCard from "../components/products_card/ProductsCard";
import { categories, products } from "../functions/ConstInfo";
import NavigationLayout from "./NavigationLayout";

export default function Products() {
  return (
    <NavigationLayout selectedPage={1}>
      <div className="mt-[70px]">
        <div className=" flex flex-col justify-center">
          <form action="" className="w-full flex justify-center">
            <input type="text" className=" p-2 rounded-lg m-4 w-[30%]" />
            <button className="bg-secondary_blue text-primary_blue p-2 m-4">
              Buscar
            </button>
          </form>
          <div className="flex-row flex">
            {/* categorias */}
            <div className="w-[20%] flex flex-col text-white m-8">
              <h1>Categorias</h1>
              <ul className="pl-5">
                {categories.map((category, index) => (
                    <li key={index} className="my-2">
                        {category}
                    </li>
                    ))}
              </ul>
            </div>
            <div className="w-[60%]">
              <div className=" rounded-lg bg-white">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
              {/* paginacion */}
              <div className="flex justify-center items-center text-white my-10">
                {/* paginador */}
                <button className="m-4">Anterior</button>
                <div className=" p-2  bg-gray-400 border-2 border-black rounded-md">
                  1
                </div>
                <p className="m-4">de</p>

                <div className="m-4">10</div>
                <button className="m-4">Siguiente</button>
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
