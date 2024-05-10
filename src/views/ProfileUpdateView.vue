<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useProfileStore } from '../stores/profileStore'
import type User from '../scripts/user'
import Loading from 'vue-loading-overlay'

defineRule('isRequired', required);

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const role = computed(() => profileStore.role)
const onError = computed(() => profileStore.onError)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const user = ref({} as User)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
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

async function saveUserPassword() {
  if (!user.value) return
  try {
    user.value.email = profileStore.email
    user.value.name = profileStore.name
    if(newPassword.value != confirmPassword.value){
      confirm("Le nouveau mot de passe et la confirmation du mot de passe doit être identique")
    }
    else{
      user.value.password = newPassword.value
      console.log(user.value)
      await profileStore.updateProfile(user.value)
      confirm("Mot de passe changé avec succes")
    }
  } catch (error) {
    confirm("Une erreur s'est produite lors de la mise a jour du profil de l'utilisateur.")
  }
}

async function saveUserName() {
  if (!user.value) return
  try {
    user.value.email = profileStore.email
    await profileStore.updateProfile(user.value)
    confirm("Le nom a changé avec succes")
  } catch (error) {
    confirm("Une erreur s'est produite lors de la mise a jour du profil de l'utilisateur.")
  }
}

const isRequired = value => !value ? 'Ce champ est requis.' : true;
</script>


<template>
  <div class="container">
    <h1>Modification du mot de passe :</h1>
    <Form @submit="saveUserPassword">
    <div class="form-group">
      <label for="newPassword">Nouveau mot de passe :</label>
      <Field type="password" class="form-control" id="newPassword" name="newPassword" placeholder="Entrer votre nouveau mot de passe" v-model="newPassword" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="newPassword" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirmation mot de passe :</label>
      <Field type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirmer votre nouveau mot de passe" v-model="confirmPassword" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="confirmPassword" />
    </div>
    <button type="submit" class="btn btn-primary">Confirmer</button>
    </Form>
    <div v-if="profileStore.role == 'teacher'">
    <h1>Modification du nom complet :</h1>
    <Form @submit="saveUserName">
    <div class="form-group">
      <label for="oldPassword">Nouveau nom complet :</label>
      <Field type="text" class="form-control" id="name" name="name" placeholder="Entrer votre nouveau nom" v-model="user.name" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="name" />
    </div>
    <button type="submit" class="btn btn-primary">Confirmer</button>
    </Form>
    </div>
    <Loading :active="isLoading" />
  </div>
    
</template>