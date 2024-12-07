import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../../../services/productsService'
const ProductForm = ({ initialData = {} }) => {

    const navigate = useNavigate();
    const { id } = useParams(); // obtener el ID de los parametros de la ruta
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        description: initialData.description || "",
        image: initialData.image || "",
        category: initialData.category_id || "",
        price: initialData.price || ""
    });

    useEffect(() => {
        if (id) {
            const fetchCategoryData = async () => {
                try {
                    const product = await getProductById(id)
                    setFormData({
                        name: product.nombre || "",
                        description: product.descripcion || "",
                        image: product.imagen || "",
                        category: product.category_id || "",
                        price: product.precio || ""
                    })
                } catch (error) {
                    console.error('Error al cargar la categoria: ', error)
                }
            }

            fetchCategoryData()
        }

    }, [id]);


    const onchangeback = () => {
        navigate('/admin/products')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateProduct(id, formData)
                console.log('se actualizo correctamente')
            } else {
                await createProduct(formData)
                console.log('registrando correctamente')
            }

            onchangeback();
        } catch (error) {
            console.error("Error al procesar el producto: ", error.message)
        }
    };

    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold mb-4">
                    {id ? "Editar producto" : "Nuevo producto"}
                </h2>
                <button className="text-blue-600 hover:underline" onClick={onchangeback}>
                    Regresar
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingresa el nombre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingresa una descripción"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                        Precio
                    </label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingresa el precio"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    {id ? "Actualizar Producto" : "Crear Producto"}
                </button>
            </form>
        </div>
    )
}

export default ProductForm