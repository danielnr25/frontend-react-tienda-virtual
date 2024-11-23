import { useState } from "react"
import { NavLink,useNavigate } from "react-router-dom"


const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)

    const navigate = useNavigate();

    const handleLogin = (e) => { // Función para manejar el inicio de sesión del usuario 
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setLoading(true); // Cambiar el estado de carga a true 
        setError(null); // Limpiar el estado de error
  
        const data = { // Crear un objeto con los datos del usuario
           username,
           password
        };
  
        fetch("http://localhost:3000/auth/login", { // Realizar una petición POST a la ruta "/auth/login" del servidor 
           method: "POST", // Método POST
           headers: { 
              "Content-Type": "application/json" // Tipo de contenido JSON
           },
           body: JSON.stringify(data) // Enviar los datos del usuario en formato JSON
        })
           .then((response) => {  // Manejar la respuesta de la petición
              if (!response.ok) { // Si la respuesta no es exitosa
                 throw new Error("Error en la autenticación"); // Lanzar un error 
              }
              return response.json(); // Devolver la respuesta en formato JSON
           })
           .then((result) => {
              console.log("Resultado de la autenticación:", result); // Agregar log, para verificar el resultado de la autenticación 
              if (result.token) {
                 localStorage.setItem("token", result.token); // Almacenar el token en localStorage
                 console.log("Token guardado:", result.token); // Agregar log
                 navigate("/dashboard"); // Redirige al Dashboard si el inicio de sesión es exitoso
              } else {
                 setError("Usuario o contraseña incorrectos"); // Mostrar un mensaje de error si el inicio de sesión falla
              }
           })
           .catch((error) => {
              console.error("Error:", error); // Agregar log para mostrar el error en la consola
              setError("Error al iniciar sesión, por favor intente de nuevo."); // Mostrar un mensaje de error al usuario
           })
           .finally(() => {
              setLoading(false); // Cambiar el estado de carga a false
           });
     }


    return (
        <div className="flex flex-1 mt-16 lg:mt-20 flex-col justify-center px-6 pt-20 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-md px-10 bg-gray-50 pb-10 pt-10 rounded-md">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-800 mb-10 ">
                Ingrese a su cuenta
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
                    <div>
                        <input className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" 
                            onChange={(ev)=> setUsername(ev.target.value)}
                        />

                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                    <div>
                        <input className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="password" 
                          onChange={(ev)=> setPassword(ev.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    type="submit"
                    disabled={loading}
                    
                >
                    {loading ? 'Cargando...':'Iniciar sessión'}
                </button>

                <div className="text-center mt-4">
                    <p className="text-base text-gray-800">¿No tienes cuenta? <NavLink to="/register" className="text-blue-700 font-semibold">Regístrate</NavLink></p>
                </div>

                {error && <p className="text-red-500 font-medium text-base">{error}</p>}
                
            </form>
            </div>
        </div>
    )
}


export default Login