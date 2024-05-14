<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useStudentStore } from '../stores/studentStore'
import studentForm from '../components/CreateStudentFormComponent.vue'
import type User from '../scripts/user'
import Loading from 'vue-loading-overlay'

defineRule('isRequired', required);

const emit = defineEmits<{
  (event: 'newStudent'): void
}>()

const studentStore = useStudentStore()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

async function addNewUser() {
  try {
    if(password.value != confirmPassword.value){
      confirm("Le mot de passe et la confirmation du mot de passe doit être identique")
    }
    else{
      await studentStore.addSpecificStudent(name.value,email.value,password.value)
      confirm("L'étudiant a été ajouter avec succes")
      emit('newStudent');
    }
  } catch (error) {
    confirm("Une erreur s'est produite lors de l'ajout de l'étudiant.")
  }
}
const isRequired = value => !value ? 'Ce champ est requis.' : true;
</script>


<template>
  <div class="container">
    <Form @submit="addNewUser">
    <div class="form-group">
      <label for="studentName">Nom :</label>
      <Field type="text" class="form-control" id="studentName" name="studentName" placeholder="Entrer le nom de l'étudiant." v-model="name" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="studentName" />
    </div>
    <div class="form-group">
      <label for="studentEmail">Email :</label>
      <Field type="text" class="form-control" id="studentEmail" name="studentEmail" placeholder="Entrer le email de l'étudiant." v-model="email" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="studentEmail" />
    </div>
    <div class="form-group">
      <label for="password">Mot de passe :</label>
      <Field type="password" class="form-control" id="password" name="password" placeholder="Entrer son mot de passe provisoire" v-model="password" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="password" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirmation mot de passe :</label>
      <Field type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirmer son mot de passe" v-model="confirmPassword" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="confirmPassword" />
    </div>
    <button type="submit" class="btn btn-primary">Envoyer</button>
    </Form>
  </div>
    
</template>