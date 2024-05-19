<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import type Question from '../scripts/question'
const props = defineProps({
  questions: Array<Question>,
  isTeacher: Boolean
})
const emit = defineEmits<{
  (event: 'deleteQuestion', questionId: number): void
}>()
</script>

<template>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Priorité</th>
            <th scope="col">Catégorie</th>
            <th scope="col" v-if="isTeacher">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in props.questions" v:key="question.id" id="questionList">
            <td>{{ question.description }}</td>
            <td>{{ question.priorityLevel }}</td>
            <td>{{ question.questionCategoryId }}</td>
            <td v-if="isTeacher">
              <button @click="emit('deleteQuestion',question.id)" class="btn btn-danger">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
</template>