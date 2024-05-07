<script script lang="ts"></script>


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