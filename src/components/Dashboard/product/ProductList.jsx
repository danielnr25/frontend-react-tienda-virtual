import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const BASE_URL = import.meta.env.VITE_API_URL;
const ProductList = () => {

    const navigate = useNavigate();
    
    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error,setError] = useState(false);
    const [userRole, setUserRole]  = useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState(null)

    const fetchProducts = async() =>{
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            //const response = await getAllCategories()
            setProducts(response.data)
        } catch (err) {
            setError("Error al obtener los productos: " + err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
        const token = localStorage.getItem("token");
        if(token){
            const decoded = jwtDecode(token);
            //console.log(decoded);
            setUserRole(decoded.role);
        }else{
            navigate("/login")
        }
    }, [navigate]);

     
        console.log(userRole)
    const openModal = (product) =>{
        setSelectedProduct(product)
        setIsModalOpen(true);
    }

    const closeModal = () =>{
        setSelectedProduct(null);
        setIsModalOpen(false)
    }

    const deleteProduct = async() =>{
       if(!setSelectedProduct) return
        try {
            await axios.delete(`${BASE_URL}/products/${selectedProduct.id}`)
            //setCategories(categories.filter((cat)=>cat.id !== selectedCategory.id))
            //await deleteCategory(selectedCategory.id)
            fetchProducts();
            closeModal();
        } catch (err) {
            alert("Error al eliminar categoria" + err)
        }
    }

    const handleEditProduct = (id) =>{
        navigate(`/admin/products/edit/${id}`);
    }
    
    if(loading){
        return <p className="text-xl font-semibold text-blue-600">Cargando productos</p>
    }

    if(error) return <p className="text-xl font-semibold text-red-600">{error}</p>

  return (
    <div>
    <table className="w-full border border-gray-300 roundend-sm">
        <thead className="bg-sky-200 space-y-5">
            <tr className="text-center uppercase text-base">
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Acciones</th>
            </tr>
        </thead>
        <tbody className="text-base font-medium text-center">
            {products.map((product)=>(
                <tr 
                    key={product.id}
                     className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <td className="py-3">{product.categorianombre}</td>
                    <td className="py-3">{product.nombre}</td>
                    <td className="py-3">{product.stock}</td>
                    <td className="py-3">{product.precio}</td>
                    <td className="py-3">
                        <img 
                            src={product.imagen} 
                            alt={product.nombre} 
                            className="w-20 h-20 object-cover rounded-md mx-auto"
                        />
                    </td>
                    {userRole===1? 
                        <td className="py-3 space-x-4">
                            <button
                                onClick={()=>handleEditProduct(product.id)}
                                className="bg-blue-800 text-white px-3 py-1.5 rounded-md"
                            >Editar</button>
                            <button
                                onClick={()=> openModal(product)} 
                                className="bg-red-800 text-white px-3 py-1.5 rounded-md"
                            >Eliminar</button>
                        </td>
                    :
                        <td></td>
                    }
                </tr>
            ))}
        </tbody>
    </table>

    {isModalOpen && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
        <p>
          ¿Estás seguro de que deseas eliminar el producto{" "}
          <strong>{selectedProduct?.nombre}</strong>?
        </p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={deleteProduct} 
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )}



</div>
  )
}

export default ProductList