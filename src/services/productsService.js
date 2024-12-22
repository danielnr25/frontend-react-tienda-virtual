import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;

// crear un nuevo producto
export const createProduct = async(productData) => {
    try {
        const response = await axios.post(BASE_URL,productData)
        return response.data
    } catch (error) {
        throw new Error("Error al registrar el producto: " + error.message)
    }
}

// actualizar un producto
export const updateProduct = async(id,productData) =>{
    try {
        const response = await axios.put(BASE_URL + "/" + id, productData);
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error("Error al actualizar el producto: " + error.message)
    }
}

// obtener todas los productos
export const getAllProduct = async() =>{
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    } catch (error) {
        throw new Error("Error al obtener los productos: " + error.message)
    }
}

// obtener un producto por ID
export const getProductById = async(id) =>{
    try {
        const response = await axios.get(BASE_URL + "/" + id)
        return response.data
    } catch (error) {
        throw new Error("Error al obtener el producto: " + error.message)
    }
}

export const deleteProduct = async(id) => {
    try {
        const response = await axios.delete(BASE_URL + "/" + id)
        return response.data
    } catch (error) {
        throw new Error("Error al eliminar el producto: " + error.message)
    }
}