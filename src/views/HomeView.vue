<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Loading from 'vue-loading-overlay'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useProfileStore } from '../stores/profileStore'
import { useQuestionStore } from '../stores/questionStore'
import { useCategoryStore } from '../stores/categoryStore'
import CreateQuestionCategoryForm from '../components/CreateQuestionCategoryFormComponent.vue'
import QuestionForm from '../components/QuestionFormComponent.vue'
import QuestionList from '../components/QuestionListComponent.vue'
import type Question from '../scripts/question'
import type User from '../scripts/user'
import type Category from '../scripts/category'

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import NotifyDeleteModal from '../components/NotifyDeleteModal.vue'
import CreateModal from '../components/CreateModal.vue'
import { useStudentStore } from '@/stores/studentStore'

const profileStore = useProfileStore()
const questionStore = useQuestionStore()
const categoryStore = useCategoryStore()
const studentStore = useStudentStore()
const onError1 = computed(() => profileStore.onError)
const onError2 = computed(() => questionStore.onError)
const onError3 = computed(() => categoryStore.onError)
const onError4 = computed(() => studentStore.onError)
const isLoading = ref(false)

const questions = computed(() => questionStore.questions as Question[])
const students = computed(() => studentStore.students as User[])
const categories = computed(() => categoryStore.categories as Category[])
const questionToDelete = ref()

const triggerConfirmDeleteModal = ref(0)
const triggerNotifyDeleteModal = ref(0)
const triggerCreateModal = ref(0)

//Meilleure syntaxe donnée par Jimmy ! Merci ;)
const isTeacher = computed(() => profileStore.role === 'teacher')

onMounted(async () => {
  isLoading.value = true
  try {
    await profileStore.getProfile()
    await questionStore.getQuestions()
    await studentStore.getStudents()
    await categoryStore.getCategories()
    if (onError2.value) {
      useToast().error(`Erreur avec le service: Erreur lors de la récupération des questions`, {
        duration: 6000
      })
    }
    if (onError1.value) {
      useToast().error(`Erreur avec le service: Erreur lors de la récupération du profile`, {
        duration: 6000
      })
    }
    if (onError3.value) {
      useToast().error(`Erreur avec le service: Erreur lors de la récupération des catégories`, {
        duration: 6000
      })
    }
    if (onError4.value) {
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

async function reloadQuestions() {
  try {
    await questionStore.getQuestions()
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Erreur lors du rafraîchissement des questions.`,
      { duration: 6000 }
    )
  } finally {
    isLoading.value = false
  }
}

function askDeleteQuestion(questionId: Number) {
  questionToDelete.value = questionId
  triggerConfirmDeleteModal.value++
}

async function deleteQuestion() {
  try {
    isLoading.value = true
    await questionStore.deleteQuestionById(questionToDelete.value)
    triggerNotifyDeleteModal.value++
    reloadQuestions()
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Erreur lors de l'effacement de la question.`,
      { duration: 6000 }
    )
  }
}

function handleNewQuestion() {
  isLoading.value = true
  reloadQuestions()
  triggerCreateModal.value++
}

</script>

<template>
  <div class="container">
    <div v-if="!isLoading">
      <div class="home">
        <h1 class="text-center">Accueil</h1>
        <p v-if="isTeacher">
          La liste des questions des vos étudiants. Pour ajouter une nouvelle catégorie de question,
          rempliser le formulaire a droite
        </p>
        <p v-else>
          La liste des questions en attentes. Pour "lever la main", remplissez le formulaire a
          droite
        </p>
        <div class="row">
          <div class="col-md-7">
            <QuestionList :questions="questions" :categories="categories" :students="students" :isTeacher="isTeacher" @delete-question="askDeleteQuestion" />
          </div>

          <div class="col-md-5">
            <CreateQuestionCategoryForm v-if="isTeacher" />
            <QuestionForm @create-question="handleNewQuestion" v-else />
          </div>
        </div>
      </div>
    </div>

    <!--Modal de confirmation de supression de question-->
    <ConfirmDeleteModal
      @onDeleteConfirmed="deleteQuestion"
      :trigger="triggerConfirmDeleteModal"
      title="Attention"
      body="Voulez-vous supprimer cette question ?"
      confirmButton="Supprimer"
      cancelButton="Annuler"
    />
    <!--Modal de notification de supression de question-->
    <NotifyDeleteModal
      :trigger="triggerNotifyDeleteModal"
      title="Succès !"
      body="La question a été supprimée avec succès."
      dismissButton="Ok"
    />
    <!--Modal de création de question-->
    <CreateModal
      :trigger="triggerCreateModal"
      title="Succès !"
      body="La question a été envoyer avec succès."
      dismissButton="Ok"
    />
    <div class="pt-5 mt-5 d-flex justify-content-center align-items-center">
      <Loading :active="isLoading" />
    </div>
  </div>
</template>

<style scoped></style>
