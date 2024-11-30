import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CategoriesForm = ({ onSubmit, initialData = {} }) => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        description: initialData.description || "",
    });

    const onchangeback = () => {
        navigate('/admin/categories');
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Envía los datos al padre o realiza la acción deseada
        setFormData({ name: "", description: "" }); // Reinicia el formulario tras el envío
    };
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-semibold mb-4">
            {initialData.id ? "Editar Categoría" : "Nueva Categoría"}
        </h2>
        <button className="text-blue-600 hover:underline" onChange={onchangeback}>
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
            placeholder="Ingresa el nombre de la categoría"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {initialData.id ? "Actualizar Categoría" : "Crear Categoría"}
        </button>
      </form>
    </div>
  )
}

export default CategoriesForm