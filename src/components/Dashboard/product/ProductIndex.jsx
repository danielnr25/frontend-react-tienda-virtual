import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
const ProductIndex = () => {
    const navigate = useNavigate();
    const handleNewProduct = () => {
        navigate("/admin/products/new"); // Ajusta esta ruta según tu estructura
      };
  return (
    <div>
        <h1 className="text-2xl font-semibold text-gray-800">Listado de Productos</h1>
        <hr className="my-4" />

        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
            <button
                className="bg-blue-800 text-white px-3 py-1.5 rounded-md"
                onClick={handleNewProduct}
            >
                Nuevo
            </button>
                <input type="text" placeholder="Buscar producto" className="border border-gray-300 rounded-md px-2 py-1.5" />
            </div>
            <button className="bg-blue-800 text-white px-3 py-1.5 rounded-md">Buscar</button>
        </div>
        <hr className="my-4" />

        <ProductList />

    </div>
  )
}

export default ProductIndex