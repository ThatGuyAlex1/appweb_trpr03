import { defineStore } from 'pinia'
import { ref } from 'vue'
import { questionService } from '../services/questionService'
import type Question from '../scripts/question'

export const useQuestionStore = defineStore('questionStoreId', () => {
    const questions = ref([] as Question[])
    const onError = ref(false)
    

    function _initializeQuestions(questionList: Question[]) {
        questions.value = questionList
        onError.value = false
    }

    async function getQuestions() {
        try {
            onError.value = false
            const questionsId = await questionService.getAllQuestions()
            //aidé par chatGPT
            const questionsTemporary: Question[] = await Promise.all(questionsId.map(async (question: { id: number; studentId: number; description: string; priorityLevel: number; questionCategoryId: number }) => {
              return await questionService.getQuestionById(question.id);
            }));
          _initializeQuestions(questionsTemporary)
          } catch (error) {
            onError.value = true
          }
    }

    async function deleteQuestionById(questionId : number) {
        try {
          onError.value = false
          await questionService.deleteQuestionById(questionId)
        } catch (error) {
          onError.value = true
        }
    }

    async function addQuestion(studentId: number, description: string, priorityLevel: number, questionCategoryId: number) {
        try {
          onError.value = false
          await questionService.addQuestion(studentId, description, priorityLevel, questionCategoryId)
        } catch (error) {
          onError.value = true
        }
    }

    return { 
      questions,
      onError,
      getQuestions,
      deleteQuestionById,
      addQuestion
    }

})

