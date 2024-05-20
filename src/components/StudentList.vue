<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import type User from '../scripts/user'
const props = defineProps({
  students: Array<User>
})
const emit = defineEmits<{
  (event: 'deleteStudent', studentId: number): void
}>()
</script>

<template>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Courriel</th>
            <th scope="col">Actions</th>
            <th scope="col">Vie</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in props.students" v:key="student.id" id="studentList">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>
              <button @click="emit('deleteStudent',student.id)" class="btn btn-danger">
                Supprimer
              </button>
            </td>
            <td>{{ student.life }}</td>
          </tr>
        </tbody>
      </table>
</template>