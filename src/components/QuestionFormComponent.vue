<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { confirmed, required } from '@vee-validate/rules'
import { useCategoryStore } from '@/stores/categoryStore';
import { useQuestionStore } from '@/stores/questionStore';
import { useAuthStore } from '@/stores/authStore';
import type User from '../scripts/user'
import type Category from '@/scripts/category';

defineRule('isRequired', required)

const categoryStore = useCategoryStore()
const questionStore = useQuestionStore()
const authStore = useAuthStore()

const questionDescription = ref('')
const priorityLevel = ref(1)
const questionCategory = ref()

const categories = computed(() => categoryStore.categories as Category[])


const userId = computed(() => authStore.getUserId)

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

const onError = computed(() => categoryStore.onError)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
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

const submitForm = async () => {
  questionStore.addQuestion(
    parseInt(userId.value),
    questionDescription.value,
    priorityLevel.value,
    questionCategory.value,
  )
  questionDescription.value = ''
  priorityLevel.value = 1
  questionCategory.value = ''
}
const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)
</script>

<template>
  <div class="container">
    <Form @submit="submitForm">
      <div class="form-group">
        <label for="questionDescription">Courte description de votre question</label>
        <Field
          v-model="questionDescription"
          type="text"
          class="form-control"
          id="questionTitle"
          name="questionTitle"
          placeholder="Entrer votre question"
          :rules="isRequired"
        />
        <ErrorMessage class="text-danger" name="questionTitle" />
      </div>
      <div class="form-group">
        <label for="priorityLevel">Niveau de priorité :</label>
        <Field
          v-model.number="priorityLevel"
          type="number"
          class="custom-number"
          min="1"
          max="5"
          id="priorityLevel"
          name="priorityLevel"
          :rules="isRequired"
        />
        <ErrorMessage class="text-danger" name="priorityLevel" />
      </div>
      <div class="form-group">
        <label for="questionCategory">Catégorie de questions</label>
        <select v-model="questionCategory" class="form-control" id="questionCategory" :rules="isRequired">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <ErrorMessage class="text-danger" name="password" />
      </div>
      <button type="submit" class="btn btn-primary">Envoyer</button>
    </Form>
  </div>
</template>
