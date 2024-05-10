<script script lang="ts"></script>


<template>
  <div class="container">
    <h1>Questions</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">description</th>
          <th scope="col">Niveau de priorité</th>
          <th scope="col">Catégorie</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="student.id"> <!-- comment aller chercher les questions ? -->
          <td>{{ question.description }}</td>
          <td>{{ question.priorityLevel }}</td>
          <td>{{ question.questionType }}</td>
          <td>
            <button class="btn btn-danger">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    
</template>