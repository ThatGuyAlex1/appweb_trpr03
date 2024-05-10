<script script lang="ts"></script>


<template>
  <div class="container">
    <h1>Liste des étudiants</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Courriel</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.Name }}</td>
          <td>{{ student.email }}</td>
          <td>
            <button class="btn btn-primary">Modifier</button>
            <button class="btn btn-danger">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/create-student" class="btn btn-primary">Créer un étudiant</router-link>
  </div>
    
</template>