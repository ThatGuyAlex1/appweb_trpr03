<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useStudentStore } from '../stores/studentStore'
import StudentForm from '../components/CreateStudentFormComponent.vue'
import StudentList from '../components/StudentList.vue'
import type User from '../scripts/user'
import Loading from 'vue-loading-overlay'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import NotifyDeleteModal from '../components/NotifyDeleteModal.vue'
import CreateModal from '../components/CreateModal.vue'

const studentStore = useStudentStore()

const students = computed(() => studentStore.students as User[])
const studentToDelete = ref()
const onError = computed(() => studentStore.onError)
const isLoading = ref(false)
const triggerConfirmDeleteModal = ref(0)
const triggerNotifyDeleteModal = ref(0)
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

function askDeleteStudent(userId: Number) {
  studentToDelete.value = userId
  triggerConfirmDeleteModal.value++
}

async function deleteStudent() {
  try {
    isLoading.value = true
    await studentStore.deleteSpecificStudent(studentToDelete.value)
    triggerNotifyDeleteModal.value++
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
      <StudentList :students="students" @delete-student="askDeleteStudent" />
    </div>

    <!--Modal de confirmation de supression d'étudiant-->
    <ConfirmDeleteModal
      @onDeleteConfirmed="deleteStudent"
      :trigger="triggerConfirmDeleteModal"
      title="Attention"
      body="Voulez-vous supprimer cet étudiant ?"
      confirmButton="Supprimer"
      cancelButton="Annuler"
    />
    <!--Modal de notification de supression d'étudiant-->
    <NotifyDeleteModal
      :trigger="triggerNotifyDeleteModal"
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
