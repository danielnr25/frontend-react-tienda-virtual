import axios from 'axios'

const BASE_URL = "http://localhost:3000/categories"

// crear una categoria
export const createCategory = async(categoryData) => {
    try {
        const response = await axios.post(BASE_URL,categoryData)
        return response.data
    } catch (error) {
        throw new Error("Error al crear la categoria: " + error.message)
    }
}

// actualizar una categoria
export const updateCategory = async(id,categoryData) =>{
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, categoryData);
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error("Error al actualizar la categoria: " + error.message)
    }
}

// obtener todas las categorias
export const getAllCategories = async() =>{
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    } catch (error) {
        throw new Error("Error al obtener las categorias: " + error.message)
    }
}

// obtener una categoria por ID
export const getCategoryById = async(id) =>{
    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data
    } catch (error) {
        throw new Error("Error al obtener la categoria: " + error.message)
    }
}

export const deleteCategory = async(id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`)
        return response.data
    } catch (error) {
        throw new Error("Error al eliminar la categoria: " + error.message)
    }
}