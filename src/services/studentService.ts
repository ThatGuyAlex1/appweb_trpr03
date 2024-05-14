import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

async function getStudentById(userId) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/students?user_id=${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getAllStudents() {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/students`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
  }

  async function deleteSpecificStudent(userId) {
    try {

      let student = await getStudentById(userId)
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response1 = await axiosAuth.delete(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/students/${student[0].id}`
      )
      
      const response2 = await axiosAuth.delete(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/users/${userId}`
      )
  
    } catch (error) {
      throw parseAxiosError(error)
    }
  }

  async function addSpecificStudent(name: string, email: string, password: string) {
    try {
      const dataSent = {
        email: email,
        password: password,
        name: name
      };
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      
      
      const response2 = await axiosAuth.post(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/users`, dataSent
      )
      
      console.log(response2.data)

      const dataSent2 = {
        user_id: response2.data.user.id
      };

      console.log(dataSent2)

      const response1 = await axiosAuth.post(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/students`, dataSent2
      )
    } catch (error) {
      throw parseAxiosError(error)
    }
  }

export const studentService = {
  getAllStudents,
  getStudentById,
  deleteSpecificStudent,
  addSpecificStudent
}
