const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./input.txt');
const readInterface = readline.createInterface({
  input: readStream,
});

const numbers = [];
const answers = {
  first: 0,
  second: 0,
};

readInterface.on('line', (line) => {
  if (line) {
    numbers.push(line);
  }
});

const solveFirstQuestion = () => {
  numbers.forEach((number) => {
    const [policy, password] = number.split(':');
    const [_, char] = policy.split(' ');
    const [min, max] = policy.replace(/[a-zA-Z]/, '').split('-');

    const matchingLength = (password.match(new RegExp(char.trim(), 'g')) || [])
      .length;

    const isValid =
      matchingLength >= Number(min) && matchingLength <= Number(max);

    if (isValid) {
      answers.first++;
    }
  });
};

const solveSecondQuestion = () => {
  numbers.forEach((number) => {
    let [policy, password] = number.split(':');
    let [_, char] = policy.split(' ');
    const [min, max] = policy.replace(/[a-zA-Z]/, '').split('-');
    const firstIndex = Number(min);
    const lastIndex = Number(max);
    char = char.trim()
    password = password.trim();

    if (firstIndex === 0 || lastIndex === 0) {
      return;
    }

    const firstCorrect = password[firstIndex - 1] === char;
    const secondCorrect = password[lastIndex - 1] === char;

    const isValid = firstCorrect + secondCorrect === 1;

    if (isValid) {
      answers.second++;
    }
  });
};

readInterface.on('close', () => {
  solveFirstQuestion();
  solveSecondQuestion();

  console.log('First', answers.first);
  console.log('Second', answers.second);
});
