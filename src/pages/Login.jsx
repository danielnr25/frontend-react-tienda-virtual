import { useState } from "react"
import { NavLink,useNavigate } from "react-router-dom"


const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)

    const navigate = useNavigate();
    const handleLogin = (e) =>{
        e.preventDefault();
        setLoading(true);

        const data = {
            username,
            password
        }

        fetch("http://localhost:3000/auth/login",{
            method:"POST",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        }).then((response)=>{
            if(!response.ok){
                throw new Error("Error en la autentiación");
            }
            return response.json();
        }).then((result)=>{
            console.log('Resultado de la autenticación:',result)
            if(result.token){
                localStorage.setItem("token",result.token)
                console.log("token guardado:", result.token)
                navigate('/dashbard');
            }else{
                setError("Usuario o contraseña incorrecta");
            }
        }).catch((error)=>{
            console.error("ERROR:",error)
            setError("Error al iniciar sesión, por favor intente de nuevo");
        }).finally(()=>{
            setLoading(false);
        })

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

                {error && <p className="text-red-500 font-medium text-base">
                    {error}    
                </p>}
                
            </form>
            </div>
        </div>
    )
}


export default Login