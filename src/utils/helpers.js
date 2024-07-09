function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) { // for gen coordinates
  return (Math.random() * (max - min) + min).toFixed(6);
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function declOfNumText(number, arr, insertValue = false) {
  var cases = [2, 0, 1, 1, 1, 2];
  var res = arr[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]];
  if (insertValue == true) {
    res = number + ' ' + res;
  }
  return res;
}

export {
  getRandomInt,
	getRandomFloat,
  declOfNumText,
  delay
};
