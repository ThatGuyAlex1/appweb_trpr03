<script setup lang="ts">
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
  router.push({
    name: 'Login'
  })
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav mr-auto">
        <!-- Le ":class={...}" veut dire si la route est égal à 'Home' alors "active" de bootstrap sera ajoutée à l'attribut "class". Ce qui aura comme effet de mettre en évidence l'option du menu. -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Home' }"
          v-if="isLoggedIn"
          :to="{ name: 'Home' }"
        >
          Accueil
        </RouterLink>

        <!-- La page Profile n'est accessible que si l'utilisateur est connecté (v-if). Voir la propriété calculée isLoggedIn() qui retourne la valeur de la propriété isLoggedIn du store. -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Profile' }"
          v-if="isLoggedIn"
          :to="{ name: 'Profile' }"
        >
          Profile
        </RouterLink>
        <!-- La page Manager n'est accessible que si l'utilisateur connecté est un teacher (v-if). -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Manager' }"
          v-if="isTeacher"
          :to="{ name: 'Manager' }"
        >
          Gestionnaire
        </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto">
          <a class="nav-link" @click="logout" v-if="isLoggedIn" href="#"> Se déconnecter </a>
          <RouterLink
            v-else
            class="nav-link"
            :class="{ active: $route.name == 'Login' }"
            :to="{ name: 'Login' }"
          >
            Connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
