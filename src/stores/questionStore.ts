import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { teacherService } from '../services/teacherService'
import { studentService } from '../services/studentService'
import { useAuthStore } from './authStore'

export const useQuestionStore = defineStore('questionStoreId', () => {
    const description = ref('')
    const priorityLevel = ref('')
    const questionType = ref('')
    const userId = ref('')
})