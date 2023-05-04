export interface FoodItems {
    [key: string]: {
        servingSizes: Array<string>
        vitamins: Vitamins
        minerals: Minerals
    }
}

interface Vitamins {
    vitaminA: string;
    vitaminD: string;
    vitaminE: string;
    vitaminK: string;
    vitaminC: string;
    vitaminB1: string
    vitaminB2: string;
    vitaminB3: string;
    vitaminB5: string;
    vitaminB6: string;
    vitaminB7: string;
    vitaminB9: string;
    vitaminB12: string;
}

interface Minerals {
    potassium: string;
    sodium: string;
    calcium: string;
    phosphorus: string;
    magnesium: string;
    iron: string;
    zinc: string;
    manganese: string;
    copper: string;
    iodine: string;
    chromium: string;
    molybdenum: string;
    selenium: string;
    cobalt: string;
}