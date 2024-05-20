<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required, confirmed } from '@vee-validate/rules'
import { useProfileStore } from '../stores/profileStore'
import type User from '../scripts/user'
import Loading from 'vue-loading-overlay'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import NameModal from '../components/NameModal.vue'
import PasswordModal from '../components/PasswordModal.vue'

defineRule('isRequired', required)
defineRule('isSame', confirmed)

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const role = computed(() => profileStore.role)
const life = computed(() => profileStore.life)
const onError = computed(() => profileStore.onError)
const newPassword = ref('')
const confirmPassword = ref('')
const user = ref({} as User)
const isLoading = ref(true)
const triggerNameModal = ref(0)
const triggerPasswordModal = ref(0)

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      useToast().error(`Erreur avec le service: Erreur lors de la récupération du profil`, {
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

async function saveUserPassword() {
  if (!user.value) return
  try {
    user.value.email = profileStore.email
    user.value.name = profileStore.name
    user.value.password = newPassword.value
    user.value.life = profileStore.life
    await profileStore.updateProfile(user.value)
    triggerPasswordModal.value++
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Erreur lors de la mise à jour du mot de passe.`,
      { duration: 6000 }
    )
  }
}

async function saveUserName() {
  if (!user.value) return
  try {
    user.value.email = profileStore.email
    await profileStore.updateProfile(user.value)
    reloadProfile()
    triggerNameModal.value++
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Erreur lors de la mise à jour du nom d'utilisateur.`,
      { duration: 6000 }
    )
  }
}

async function reloadProfile() {
  try {
    isLoading.value = true
    await profileStore.getProfile()
    if (onError.value) {
      useToast().error(`Erreur avec le service: Erreur lors de la récupération du profil`, {
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
}

const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)
const isSame = (value: any) =>
  value != newPassword.value ? 'Le mot de passe doit être confirmé correctement.' : true
</script>

<template>
  <div class="container">
    <div v-if="!isLoading">
      <div>
        <h1 class="text-center">Profile</h1>
        <div id="name">Nom: {{ name }}</div>
        <div id="email">Courriel: {{ email }}</div>
        <div id="role">Role: {{ role }}</div>
        <div id="life">Vie: {{ life }}</div>
      </div>

      <div>
        <h3>Modification du mot de passe :</h3>
        <Form @submit="saveUserPassword">
          <div class="form-group">
            <label for="newPassword">Nouveau mot de passe :</label>
            <Field
              type="password"
              class="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="Entrer votre nouveau mot de passe"
              v-model="newPassword"
              :rules="isRequired"
            />
            <ErrorMessage class="text-danger" name="newPassword" />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmation mot de passe :</label>
            <Field
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmer votre nouveau mot de passe"
              v-model="confirmPassword"
              :rules="(isRequired, isSame)"
            />
            <ErrorMessage class="text-danger" name="confirmPassword" />
          </div>
          <button type="submit" id="submit-password" class="btn btn-primary">Confirmer</button>
        </Form>
      </div>

      <div v-if="profileStore.role == 'teacher'">
        <h3>Modification du nom complet :</h3>
        <Form @submit="saveUserName">
          <div class="form-group">
            <label for="oldPassword">Nouveau nom complet :</label>
            <Field
              type="text"
              class="form-control"
              id="name"
              name="name"
              placeholder="Entrer votre nouveau nom"
              v-model="user.name"
              :rules="isRequired"
            />
            <ErrorMessage class="text-danger" name="name" />
          </div>
          <button type="submit" id="submit-name" class="btn btn-primary">Confirmer</button>
        </Form>
      </div>
    </div>
    <!--Modal de modification de mot de passe-->
    <PasswordModal
      :trigger="triggerPasswordModal"
      title="Succès !"
      body="Votre mot de passe a été modifié avec succès."
      dismissButton="Ok"
    />
    <!--Modal de modification de nom-->
    <NameModal
      :trigger="triggerNameModal"
      title="Succès !"
      body="Votre nom a été modifié avec succès."
      dismissButton="Ok"
    />
    <div class="pt-5 mt-5 d-flex justify-content-center align-items-center">
      <Loading :active="isLoading" />
    </div>
  </div>
</template>

<style scoped></style>
