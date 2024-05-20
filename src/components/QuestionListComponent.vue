<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import type Question from '../scripts/question'
import type Category from '../scripts/category'
import type User from '../scripts/user'
const props = defineProps({
  questions: Array<Question>,
  categories: Array<Category>,
  students: Array<User>,
  isTeacher: Boolean,
})
const emit = defineEmits<{
  (event: 'deleteQuestion', questionId: number): void
}>()

const getCategoryName = (categoryId: number) => {
  const category = props.categories!.find(category => category.id === categoryId)
  return category ? category.name : 'Catégory inconnu'
}

const getStudentName = (userId: number) => {
  const student = props.students!.find(student => student.id === userId)
  return student ? student.name : 'étudiant inconnu'
}
</script>

<template>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Priorité</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Étudiant</th>
            <th scope="col" v-if="isTeacher">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in props.questions" v:key="question.id" id="questionList">
            <td>{{ question.description }}</td>
            <td>{{ question.priorityLevel }}</td>
            <td>{{ getCategoryName(question.questionCategoryId-1) }}</td>
            <td>{{ getStudentName(question.studentId) }}</td>
            <td v-if="isTeacher">
              <button @click="emit('deleteQuestion',question.id)" class="btn btn-danger">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
</template>