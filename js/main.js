// O verificador de força de senha se baseia nas seguintes regras:
//       - Se a senha tiver mais de 1 caractere - 1 ponto;
//       - Se a senha tiver mais de 6 caracteres - 2 pontos;
//       - Se a senha tiver 10 ou mais caracteres - 3 pontos;
//       - Se a senha tiver 12 ou mais caracteres - 4 pontos;
//       - Se a senha tiver 14 ou mais caracteres - 5 pontos;
//       - Se a senha contiver pelo menos um número - +1 ponto;
//       - Se a senha contiver pelo menos uma letra maiúscula - +1 ponto;
//       - Se a senha contiver pelo menos um caractere minusculo - +1 ponto;
//       - Se a senha contiver pelo menos um caractere especial(não alfanumérico) - +2 pontos;

// Total de pontos possíveis: 10.
//       - A senha será considerada "Forte" se somar 9 ou mais pontos;
//       - A senha será considerada "Moderada" se somar mais de 5 e menos de 9 pontos;
//       - A senha será considerada "Fraca" se somar 5 ou menos pontos.

//import toggle password visibility icons
import { iconEyeSlashed, iconEyeFull } from './js/icons.js'
import printArrayToString from './js/printArrayToString.js'
import easterEgg from './js/drugelis.js'
const frame = document.querySelector('#frame')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
})

//handles password field visibility
const toggleButton = document.querySelector('#togglePasswordVisibility')
let isVisible = false

toggleButton.addEventListener('click', (e) => {
  const input = document.querySelector('#password')
  if (isVisible) {
    toggleButton.innerHTML = iconEyeFull
    input.type = 'password'
  } else {
    toggleButton.innerHTML = iconEyeSlashed
    input.type = 'text'
  }
  isVisible = !isVisible
})

//password strenght color status definitions
const colorWeak = 'hsl(0, 73.7%, 41.8%)'
const colorModerate = 'hsl(24.600000000000023, 95%, 53.1%)'
const colorStrong = 'hsl(160.10000000000002, 84.1%, 39.4%)'
const injectVariablesLocation = document.querySelector('form')

//initializes passwordStrengthPoints (int)
let passwordStrengthPoints
let auxMessageArray


const PASSWORD_INPUT = document.querySelector('#password')

PASSWORD_INPUT.addEventListener('keyup', (e) => {
  e.target.value = e.target.value.trim()
  const passwordAttempt = e.target.value

  // ~ ~ ~ ~ 
  easterEgg(frame, passwordAttempt)

  if (passwordAttempt) {
    //clear password points each time it runs
    passwordStrengthPoints = 0

    //empties aux text array each time it runs
    auxMessageArray = []

    //routine: checks for the password length
    testPasswordLength(passwordAttempt)

    if (hasNumber(passwordAttempt)) {
      passwordStrengthPoints += 1
    } else auxMessageArray.push('adicionando números')

    if (hasLowercase(passwordAttempt)) {
      passwordStrengthPoints += 1
    } else auxMessageArray.push('adicionando caracteres minúsculos')

    if (hasUppercase(passwordAttempt)) {
      passwordStrengthPoints += 1
    } else auxMessageArray.push('adicionando caracteres maiúsculos')

    if (hasSpecialChars(passwordAttempt)) {
      passwordStrengthPoints += 2
    } else auxMessageArray.push('adicionando caracteres especiais')

    //logs the password total points value and invokes a function to repaint the dom
    console.log('pontuação da senha é:::', passwordStrengthPoints)
    updatePasswordStrengthStatus(passwordStrengthPoints)
  }

})

//updates color bar filler and info text
function updatePasswordStrengthStatus(points) {
  const alertTitle = document.querySelector('#alertTitle')
  const alertMessage = document.querySelector('#alertMessage')
  const auxMessage = document.querySelector('#auxMessage')
  const auxMessageText = printArrayToString(auxMessageArray)

  //if strong
  if (points >= 9) {
    injectVariablesLocation.setAttribute('style', `--accent-color: ${colorStrong}; --filled: ${points * 10}%`)
    alertTitle.innerText = 'Boa!'
    alertMessage.innerText = 'Sua senha atinge um bom nível de segurança.'
    auxMessage.innerText = ''
  }
  //if moderate
  else if (points >= 5) {
    injectVariablesLocation.setAttribute('style', `--accent-color: ${colorModerate}; --filled: ${points * 10}%`)
    alertTitle.innerText = 'Moderada.'
    alertMessage.innerText = 'Sua senha pode melhorar.'
    auxMessage.innerText = `Você pode melhorar sua segurança ${auxMessageText}.`
  }
  //if weak
  else {
    injectVariablesLocation.setAttribute('style', `--accent-color: ${colorWeak}; --filled: ${points * 10}%`)
    alertTitle.innerText = 'Fraca.'
    alertMessage.innerText = 'Sua senha é muito vulnerável.'
    auxMessage.innerText = `Você pode melhorar sua segurança ${auxMessageText}.`
  }
}

//checks for password str length
function testPasswordLength(str) {
  if (str.length >= 14) {
    passwordStrengthPoints += 5
  }
  else if (str.length >= 12) {
    passwordStrengthPoints += 4
  }
  else if (str.length >= 10) {
    passwordStrengthPoints += 3
    auxMessageArray.push('aumentando o número de caracteres')
  }
  else if (str.length >= 6) {
    passwordStrengthPoints += 2
    auxMessageArray.push('aumentando o número de caracteres')
  }
  else {
    passwordStrengthPoints += 1
    auxMessageArray.push('aumentando o número de caracteres')
  }
}

//checks for number in password str, returns Boolean
function hasNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if (isNaN(Number(str[i])) === false) {
      return true
    }
  }
  return false
}

//cheks for uppercase chars, returns Boolean
function hasUppercase(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      return true
    }
  }
  return false
}

//checks for lowercase chars, returns Boolean
function hasLowercase(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= 'a' && str[i] <= 'z') {
      return true
    }
  }
  return false
}

//checks for special chars, returns Boolean
function hasSpecialChars(str) {
  for (let i = 0; i < str.length; i++) {
    if (!(str[i] >= 'A' && str[i] <= 'Z') && !(str[i] >= 'a' && str[i] <= 'z') && isNaN(str[i])) {
      return true
    }
  }
  return false
}