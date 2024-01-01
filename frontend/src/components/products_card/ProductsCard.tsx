import { Product } from "../../services/products";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {


    return(
        <div className="w-full h-[200px] overflow-hidden">
    {/* Contenido tarjeta */}
    <div className="flex flex-row h-[199px]">
      <div className="h-full rounded-lg">
        <img
        //   src={URL.createObjectURL(product.images[0])}
         src={product.images[0]}
          alt=""
          className="h-full aspect-square object-cover rounded-l-lg"
        />  
      </div>

      <div className="flex flex-col p-4 justify-start w-full">
            {/* nombre del producto */}
            <h1 className="text-xl" >
                {product.name.toUpperCase()}
            </h1>
            <div className="w-full bg-slate-400 h-[1px]">

            </div>
            {/* precio del producto */}
            <h2 className="font-semibold text-2xl my-8">
                USD {product.price}$
            </h2>

      </div>
    </div>
    <div className="w-full h-[1px] bg-primary_blue"></div>
  </div>


    );
  
}
