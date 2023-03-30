<script lang="ts">
import TheWelcome from "../components/TheWelcome.vue";

export default {
  methods: {
    pushToRegisterPage() {
      this.$router.push("/register");
    },
  },
};
</script>

<template>
  <main>
    <button @click="pushToRegisterPage">Register</button>
  </main>
</template>
