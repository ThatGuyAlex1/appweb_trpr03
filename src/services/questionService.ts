import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import type Question from '../scripts/question'

async function getQuestionById(questionId:Number) {
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

async function getQuestionsByStudentId(studentId:Number) {
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

async function getQuestionsByPriorityLevel(priorityLevel:Number) {
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

async function getQuestionsByCategory(questionCategoryId:Number) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions/${questionCategoryId}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}


async function deleteQuestionById(questionId:Number) {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.delete(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        `http://127.0.0.1:3000/questions/${questionId}`
      )

    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function addQuestion(studentId: number, description: string, priorityLevel: number, questionCategoryId: number) {
  try {
    const dataSent = {
      studentId: studentId,
      description: description,
      priorityLevel: priorityLevel,
      questionCategoryId: questionCategoryId
    };
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    
    
    const response = await axiosAuth.post(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/questions`, dataSent
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
    getQuestionsByCategory,
    deleteQuestionById,
    addQuestion
}