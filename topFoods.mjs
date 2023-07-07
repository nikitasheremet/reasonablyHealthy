import foods from "./foods.json" assert { type: "json" };
import minerals from "./minerals.json" assert { type: "json" };
import vitamins from "./vitamins.json" assert { type: "json" };

const nutrientRequirements = { ...minerals, ...vitamins }

const nutrientSums = Object.keys(nutrientRequirements).reduce((object, nutrient) => {
    return { ...object, [nutrient]: 0 }
}, {})

function logTopMentionedFoods() {
    let foodCounts = {}
    for (let nutrient in foods) {
        let foodsHighInNutrient = []
        foodsHighInNutrient = foods[nutrient].foods
        for (let food of foodsHighInNutrient) {
            const foodName = food.name
            if (foodCounts[foodName]) {
                foodCounts[foodName] = foodCounts[foodName] + 1
            } else {
                foodCounts[foodName] = 1
            }
        }
    }

    const filteredFoodCounts = Object.entries(foodCounts).sort((foodItemA, foodItemB) => {
        if (foodItemA[1] < foodItemB[1]) return 1
        if (foodItemA[1] > foodItemB[1]) return -1
        return 0
    }).slice(0, 20).reduce((objectOfFoods, currentFoodItem) => {
        objectOfFoods[currentFoodItem[0]] = currentFoodItem[1]
        return objectOfFoods
    }, {})

    buildTree(Object.keys(filteredFoodCounts), 10)
}

logTopMentionedFoods()

function getVitaminPercentagesForFoodItem(foodItem, sourceOfVitamins) {
    for (let vitamin in foods) {
        const foodItemPresent = foods[vitamin].foods.find(food => food.name === foodItem)
        if (foodItemPresent) {
            const requiredDailyValueOfNutrient = nutrientRequirements[vitamin].dose.value

            const { value, servingSize } = foodItemPresent
            const valuePerHundredGrams = ((value / servingSize) * 100).toFixed(2)
            const percentOfDailyValueOfNutrient = ((valuePerHundredGrams / requiredDailyValueOfNutrient) * 100).toFixed(2)
            sourceOfVitamins[vitamin] = sourceOfVitamins[vitamin] + Number(percentOfDailyValueOfNutrient)

        }
    }
    return sourceOfVitamins
}

function buildTree(arrayOfValues, lenghtOfCombo) {
    const lengthOfArrayOfValues = arrayOfValues.length
    if (!lengthOfArrayOfValues || lenghtOfCombo > lengthOfArrayOfValues) {
        return arrayOfValues
    }
    // figure out why I can't just call the internal function directly without having to do the first round here
    let treeObject = []
    for (let [index, value] of arrayOfValues.entries()) {
        const remainingValue = arrayOfValues.slice(index + 1)
        if (remainingValue.length + 1 >= lenghtOfCombo) {
            const currentNode = { value, children: internalBuildTree(remainingValue, lenghtOfCombo - 1) }
            treeObject.push(currentNode)
        }

    }


    let result = trav(treeObject).flat(lenghtOfCombo - 1)


    const bestResult = {
        listOfItems: undefined,
        percentages: undefined
    }

    result = result.slice(0, 1)

    for (let possibleCombination of result) {
        let totalNutrients = { ...nutrientSums }
        for (let itemInCombination of possibleCombination) {

            totalNutrients = getVitaminPercentagesForFoodItem(itemInCombination, totalNutrients)
        }
        if (!bestResult.listOfItems) {
            bestResult.listOfItems = possibleCombination
            bestResult.percentages = totalNutrients
        } else {
            if (!compareBestResult(bestResult.percentages, totalNutrients)) {
                bestResult.listOfItems = possibleCombination
                bestResult.percentages = possibleCombination
            }
        }

    }
    console.log("BEST", bestResult)
}

function compareBestResult(currentBestResult, testObject) {
    const winsForTestObject = 0
    const winsForCurrent = 0
    for (let testNutrient in testObject) {
        if (testObject[testNutrient] > currentBestResult[testNutrient]) {
            winsForTestObject++
        } else {
            winsForCurrent++
        }
    }
    return winsForCurrent >= winsForTestObject
}

// buildTree(["A", "B", "C"], 2)

function internalBuildTree(childrenArray, lenghtOfCombo) {
    if (lenghtOfCombo <= 0) {
        return []
    }
    const treeArray = []
    for (let [index, value] of childrenArray.entries()) {
        const remainingValue = childrenArray.slice(index + 1)
        if (remainingValue.length + 1 >= lenghtOfCombo) {
            const currentNode = { value, children: internalBuildTree(remainingValue, lenghtOfCombo - 1) }
            treeArray.push(currentNode)
        }

    }

    return treeArray
}


function trav(arrayOfNodes, values = []) {
    let output = []
    if (!arrayOfNodes.length) {
        return values
    }
    for (let node of arrayOfNodes) {
        const valueCopy = [...values]
        valueCopy.push(node.value)
        const result = trav(node.children, valueCopy)
        output.push([...result])
    }
    return output
}
