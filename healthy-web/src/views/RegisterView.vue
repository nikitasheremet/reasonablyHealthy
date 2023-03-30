<script setup lang="ts">
import FoodItemInput from "@/components/FoodItemInput.vue";
</script>
<template>
  <main>
    <h1>Register: Create a new account</h1>
    <FoodItemInput></FoodItemInput>
    <form>
      <div>
        <label for="registration-input-email">Email:</label>
        <input id="registration-input-email" name="email" type="email" />
      </div>
      <div>
        <label for="registration-input-password">Password:</label>
        <input
          id="registration-input-password"
          name="password"
          type="password"
          pattern="([a-z]|[A-Z]|[0-9]|[!@#$%^&+=_-]){10,}"
        />
      </div>
      <div>
        <label for="registration-input-re-enter-password"
          >Re-Enter Password:</label
        >
        <input
          id="registration-input-re-enter-password"
          name="re-enter-password"
          type="password"
          pattern="([a-z]|[A-Z]|[0-9]|[!@#$%^&+=_-]){10,}"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </main>
</template>
