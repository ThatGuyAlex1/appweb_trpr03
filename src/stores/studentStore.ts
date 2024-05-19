import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { studentService } from '../services/studentService'
import type User from '../scripts/user'

export const useStudentStore = defineStore('studentStoreId', () => {
  const students = ref([] as User[])
  const onError = ref(false)

  function _initializeStudents(users: User[]) {
    students.value = users
    onError.value = false
  }

  async function getStudents() {
    try {
      onError.value = false
      const studentsId = await studentService.getAllStudents()
      //aidé par chatGPT
      const studentsTemporary: User[] = await Promise.all(
        studentsId.map(async (student: { id: number; user_id: number }) => {
          return await userService.getUserById(student.user_id)
        })
      )
      _initializeStudents(studentsTemporary)
    } catch (error) {
      onError.value = true
    }
  }

  async function getStudentById(userId: number) {
    try {
      onError.value = false
      return await studentService.getStudentById(userId)
    } catch (error) {
      onError.value = true
    }
  }

  async function deleteSpecificStudent(userId: Number) {
    try {
      onError.value = false
      await studentService.deleteSpecificStudent(userId)
    } catch (error) {
      onError.value = true
    }
  }

  async function addSpecificStudent(name: string, email: string, password: string) {
    try {
      onError.value = false
      await studentService.addSpecificStudent(name, email, password)
    } catch (error) {
      onError.value = true
    }
  }

  return {
    students,
    onError,
    getStudents,
    getStudentById,
    deleteSpecificStudent,
    addSpecificStudent
  }
})
