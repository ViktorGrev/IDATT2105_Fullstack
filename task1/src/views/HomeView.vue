<template>
  <main>
    <div id="CalculatoroBorder">
      <div class="input">
        <NumericInput :displayedNumber="displayedNumber" @input="updateDisplayedNumber" />
      </div>
      <div class="numbers">
        <NumericButton v-for="num in numbers" :key="num" :value="num" @number-clicked="updateDisplayedNumber" />
      </div>
      <div class="symbol">
        <Button class="HandlingButton" id="del" @click="removeLast">DEL</Button>
        <Button class="HandlingButton" id="clear" @click="removeAll">C</Button>
        <SymbolButton :value="'/'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <SymbolButton :value="'*'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <SymbolButton :value="'-'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <SymbolButton :value="'+'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <Button class="HandlingButton" id="equal" @click="sum">=</Button>
      </div>
      <div class="history">
        <text>History: </text>
        <div id="result"></div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NumericButton from '@/components/NumericButton.vue';
import NumericInput from '@/components/NumericInput.vue';
import SymbolButton from '@/components/SymbolButton.vue';

const numbers = Array.from({ length: 10 }, (_, index) => index);
const displayedNumber = ref<string | null>(null);

const updateDisplayedNumber = (number: string) => {
  if (displayedNumber.value === null || displayedNumber.value === '0') {
    displayedNumber.value = number + "";
  } else {
    displayedNumber.value += number + "";
  }
};

const handleSymbolClicked = (symbol: string) => {
  if (displayedNumber.value === null || displayedNumber.value === '0') {
    displayedNumber.value = symbol;
  } else {
    displayedNumber.value += symbol;
  }
};

const removeLast = () => {
  if (displayedNumber.value !== null && displayedNumber.value !== '0') {
    let numberArray = displayedNumber.value.split('');
    numberArray.pop();
    displayedNumber.value = numberArray.join('');
  }
}

const removeAll = () => {
  displayedNumber.value = null;
}

const sum = () => {
  let expression = displayedNumber.value;
  if (expression !== null) {
    let result = eval(expression);
    
    // Get the result box element
    let resultBox = document.getElementById("result");

    // Check if resultBox exists
    if (resultBox !== null) {
      // Create a new paragraph element
      let paragraph = document.createElement("p");

      // Set the text content of the paragraph to the result
      paragraph.textContent = "The result of " + expression + " is: " + result;


      // Append the paragraph to the result box
      resultBox.appendChild(paragraph);

      displayedNumber.value = result;
    } else {
      console.error("Result box element not found.");
    }
  } else {
    console.error("The value is null."); // Handle the case where the value is null
  }
}
</script>

<style scoped>
.input {
  grid-area: input;
  display: flex;
  justify-content: center;
  align-items: center;
}

.numbers {
  grid-area: numbers;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 2px solid gray;
}

.symbol {
  grid-area: symbol;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.history {
  grid-area: history;
}

#CalculatoroBorder {
  border-color: grey;
  border-width: 2px;
  border-radius: 10px;
  border-style: solid;
  width: 500px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'input input input input input input'
    'numbers numbers numbers numbers symbol symbol'
    'history history history history history history';
  grid-gap: 1px;
  padding: 5px;
  background-color: gray;
}

.HandlingButton {
  width: 100%;
  height: 100%;
  background-color: lightblue;
  color: black;
  border-radius: 5px;
}

.HandlingButton:hover {
  border: 5px solid red;
}

.NumericInput {
  padding: 20px 30px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  border: 2px solid black;
  text-align: right;
}

.NumericInput:hover {
  border-color: #2ecc71;
}
</style>
