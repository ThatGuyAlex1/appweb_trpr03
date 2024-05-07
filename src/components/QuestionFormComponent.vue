<script script lang="ts"></script>


<template>
  <div class="container">
    <form>
    <div class="form-group">
      <label for="questionTitle">Courte description de votre question</label>
      <input type="text" class="form-control" id="questionTitle" placeholder="Entrer votre question">
    </div>
    <div class="form-group">
      <label for="priorityLevel">Niveau de priorité :</label>
      <input type="number" class="custom-number" min="1" max="5" default="1" value="1" id="priorityLevel">
    </div>
    <div class="form-group">
      <label for="questionType">Catégorie de questions</label>
      <select class="form-control" id="questionType">
        <option>Aide au devoir</option>
        <option>Clarification de concept</option>
        <option>Préparation a un examen</option>
        <option>Question sur un TP</option>
        <option>Autres</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
  </div>
    
</template>