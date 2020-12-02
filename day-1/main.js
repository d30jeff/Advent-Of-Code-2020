const fs = require('fs');
const readline = require('readline');

const NUMBERS = 3;

const readStream = fs.createReadStream('./input.txt');
const readInterface = readline.createInterface({
  input: readStream,
});

const numbers = [];

readInterface.on('line', (line) => {
  if (line) {
    numbers.push(Number(line));
  }
});

const generateRandomIndices = (indices = []) => {
  if (indices.length === NUMBERS) {
    return indices;
  }

  const randomIndex = Math.floor(Math.random() * numbers.length).toString();

  if (indices.includes(randomIndex) === false) {
    indices.push(randomIndex);
  }
  generateRandomIndices(indices);
  return indices;
};

const getTotal = (indices) => {
  let total = 0;

  indices.forEach((index) => {
    total += numbers[index];
  });

  return total;
};

readInterface.on('close', () => {
  let indices;
  let answer;

  while (answer !== 2020) {
    indices = generateRandomIndices();
    answer = getTotal(indices);
  }

  const total = indices.reduce((acc, curr) => {
    return acc * numbers[curr];
  }, 1);

  console.log(total);
});
