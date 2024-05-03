<script script lang="ts"></script>


<template>
    <form>
    <div class="form-group">
      <label for="questionTitle">Question Title</label>
      <input type="text" class="form-control" id="questionTitle" placeholder="Enter your question">
    </div>
    <div class="form-group">
      <label for="priorityLevel">Priority Level</label>
      <input type="range" class="custom-range" min="1" max="5" id="priorityLevel">
    </div>
    <div class="form-group">
      <label for="questionType">Question Type</label>
      <select class="form-control" id="questionType">
        <option>Homework Help</option>
        <option>Concept Clarification</option>
        <option>Exam Preparation</option>
        <option>Project Guidance</option>
        <option>Other</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>