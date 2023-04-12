<script setup lang="ts">
import { FoodItemInput, FoodItemServingSize } from "./index";
import foodItems from "../../assets/foods";
import { computed, ref } from "vue";

const foodItemSelected = ref("");

const updateServingSizes = computed(() => {
  console.log("inside computed value", foodItems[foodItemSelected.value], foodItems)
  return foodItems[foodItemSelected.value]?.serving || [];
});

const updateInput = (foodName: string) => {
  console.log("new food is", foodName)
  foodItemSelected.value = foodName;
};
</script>

<template>
  <FoodItemInput @input-change="updateInput" :food-items="foodItems" />
  <FoodItemServingSize :serving-sizes="updateServingSizes" />
</template>
