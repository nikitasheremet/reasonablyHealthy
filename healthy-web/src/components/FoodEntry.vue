<script setup lang="ts">
import { FoodItemInput, FoodItemServingSize } from "./index";
import foodItems from "../assets/foods";
import { computed, ref } from "vue";

const foodItemSelected = ref("");

const updateServingSizes = computed(() => {
  return foodItems[foodItemSelected.value]?.serving || [];
});

const updateInput = (foodName: string) => {
  foodItemSelected.value = foodName;
};
</script>

<template>
  <FoodItemInput @input-change="updateInput" :food-items="foodItems" />
  <FoodItemServingSize :serving-sizes="updateServingSizes" />
</template>
