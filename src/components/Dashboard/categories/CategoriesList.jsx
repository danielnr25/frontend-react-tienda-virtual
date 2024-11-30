
const CategoriesList = () => {
  return (
    <div>
        <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
                <tr className="text-left">
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nombre de la categoría</td>
                    <td>Descripción de la categoría</td>
                    <td>
                        <button className="bg-blue-800 text-white px-3 py-1.5 rounded-md">Editar</button>
                        <button className="bg-red-800 text-white px-3 py-1.5 rounded-md">Eliminar</button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
  )
}

export default CategoriesList