document.getElementById('loginBtn1').addEventListener('click', function () {
  let user = prompt('What is your role');
  if (user == 'admin') {
    document.getElementById('loginBtn1').classList.add('hidden');
    document.getElementById('sayHiBtn').classList.remove('hidden');
    document.getElementById('favoriteAnimalBtn').classList.remove('hidden');
  } else if (user == 'student') {
    document.getElementById('loginBtn1').classList.add('hidden');
    document.getElementById('sayHiBtn').classList.remove('hidden');
  } else {
    document.getElementById('loginBtn2').classList.add('hidden');
    document.getElementById('loginBtn1').classList.add('hidden');
    document.getElementById('output').textContent = "I don't know you";
  }
});

document.getElementById('sayHiBtn').addEventListener('click', function () {
  let lang = prompt('Select Lang abbreviation (eng, fr, de, spa)');
  if (!lang) return;
  var greeting = '';
  switch (lang.toLowerCase()) {
    case 'eng':
      greeting = 'Hello';
      break;
    case 'fr':
      greeting = 'Bonjour';
      break;
    case 'de':
      greeting = 'Hallo';
      break;
    case 'spa':
      greeting = 'Hola';
      break;
    default:
      greeting = 'Sorry, but I do not speak your language.';
      break;
  }
  alert(greeting);
});

document
  .getElementById('favoriteAnimalBtn')
  .addEventListener('click', function () {
    let yearOfBirth = prompt('Enter your year of birth');
    if (isNaN(yearOfBirth) || yearOfBirth === null || yearOfBirth === '') {
      alert('Please enter a valid year');
      return;
    }
    let age = 2026 - yearOfBirth;
    if (age < 18) {
      alert('Content is not available due to age restrictions');
    } else if (age >= 18 && age <= 55) {
      let animal = prompt('Enter your favorite animal (cat, dog, frog, mouse)');
      if (!animal) return;
      let imgSrc;
      switch (animal.toLowerCase()) {
        case 'cat':
          imgSrc = 'pictures/Cat.png';
          break;
        case 'dog':
          imgSrc = 'pictures/Dog.png';
          break;
        case 'frog':
          imgSrc = 'pictures/Frog.png';
          break;
        case 'mouse':
          imgSrc = 'pictures/Mouse.png';
          break;
        default:
          imgSrc = '';
          break;
      }
      if (imgSrc) {
        document.getElementById('output').innerHTML =
          '<img src="' + imgSrc + '" width="300">';
      }
    } else {
      document.getElementById('output').innerHTML =
        '<p>Much like mathematics, programming is a logico-deductive system. ' +
        'And I think the important point that I am making is that in a purely ' +
        'logico-deductive system there is no philosophy - everything is known. ' +
        'However, insofar as there is art in mathematics, there is philosophy ' +
        'in mathematics. Insofar as there is art in programming, there is ' +
        'philosophy in programming.</p>';
    }
  });

// Password generator
const generatePassword = function () {
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += Math.floor(Math.random() * 10);
  }
  return password;
};

// Step 2 - Admin path
const adminStep2 = function () {
  let age = prompt('Enter your age');
  let admissionYear = prompt('Enter your year of admission to NWP');
  let graduationYear = Number(admissionYear) + 4;
  let ageAtGraduation = Number(age) + (graduationYear - 2026);
  alert(
    'You will be ' +
      ageAtGraduation +
      " years old and receive your bachelor's degree in CS in " +
      graduationYear
  );
};

// Step 2 - Designer path
const designerStep2 = function () {
  let portfolios = Number(prompt('Enter the number of available portfolios'));
  let yearOfBirth = Number(prompt('Enter your year of birth'));
  let age = 2026 - yearOfBirth;

  if (age >= 14 && age <= 18 && portfolios >= 5 && portfolios <= 10) {
    alert('You get a 10% discount on an optional course on Adobe XD');
  } else if (age > 18 && portfolios >= 10 && portfolios <= 20) {
    alert('You get a 7% discount on an optional course on Adobe XD');
  } else {
    alert('No discount available for your age/portfolio combination');
  }
};

// Step 2 - Tester path (same as designer but QA Pro course)
const testerStep2 = function () {
  let portfolios = Number(prompt('Enter the number of available portfolios'));
  let yearOfBirth = Number(prompt('Enter your year of birth'));
  let age = 2026 - yearOfBirth;

  if (age >= 14 && age <= 18 && portfolios >= 5 && portfolios <= 10) {
    alert('You get a 10% discount on an optional course on QA Pro');
  } else if (age > 18 && portfolios >= 10 && portfolios <= 20) {
    alert('You get a 7% discount on an optional course on QA Pro');
  } else {
    alert('No discount available for your age/portfolio combination');
  }
};

// Step 1 - Login with password validation
const login = function () {
  let username = prompt('Enter your login');
  let password;
  let maxAttempts;

  if (username !== null && username.toLowerCase() === 'admin') {
    password = generatePassword();
    alert('Admin password is: ' + password);
    maxAttempts = 2;
  } else if (username === 'designer') {
    password = '111';
    maxAttempts = 3;
  } else if (username === 'tester') {
    password = '222';
    maxAttempts = 3;
  } else {
    alert('No such user');
    return;
  }

  for (let i = 0; i < maxAttempts; i++) {
    let attempt = prompt('Enter your password');
    if (attempt === password) {
      if (username.toLowerCase() === 'admin') {
        adminStep2();
      } else if (username === 'designer') {
        designerStep2();
      } else if (username === 'tester') {
        testerStep2();
      }
      return;
    } else {
      alert('Wrong password. Attempts left: ' + (maxAttempts - i - 1));
    }
  }

  alert('Access denied');
};

// Part 2 button click
document.getElementById('loginBtn2').addEventListener('click', function () {
  login();
});
