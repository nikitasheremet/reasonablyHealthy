<script setup lang="ts">
import { computed, ref } from "vue";

const arrayOfPossibleFoodItems = ["tomato", "cucumber", "carrot"];

// Stateful data
const inputText = ref("");
const inputTextInFocus = ref(true);
/////////////

// Computed data
const filteredDownPossibleFoodItems = computed(() => {
  return arrayOfPossibleFoodItems.filter(
    (foodItemSuggestion) =>
      inputText.value && foodItemSuggestion.includes(inputText.value)
  );
});

const isFoodSuggestionShown = computed(() => {
  return filteredDownPossibleFoodItems.value.length && inputTextInFocus.value;
});
////////////

const handleInputFocusOut = (event: FocusEvent) => {
  if (event.relatedTarget) {
    let relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget.id === "food-item-input") {
      return;
    }
  }
  inputTextInFocus.value = false;
};

const handleInput = () => {
  inputTextInFocus.value = true;
};

const handleSuggestedFoodItemClick = (foodItemClicked: string) => {
  inputTextInFocus.value = false;
  inputText.value = foodItemClicked;
};
</script>

<template>
  <div id="food-item-input" tabindex="-1">
    <input
      @focusout="handleInputFocusOut"
      @input="handleInput"
      placeholder="Please enter your food item"
      type="text"
      v-model="inputText"
    />
    <div v-if="isFoodSuggestionShown">
      <p
        @click="() => handleSuggestedFoodItemClick(filteredFoodItem)"
        v-for="filteredFoodItem in filteredDownPossibleFoodItems"
      >
        {{ filteredFoodItem }}
      </p>
    </div>
  </div>
</template>
