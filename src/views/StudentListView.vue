<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useStudentStore } from '../stores/studentStore'
import type User from '../scripts/user'
import Loading from 'vue-loading-overlay'

const studentStore = useStudentStore()

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
    confirm("Erreur critique lors de l'accès au store.")
  } finally {
    isLoading.value = false
  }
})

async function reloadStudents() {
  isLoading.value = true
  try {
    await studentStore.getStudents()
  } catch (error) {
    confirm("Erreur lors du rechargement des étudiants.")
  } finally {
    isLoading.value = false
  }
}

async function deleteStudent(user: User) {
  try {
    await studentStore.deleteSpecificStudent(user.id)
    reloadStudents()
  } catch (error) {
    confirm("Une erreur s'est produite lors de l'effacement de l'utilisateur.")
  }
}

</script>


<template>
  <div class="container" v-if="!isLoading">
    <h1>Liste des étudiants</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Courriel</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" v:key="student.id" id="studentList">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>
            <button @click="deleteStudent(student)" class="btn btn-danger" >Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <router-link to="/create-student" class="btn btn-primary">Créer un étudiant</router-link>
    <button @click="reloadStudents()" class="btn btn-secondary">Recharger</button>
  </div>
  <Loading :active="isLoading" />
    
</template>