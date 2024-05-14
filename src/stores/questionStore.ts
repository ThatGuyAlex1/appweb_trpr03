import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { teacherService } from '../services/teacherService'
import { studentService } from '../services/studentService'
import { useAuthStore } from './authStore'
import { questionService } from '../services/questionService'
import type Question from '../scripts/question'

export const useQuestionStore = defineStore('questionStoreId', () => {
    const description = ref('')
    const priorityLevel = ref()
    const questionCategoryId = ref()
    const userId = ref()

    function _initializeQuestion(question: { description: string; priorityLevel: number; questionCategoryId: number; userId: number }) {
        description.value = question.description
        priorityLevel.value = question.priorityLevel
        questionCategoryId.value = question.questionCategoryId
        userId.value = question.userId
    }

    async function getQuestion(question: Question) {
        try {
            const authStore = useAuthStore()
            const userId = Number(authStore.getUserId) // Convertie userId en nombre
            const question = await questionService.getQuestionById(userId)
            _initializeQuestion(question)
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteQuestion() {
        try {
            const authStore = useAuthStore()
            const userId = Number(authStore.getUserId) // Convertie userId en nombre
            const question = await questionService.deleteQuestionById(userId)
            await questionService.deleteQuestionById(userId)
        } catch (error) {
            console.error(error)
        }
    }

})

