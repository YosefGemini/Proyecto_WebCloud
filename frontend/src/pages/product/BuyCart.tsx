import { useContext } from "react";
import { JWTContext } from "../../components/layout/JWT";
import NavigationLayout from "../NavigationLayout";

export default function buyCart() {
  const { buyCart, delete_product, clearCart } = useContext(JWTContext);

  const total = buyCart.reduce((acc, product) => acc + product.price, 0);

  return (
    <NavigationLayout selectedPage={1}>
      <div className="my-[70px] w-full flex flex-col justify-center items-center min-h-screen">
        <div className="w-[70%] min-h-[600px] bg-white rounded-lg shadow-lg m-2 flex flex-col items-center justify-center">
          <h1 className="text-center text-primary_blue font-normal text-[30px]">
            Carrito de compras
          </h1>
          {buyCart.map((product) => (
            <div key={product.id} className="flex flex-col w-[90%]">
              <div className="flex w-full justify-between items-center">
                <div>
                  <p className="mx-4 font-bold">{product.name}</p>
                  <p className="mx-4">$ {product.price} USD</p>
                </div>

                <button
                  className="m-4 bg-red-400 flex text-white rounded-md p-4 items-center justify-center hover:bg-third_blue duration-300"
                  onClick={() => delete_product(product)}
                >
                  Delete
                </button>
              </div>
              <div className="my-2 w-full h-[2px] bg-slate-500"></div>
            </div>
          ))}
          <button
            className="m-4 w-[50%] bg-green-400 flex text-white rounded-md p-4 items-center justify-center hover:bg-third_blue duration-300"
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
          <h2 className="text-center text-primary_blue font-normal text-[30px]">
            Total: {total}
          </h2>
        </div>
      </div>
    </NavigationLayout>
  );
}
