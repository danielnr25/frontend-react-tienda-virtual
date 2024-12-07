import axios from "axios"
import { useState,useEffect } from "react"


const CategoriesList = () => {

    const [categories,setCategories] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error,setError] = useState(false);

    const fetchCategories = async() =>{
        try {
            const response = await axios.get("http://localhost:3000/categories");
            console.log(response.data)
            setCategories(response.data)
            
        } catch (err) {
            setError("Error al obtener las categorias: " + err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    if(loading){
        return <p className="text-xl font-semibold text-blue-600">Cargando categorias</p>
    }

    if(error) return <p className="text-xl font-semibold text-red-600">{error}</p>


  return (
    <div>
        <table className="w-full border border-gray-300 roundend-sm">
            <thead className="bg-sky-200 space-y-5">
                <tr className="text-center uppercase text-base">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-base font-medium text-center">
                {categories.map((category)=>(
                    <tr 
                        key={category.id}
                         className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <td className="py-3">{category.nombre}</td>
                        <td className="py-3">{category.descripcion}</td>
                        <td className="py-3 space-x-4">
                            <button className="bg-blue-800 text-white px-3 py-1.5 rounded-md">Editar</button>
                            <button className="bg-red-800 text-white px-3 py-1.5 rounded-md">Eliminar</button>
                        </td>
                    </tr>

                ))}


            </tbody>
        </table>
    </div>
  )
}

export default CategoriesList