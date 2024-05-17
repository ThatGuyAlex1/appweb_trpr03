import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import type Category from '../scripts/category'

async function getCategoryById(categoryId:Number) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/categories/${categoryId}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getAllCategories() {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/categories`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function addCategory(name: string) {
    try {
      const dataSent = {
        name: name
      };
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      
      
      const response = await axiosAuth.post(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/categories`, dataSent
      )

      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

  export const categoryService = {
    getCategoryById,
    getAllCategories,
    addCategory
}