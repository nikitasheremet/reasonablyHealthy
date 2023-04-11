interface Food {
  [key: string]: {
    serving: string[];
  };
}
export default {
  tomato: {
    serving: ["small", "medium", "large"],
  },
  cucumber: {
    serving: ["less than one", "one", "more than one"],
  },
  potato: {
    serving: ["a bit", "a good amount", "a lot"],
  },
} as Food;
