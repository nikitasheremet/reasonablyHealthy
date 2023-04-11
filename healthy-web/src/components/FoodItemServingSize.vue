<script setup lang="ts">
const props = defineProps<{
  servingSizes: string[];
}>();
</script>

<template>
  <div>
    <select name="serving-size">
      <option value=""></option>
      <option v-for="servingSize in servingSizes" value="servingSize">
        {{ servingSize }}
      </option>
    </select>
  </div>
</template>
