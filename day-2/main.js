const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./input.txt');
const readInterface = readline.createInterface({
  input: readStream,
});

const numbers = [];
let answer = 0;

readInterface.on('line', (line) => {
  if (line) {
    numbers.push(line);
  }
});

readInterface.on('close', () => {
  numbers.forEach(number => {
    const [policy, password] = number.split(':');
    const [_, char] = policy.split(' ');
    const [min, max] = policy.replace(/[a-zA-Z]/, '').split('-');

    const matchingLength = (password.match(new RegExp(char.trim(), 'g')) || []).length;

    const isValid = matchingLength >= Number(min) && matchingLength <= Number(max);

    if (isValid) {
      answer++;
    }
  });

  console.log(answer);
});
