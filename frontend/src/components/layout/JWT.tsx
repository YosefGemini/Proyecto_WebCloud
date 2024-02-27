import { ReactNode, createContext, useState } from "react";
import { Product } from "../../services/products";

interface JWTContextType {
    buyCart: Product[];
    //user_image: string | null;
    add_product: (product: Product | null) => void;
    delete_product: (product: Product | null) => void;
    clearCart: () => void;
  }
  export const JWTContext = createContext<JWTContextType>({
    buyCart: [],
    //user_image: null,
    add_product: () => {},
    delete_product: () => {},
    clearCart: () => {},
  });
export default function JWT({ children }: { children: ReactNode }) {
  const [buyCart, set_buy_cart] = useState<Product[]>([]);
  
    function add_product(product: Product | null) {
      if (!product) return;
      set_buy_cart([...buyCart, product]);
    };
    function delete_product(product: Product | null) {
      if (!product) return;
      set_buy_cart(buyCart.filter((item) => item.id !== product.id));
    };
    function clearCart() {
      set_buy_cart([]);
    };
  


  
  return (
    <JWTContext.Provider value={{ buyCart, add_product, delete_product, clearCart}}>
      {children}
    </JWTContext.Provider>
  );
}
