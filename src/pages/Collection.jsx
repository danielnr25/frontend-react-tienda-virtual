import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CartContext } from '../context/CartContext';
const BASE_URL = import.meta.env.VITE_API_URL;

const Collection = () => {

	const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };
     // Inicializa el carrito desde localStorage o lo crea vacío


    // Llama a la función para obtener los productos
    useEffect(() => {
        fetchProducts();
    }, []);
    
	return (

		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos Destacados</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<div key={product.id} >
							<div className="group relative">
								<img
									alt={product.nombre}
									src={product.imagen}
									className="aspect-square w-full rounded-t-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
								/>
							</div>
							<div className="bg-white shadow-md rounded-e-md py-2 px-2">
								<div className="flex justify-between">
									<h3 className="text-lg text-blue-800 font-medium capitalize">
										{product.nombre}
									</h3>
									<span className="text-sm text-gray-500 font-semibold uppercase">{product.categorianombre}</span>
								</div>
								<div className="flex justify-between py-2">
									<p className="text-base font-medium text-gray-900">Precio: ${product.precio}</p>
									<p className="text-base font-medium text-green-500">Stock:<span className="text-gray-800"> {product.stock}</span> </p>
								</div>
								<div className="block mt-1">
									<button
										className="w-full bg-indigo-700 text-white px-3 py-1.5 rounded-md hover:bg-indigo-600"
										onClick={()=>addToCart(product)}
									>
										Agregar 🛒
									</button>
								</div>
							</div>
						</div>
					))}
                    <ToastContainer />
				</div>
			</div>
		</div>

	)
}

export default Collection