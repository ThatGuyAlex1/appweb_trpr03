<script setup lang="ts">
import { ref, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { confirmed, required } from '@vee-validate/rules'
import { useCategoryStore } from '../stores/categoryStore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'


defineRule('isRequired', required)
const categoryStore = useCategoryStore()

const emit = defineEmits<{
  (event: 'newCategory'): void
}>()

const name = ref('')
const onError = computed(() => categoryStore.onError)

async function addNewCategory() {
  try {
    await categoryStore.addCategory(name.value)
    if (onError.value) {
      useToast().error(
        `Erreur avec le service : Une erreur est survenue lors de la création de la catégorie de question.`,
        { duration: 6000 }
      )
    }
    emit('newCategory')
  } catch (error) {
    useToast().error(
      `Erreur avec le service : Une erreur est survenue lors de la création la catégorie de question.`,
      { duration: 6000 }
    )
  }
}
const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)
</script>

<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="categoryName">Nom :</label>
        <Field
          type="text"
          class="form-control"
          id="categoryName"
          name="categoryName"
          placeholder="Entrer la nouvelle catégorie de question."
          v-model="name"
          :rules="isRequired"
        />
        <ErrorMessage class="text-danger" name="categoryName" />
      </div>
      <button type="submit" @click="addNewCategory" id="submit-category" class="btn btn-primary">Créer la nouvelle catégorie</button>
    </form>
  </div>
</template>
