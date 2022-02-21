const generateBtn = document.querySelector("#generate");
const lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const selectedSpecialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'];

const setPasswordParams = () => {

  const passwordLength = parseInt(prompt('Enter password length > 8 characters'));
  if (passwordLength < 8) {
    alert('Password must be greater than 8 chars');
    return;
  }
  else if (passwordLength > 128) {
    alert('Password must not exceed 128 characters');
    return;
  }
  else if (isNaN(passwordLength)) {
    alert('Password must be a number');
    return;
  }

  const includeSpecialChars = confirm('Do you want to add special characters?');
  const includeNumericChars = confirm('Do you want to add numeric characters?');
  const includeLowerCaseLetters = confirm('Do you want to add lowercase characters?');
  const includeUpperCaseLetters = confirm('Do you want to add uppercase characters?');

  if (includeSpecialChars === false && includeNumericChars === false && includeLowerCaseLetters === false && includeUpperCaseLetters === false) {
    alert('One character type needs to be selected');
    return;
  };

  const passwordParms = {
    length: passwordLength,
    specialChars: includeSpecialChars,
    numericChars: includeNumericChars,
    includeLowerCaseLetters: includeLowerCaseLetters,
    includeUpperCaseLetters: includeUpperCaseLetters
  };

  return passwordParms;
}

const getRandom = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomEl = arr[randomIndex];

  return randomEl;
}

const generatePassword = () => {

  const passwordParams = setPasswordParams();
  const result = [];
  let possibleChars = [];
  const guaranteedChars = [];

  if (passwordParams.includeUpperCaseLetters) {
    possibleChars = possibleChars.concat(upperCaseLetters);
    guaranteedChars.push(getRandom(upperCaseLetters));
  }
  if (passwordParams.includeLowerCaseLetters) {
    possibleChars = possibleChars.concat(lowerCaseLetters);
    guaranteedChars.push(getRandom(lowerCaseLetters));
  }
  if (passwordParams.numericChars) {
    possibleChars = possibleChars.concat(numbers);
    guaranteedChars.push(getRandom(numbers));
  }
  if (passwordParams.specialChars) {
    possibleChars = possibleChars.concat(selectedSpecialCharacters);
    guaranteedChars.push(getRandom(selectedSpecialCharacters));
  }

  for (let i = 0; i < passwordParams.length; i++) {
    const randomChar = getRandom(possibleChars);
    result.push(randomChar);
  }

  for (let i = 0; i < guaranteedChars.length; i++) {
    result[i] = guaranteedChars[i];

    return result.join('');
  }

}

const writePassword = () => {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

}

generateBtn.addEventListener("click", writePassword)
