<script script lang="ts">
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profileStore'

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const onError = computed(() => profileStore.onError)

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})</script>


<template>
  <div class="container">
    <form>
    <div class="form-group">
      <label for="oldPassword">Ancien mot de passe :</label>
      <input type="password" class="form-control" id="oldPassword" placeholder="Entrer votre ancien mot de passe">
    </div>
    <div class="form-group">
      <label for="newPassword">Nouveau mot de passe :</label>
      <input type="password" class="form-control" id="newPassword" placeholder="Entrer votre nouveau mot de passe">
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirmation mot de passe :</label>
      <input type="password" class="form-control" id="confirmPassword" placeholder="Confirmer votre nouveau mot de passe">
    </div>
    <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
  </div>
    
</template>