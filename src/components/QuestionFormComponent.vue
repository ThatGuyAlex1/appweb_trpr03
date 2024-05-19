<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore';
import { useQuestionStore } from '@/stores/questionStore';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import { useStudentStore } from '@/stores/studentStore';
import type User from '../scripts/user'
import type Category from '@/scripts/category';

const categoryStore = useCategoryStore()
const questionStore = useQuestionStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const studentStore = useStudentStore()

const questionDescription = ref('')
const priorityLevel = ref(1)
const questionCategory = ref('')


const categories = computed(() => categoryStore.categories as Category[])

onMounted(async () => {
  isLoading.value = true
  try {
    await categoryStore.getCategories()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération des catégories de questions.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store des catégories.")
  } finally {
    isLoading.value = false
  }
})

const students = computed(() => studentStore.students as User[])
const onError = computed(() => studentStore.onError)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    await studentStore.getStudents()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération des étudiants.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store")
  } finally {
    isLoading.value = false
  }
})

async function getStudentIdByUserId(user: User) {
  try {
    await studentStore.getStudentIdByUserId(user.id)
    confirm("L'id de l'étudiant a été récupéré avec succes")
  } catch (error) {
    confirm("Une erreur s'est produite lors de la récupération de l'id de l'étudiant.")
  }
}

const submitForm = async () => {
  questionStore.addQuestion({
    studentId: studentId.value,
    description: questionDescription.value,
    priority: priorityLevel.value,
    category: questionCategory.value,
  })
  questionDescription.value = ''
  priorityLevel.value = 1
  questionCategory.value = ''
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="questionDescription">Courte description de votre question</label>
        <input
          v-model="questionDescription"
          type="text"
          class="form-control"
          id="questionTitle"
          placeholder="Entrer votre question"
        />
      </div>
      <div class="form-group">
        <label for="priorityLevel">Niveau de priorité :</label>
        <input
          v-model.number="priorityLevel"
          type="number"
          class="custom-number"
          min="1"
          max="5"
          id="priorityLevel"
        />
      </div>
      <div class="form-group">
        <label for="questionCategory">Catégorie de questions</label>
        <select v-model="questionCategory" class="form-control" id="questionCategory">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
  </div>
</template>
