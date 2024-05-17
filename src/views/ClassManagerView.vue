<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useStudentStore } from '../stores/studentStore'
import StudentForm from '../components/CreateStudentFormComponent.vue'
import type User from '../scripts/user'
import Loading from 'vue-loading-overlay'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import DeleteModal from '../components/DeleteModal.vue'
import CreateModal from '../components/CreateModal.vue'

const studentStore = useStudentStore()

const students = computed(() => studentStore.students as User[])
const onError = computed(() => studentStore.onError)
const isLoading = ref(false)
const triggerDeleteModal = ref(0)
const triggerCreateModal = ref(0)

onMounted(async () => {
  isLoading.value = true
  try {
    await studentStore.getStudents()
    if (onError.value) {
      useToast().error(`Erreur avec le service: Erreur lors de la récupération des étudiants`, {
        duration: 6000
      })
    }
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Oups, le backend a lâché !`,
      { duration: 6000 }
    )
  } finally {
    isLoading.value = false
  }
})

async function reloadStudents() {
  try {
    await studentStore.getStudents()
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Erreur lors du rafraîchissement des étudiants (Tellement sec !).`,
      { duration: 6000 }
    )
  } finally {
    isLoading.value = false
  }
}

async function deleteStudent(user: User) {
  try {
    isLoading.value = true
    await studentStore.deleteSpecificStudent(user.id)
    triggerDeleteModal.value++
    reloadStudents()
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Erreur lors de l'effacement de l'étudiant.`,
      { duration: 6000 }
    )
  }
}

function handleNewStudent() {
  isLoading.value = true
  reloadStudents()
  triggerCreateModal.value++
}
</script>

<template>
  <div class="container">
    <div v-if="!isLoading">
      <div>
        <h1 class="text-center">Créer un nouvel étudiant</h1>
        <StudentForm @new-student="handleNewStudent" />
      </div>
      <h1 class="text-center">Liste des étudiants</h1>
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
              <button @click="deleteStudent(student)" class="btn btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--Modal de supression d'étudiant-->
    <DeleteModal
      :trigger="triggerDeleteModal"
      title="Succès !"
      body="L'étudiant a été supprimé avec succès."
      dismissButton="Ok"
    />
    <!--Modal de création d'étudiant-->
    <CreateModal
      :trigger="triggerCreateModal"
      title="Succès !"
      body="L'étudiant a été crée avec succès."
      dismissButton="Ok"
    />

    <div class="pt-5 mt-5 d-flex justify-content-center align-items-center">
      <Loading :active="isLoading" />
    </div>
  </div>
</template>
