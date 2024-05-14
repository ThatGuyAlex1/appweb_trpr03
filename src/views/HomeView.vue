<script setup lang="ts">
import CreateQuestionTypeForm from '../components/CreateQuestionTypeFormComponent.vue'
import QuestionForm from '@/components/QuestionFormComponent.vue';
import QuestionList from '../components/QuestionListComponent.vue'; 

import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()

const isLoggedIn = computed(() => authStore.isLoggedIn)
//Meilleure syntaxe donnée par Jimmy ! Merci ;)
const isTeacher = computed(() => profileStore.role === 'teacher')

function logout() {
  authStore.logout()
  profileStore.logout()
  router.push({
    name: 'Login'
  })
}
</script>

<template>
  <div class="home">
    <h1>Accueil</h1>
    <p v-if="isTeacher">La liste des questions des vos étudiants. Pour ajouter une nouvelle catégorie de question, rempliser le formulaire a droite</p>
    <p v-else>La liste des questions en attentes. Pour "lever la main", remplissez le formulaire a droite</p>
    <div class="row">
      <div class="col-md-7">
        <QuestionList />
      </div>

      <div class="col-md-5">
        <CreateQuestionTypeForm v-if="isTeacher" />
        <QuestionForm v-else />
      </div>
    </div>
  </div>
</template>

<style scoped></style>