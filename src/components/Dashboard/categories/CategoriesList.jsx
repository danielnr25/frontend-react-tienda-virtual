import axios from "axios"
import { useState,useEffect } from "react"


const CategoriesList = () => {

    const [categories,setCategories] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error,setError] = useState(false);

    const [isModalOpen,setIsModalOpen] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState(null)


    const fetchCategories = async() =>{
        try {
            const response = await axios.get("http://localhost:3000/categories");
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

    const openModal = (category) =>{
        setSelectedCategory(category)
        setIsModalOpen(true);
    }

    const closeModal = () =>{
        setSelectedCategory(null);
        setIsModalOpen(false)
    }

    const deleteCategory = async() =>{
       if(!selectedCategory) return
        try {
            await axios.delete(`http://localhost:3000/categories/${selectedCategory.id}`)
            //setCategories(categories.filter((cat)=>cat.id !== selectedCategory.id))
            fetchCategories();
            closeModal();
        } catch (err) {
            alert("Error al eliminar categoria" + err)
        }
    }



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
                            <button
                                onClick={()=> openModal(category)} 
                                className="bg-red-800 text-white px-3 py-1.5 rounded-md"
                            >Eliminar</button>
                        </td>
                    </tr>

                ))}


            </tbody>
        </table>

        {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
            <p>
              ¿Estás seguro de que deseas eliminar la categoría{" "}
              <strong>{selectedCategory?.nombre}</strong>?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={deleteCategory} 
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

export default CategoriesList