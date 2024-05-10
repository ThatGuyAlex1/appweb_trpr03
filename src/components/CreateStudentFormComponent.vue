<script setup lang="ts"></script>

<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="studentName">Nom :</label>
        <input
          type="text"
          class="form-control"
          id="studentName"
          placeholder="Entrer le nom de l'étudiant."
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Entrer son mot de passe provisoire"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmation mot de passe :</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="Confirmer son mot de passe"
        />
      </div>
      <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
  </div>
</template>
