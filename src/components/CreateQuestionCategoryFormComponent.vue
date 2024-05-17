<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore';


const newCategoryName = ref('')
const categoryStore = useCategoryStore()

const createCategory = () => {
  categoryStore.addCategory(newCategoryName.value)
  newCategoryName.value = ''
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="createCategory">
      <div class="form-group">
        <input
          v-model="newCategoryName"
          type="text"
          class="form-control"
          id="newQuestionType"
          placeholder="Entrer ici la nouvelle catégorie de question"
        />
      </div>
      <button type="submit" class="btn btn-primary">Créer la nouvelle catégorie</button>
    </form>
  </div>
</template>
