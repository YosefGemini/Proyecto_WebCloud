import { download_file } from "../../services/files";
import { Product } from "../../services/products";

interface ProductCardProps {
  product: Product;
}
import not_found_file from "../../assets/no_found_file.jpg";
import loading_logo from "../../assets/cargando.gif";
import { useEffect } from "react";
import { useState } from "react";
// import no_image from "../../assets/no_image.png";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }: ProductCardProps) {
  const [file, setFile] = useState<Blob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [existImg, setExistImg] = useState<boolean>(false);
  const history = useNavigate();
  // const not_found_file = new Blob([not_found_file]);

  async function download_first_image(file_id: string): Promise<Blob> {
    const resFile = await download_file(file_id);
    console.log("El archivo es: ", resFile);

    if (!resFile) return new Blob([not_found_file]);
    console.log("El tipo de datos es :", typeof resFile);
    // const fileres = resFile as Blob;
    return resFile as Blob;
  }

  function handleClick() {
    console.log("Click en la imagen");
    history(`/products/${product.id}`);
  }

  useEffect(() => {
    setLoading(true);

    if (!product.files[0]) {
      console.log("No hay archivos en " + product.name);
      setLoading(false);
      return;
    }

    console.log("el file id es: ", product.files[0].id);
    download_first_image(product.files[0].id)
      .then((res) => {
        // setExistImg(true);
        setFile([res]);
      })
      .catch((err) => {
        console.log("Error al descargar la imagen", err);
      });
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-[200px] overflow-hidden">
      {/* Contenido tarjeta */}
      {loading ? (
        <div className="flex flex-row h-[199px]">
          <div className="h-full rounded-lg">
            <img
              //   src={URL.createObjectURL(product.images[0])}
              //  src={URL.createObjectURL(product.files[0])}
              src={loading_logo}
              alt=""
              className="h-full aspect-square object-cover rounded-l-lg"
            />
          </div>

          <div className="flex flex-col p-4 justify-start w-full">
            {/* nombre del producto */}
            <h1 className="text-xl">Cargando...</h1>
            <div className="w-full bg-slate-400 h-[1px]"></div>
            {/* precio del producto */}
            <h2 className="font-semibold text-2xl my-8">USD 0$</h2>
          </div>
        </div>
      ) : (
        <div className="flex flex-row h-[199px]">
          <div className="h-full rounded-lg">
            <img
              //   src={URL.createObjectURL(product.images[0])}
              //  src={URL.createObjectURL(product.files[0])}
              src={
                product.files.length < 1
                  ? not_found_file
                  : file[0]
                  ? URL.createObjectURL(file[0])
                  : loading_logo
              }
              alt=""
              className="h-full aspect-square object-cover rounded-l-lg"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            />
          </div>

          <div className="flex flex-col p-4 justify-start w-full">
            {/* nombre del producto */}
            <h1
              className="text-xl"
              onClick={(e) => {
                e.preventDefault;
                handleClick();
              }}
            >
              {product.name.toUpperCase()}
            </h1>
            <div className="w-full bg-slate-400 h-[1px]"></div>
            {/* precio del producto */}
            <h2
              className="font-semibold text-2xl my-8"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              USD {product.price}$
            </h2>
          </div>
        </div>
      )}

      <div className="w-full h-[1px] bg-primary_blue"></div>
    </div>
  );
}
