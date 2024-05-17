<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Loading from 'vue-loading-overlay'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import CreateQuestionTypeForm from '../components/CreateQuestionTypeFormComponent.vue'
import QuestionForm from '../components/QuestionFormComponent.vue'
import QuestionList from '../components/QuestionListComponent.vue'

import { useProfileStore } from '../stores/profileStore'

const profileStore = useProfileStore()
const onError = computed(() => profileStore.onError)
const isLoading = ref(true)

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  } finally {
    isLoading.value = false
  }
})

//Meilleure syntaxe donnée par Jimmy ! Merci ;)
const isTeacher = computed(() => profileStore.role === 'teacher')
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
            <QuestionList />
          </div>

          <div class="col-md-5">
            <CreateQuestionTypeForm v-if="isTeacher" />
            <QuestionForm v-else />
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5 mt-5 d-flex justify-content-center align-items-center">
      <Loading :active="isLoading" />
    </div>
  </div>
</template>

<style scoped></style>
