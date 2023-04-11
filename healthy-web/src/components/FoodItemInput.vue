<script setup lang="ts">
import { computed, ref, watch } from "vue";

const emit = defineEmits(["inputChange"]);

const props = defineProps<{
  foodItems: Object;
}>();

const arrayOfPossibleFoodItems = Object.keys(props.foodItems);

const inputText = ref("");
const inputTextInFocus = ref(true);

const filteredDownPossibleFoodItems = computed(() => {
  return arrayOfPossibleFoodItems.filter(
    (foodItemSuggestion) =>
      inputText.value && foodItemSuggestion.includes(inputText.value)
  );
});

const isFoodSuggestionShown = computed(() => {
  return filteredDownPossibleFoodItems.value.length && inputTextInFocus.value;
});

watch(inputText, (newValue, _) => {
  emit("inputChange", newValue);
});

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
