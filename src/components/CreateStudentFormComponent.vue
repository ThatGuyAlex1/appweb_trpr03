<script setup lang="ts">
import { ref, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { confirmed, required } from '@vee-validate/rules'
import { useStudentStore } from '../stores/studentStore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

defineRule('isRequired', required)
defineRule('isSame', confirmed)

const emit = defineEmits<{
  (event: 'newStudent'): void
}>()

const studentStore = useStudentStore()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const onError = computed(() => studentStore.onError)

async function addNewUser() {
  try {
    await studentStore.addSpecificStudent(name.value, email.value, password.value)
    if (onError.value) {
      useToast().error(
        `Erreur avec le service : Une erreur est survenue lors de la création de l'étudiant.`,
        { duration: 6000 }
      )
    }
    emit('newStudent')
  } catch (error) {
    useToast().error(
      `Erreur avec le service : Une erreur est survenue lors de la création de l'étudiant.`,
      { duration: 6000 }
    )
  }
}
const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)
const isSame = (value: any) =>
  value != password.value ? 'Le mot de passe doit être confirmé correctement.' : true
</script>

<template>
  <div class="container">
    <!--Nous savons que nous devrions ne pas utiliser @submit et utiliser @click mais la page resort des erreurs si je nous utilisons pas @submit-->
    <Form @submit="addNewUser">
      <div class="form-group">
        <label for="studentName">Nom :</label>
        <Field
          type="text"
          class="form-control"
          id="studentName"
          name="studentName"
          placeholder="Entrer le nom de l'étudiant."
          v-model="name"
          :rules="isRequired"
        />
        <ErrorMessage class="text-danger" name="studentName" />
      </div>
      <div class="form-group">
        <label for="studentEmail">Email :</label>
        <Field
          type="text"
          class="form-control"
          id="studentEmail"
          name="studentEmail"
          placeholder="Entrer le email de l'étudiant."
          v-model="email"
          :rules="isRequired"
        />
        <ErrorMessage class="text-danger" name="studentEmail" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <Field
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Entrer son mot de passe provisoire"
          v-model="password"
          :rules="isRequired"
        />
        <ErrorMessage class="text-danger" name="password" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmation mot de passe :</label>
        <Field
          type="password"
          class="form-control"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmer son mot de passe"
          v-model="confirmPassword"
          :rules="(isRequired, isSame)"
        />
        <ErrorMessage class="text-danger" name="confirmPassword" />
      </div>
      <button type="submit" id="submit-student" class="btn btn-primary">Envoyer</button>
    </Form>
  </div>
</template>
