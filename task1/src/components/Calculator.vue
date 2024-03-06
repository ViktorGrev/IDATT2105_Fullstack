<template>
  <main>
    <div id="CalculatoroBorder">
      <div class="input">
        <NumericInput :displayedNumber="displayedNumber" @input="updateDisplayedNumber" />
      </div>
      <div class="numbers">
        <NumericButton v-for="num in numbers" :key="num" :value="num" :id="num" @number-clicked="updateDisplayedNumber" />
        <SymbolButton :value="'.'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
      </div>
      <div class="symbol">
        <Button class="HandlingButton" id="del" @click="removeLast">DEL</Button>
        <Button class="HandlingButton" id="clear" @click="removeAll">C</Button>
        <SymbolButton :value="'/'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <SymbolButton :value="'*'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <SymbolButton :value="'-'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <SymbolButton :value="'+'" @symbol-clicked="handleSymbolClicked"></SymbolButton>
        <Button class="HandlingButton" id="equal" @click="sum" data-testid="equal-button">=</Button>
      </div>
      <div class="history">
        <text>History: </text>
        <div id="result">
          <p v-for="(result, index) in calculationResults" :key="index">{{ result }}</p>
        </div>
      </div>
      <div>
      <p id = "previous"></p>
    </div>
      <nav>
        <RouterLink to="/">Calculator</RouterLink>
        <RouterLink to="/about">Forms</RouterLink>
      </nav>
      <div>
        <Button class="HandlingButton" id="previous" @click="checkPreviousResult">Previous</Button>
      </div>
    </div>
  </main>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/counter';
import NumericButton from '@/components/NumericButton.vue';
import NumericInput from '@/components/NumericInput.vue';
import SymbolButton from '@/components/SymbolButton.vue';

const numbers = Array.from({ length: 10 }, (_, index) => index);
const displayedNumber = ref<string | null>(null);
const calculationResults = ref<string[]>([]);
const store = useUserStore();
console.log(store.user);

const updateDisplayedNumber = (number: string) => {
  if (displayedNumber.value === null || displayedNumber.value === '0') {
    displayedNumber.value = number + "";
  } else {
    displayedNumber.value += number;
  }
};

const handleSymbolClicked = (symbol: string) => {
  if (displayedNumber.value !== null) {
    displayedNumber.value += symbol;
  }
};

const removeLast = () => {
  if (displayedNumber.value !== null && displayedNumber.value !== '0') {
    displayedNumber.value = displayedNumber.value.slice(0, -1) || null;
  }
};

const removeAll = () => {
  displayedNumber.value = null;
};

interface Calculation {
  expression: string;
  result: string;
}

const checkPreviousResult = async () => {
  const apiUrl = 'http://localhost:8080/api/previous';
  let username = store.user; // Assuming `store.user` contains the username
  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        username: username
      }
    });

    // Log the list received from the backend
    console.log(response.data);

    // Construct a string to display previous calculations
    let previousCalculationsString = '';
    response.data.forEach((calculation: Calculation) => { // Explicitly define the type of 'calculation'
      previousCalculationsString += `Expression: ${calculation.expression}, Result: ${calculation.result}<br>`;
    });

    // Update the content of the <p> element with the previous calculations
    const previousElement = document.getElementById('previous');
    if (previousElement) {
      previousElement.innerHTML = previousCalculationsString;
    } else {
      console.error('Element with id "previous" not found.');
    }
  } catch (error) {
    console.error('Error fetching previous calculations:', error);
  }
};



const hasDivideByZero = (expression: string) => /\/0/.test(expression);

const sum = async () => {
  let expression = displayedNumber.value;
  if (expression !== null) {
    if (hasDivideByZero(expression)) {
      calculationResults.value.push("ERROR (Can't divide by 0)");
      displayedNumber.value = null;
      return;
    }
    try {
      // Replace this with the URL of your Spring Boot application
      const apiUrl = 'http://localhost:8080/api/calculator/calculate';
      // Extract the username from the store or the current user context
      let username = store.user;
      // Append the username as a query parameter
      const urlWithParams = `${apiUrl}?username=${encodeURIComponent(username)}`;
      // Make sure to send the expression within the request body as expected
      const response = await axios.post(urlWithParams, { expression }); // Only expression is in the body
      // Update the displayedNumber and calculationResults with the response from the backend
      calculationResults.value.push(`The result of ${expression} is: ${response.data.result}`);
      displayedNumber.value = String(response.data.result);
    } catch (error) {
      // Handle any errors, such as invalid expressions
      let errorMessage = "ERROR (Invalid expression)";
      calculationResults.value.push(errorMessage);
      displayedNumber.value = null;
    }
  }

  /*
  let expression = displayedNumber.value;
  if (expression !== null) {
    if (hasDivideByZero(expression)) {
      calculationResults.value.push("ERROR (Can't divide by 0)");
      displayedNumber.value = null;
      return;
    }
    try {
      let result = eval(expression);
      calculationResults.value.push(`The result of ${expression} is: ${result}`);
      displayedNumber.value = String(result);
    } catch (e) {
      calculationResults.value.push("ERROR (Invalid expression)");
      displayedNumber.value = null;
    }
  }*/
};
</script>
  
<style scoped>
.input {
  grid-area: input;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.numbers {
  grid-area: numbers;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 2px solid gray;
  justify-content: center;
  align-items: center;
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
  font-size: 20px;
}

#CalculatoroBorder {
  border-color: grey;
  border-width: 2px;
  border-radius: 10px;
  border-style: solid;
  width: 480px;
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
  width: 100px;
  height: 40px;
  background-color: lightblue;
  color: black;
  border-radius: 50%;
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

#previous {
  font-size: 10px;
  color: yellow;
}
</style>
  