import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { teacherService } from '../services/teacherService'
import { studentService } from '../services/studentService'
import { useAuthStore } from './authStore'
import type User from '../scripts/user'

export const useProfileStore = defineStore('profileStoreId', () => {
  const email = ref('')
  const name = ref('')
  const role = ref('')
  const life = ref(0)
  const onError = ref(false)

  function _initializeProfile(profile: { email: string; name: string; password: string, life: number}) {
    email.value = profile.email
    name.value = profile.name
    life.value = profile.life
    onError.value = false
  }

  function logout() {
    email.value = ''
    name.value = ''
    role.value = ''
  }

  async function getProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = parseInt(authStore.getUserId) // Assuming getUserId is a computed or a ref inside a
      const studentProfile = await studentService.getStudentById(userId)
      const teacherProfile = await teacherService.getTeacherById(userId)
      if (studentProfile.length > 0 && studentProfile[0].user_id == userId) {
        role.value = 'student'
      } else if (teacherProfile.length > 0 && teacherProfile[0].user_id == userId) {
        role.value = 'teacher'
      }
      const profile = await userService.getUserById(userId)
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }

  async function updateProfile(user: User) {
    try {
      onError.value = false
      const authStore = useAuthStore()
      user.id = parseInt(authStore.getUserId, 10)
      if (user.password == null || user.password == '') {
        user.password = (await userService.getUserById(user.id)).password
      }
      console.log(user)
      userService.updateUser(user)
    } catch (error) {
      onError.value = true
    }
  }

  return {
    email,
    name,
    role,
    life,
    onError,
    getProfile,
    updateProfile,
    logout
  }
})
