import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import type Question from '../scripts/question'

async function getQuestionById(questionId) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions/${questionId}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getAllQuestions() {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getQuestionByStudentId(studentId) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions/${studentId}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getQuestionsByStudentId(studentId) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions/${studentId}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getQuestionsByPriorityLevel(priorityLevel) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions/${priorityLevel}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getQuestionsByCategory(questionTypeId) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions/${questionTypeId}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

export const questionService = {
    getQuestionById,
    getAllQuestions,
    getQuestionsByStudentId,
    getQuestionsByPriorityLevel,
    getQuestionsByCategory
}