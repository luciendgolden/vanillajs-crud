// src/main.js
import './index.css';

document.querySelector('#app').innerHTML = `
 <div class="container mx-auto p-4">
    <div class="flex justify-end items-center mb-4">
      <label class="flex cursor-pointer gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        <input type="checkbox" id="theme-toggle" class="toggle theme-controller" />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </label>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h1 class="text-2xl font-bold mb-4">Person anlegen</h1>
        <form id="person-form" class="space-y-4">
          <div>
            <label for="firstname" class="block text-sm font-medium">Vorname</label>
            <input type="text" id="firstname" class="input input-bordered w-full" />
          </div>
          <div>
            <label for="lastname" class="block text-sm font-medium">Nachname</label>
            <input type="text" id="lastname" class="input input-bordered w-full" />
          </div>
          <div>
            <label for="birthyear" class="block text-sm font-medium">Geburtsjahr</label>
            <input type="number" id="birthyear" class="input input-bordered w-full" />
          </div>
          <button type="submit" class="btn btn-secondary w-full">Hinzufügen</button>
        </form>
        <div class="mt-8">
          <h2 class="text-xl font-bold mb-4">Aktionen</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
            <button id="sort-lastname" class="btn w-full">Sortieren nach Nachname</button>
            <button id="sort-age" class="btn w-full">Sortieren nach Alter</button>
            </div>
            <div class="space-y-2">
            <button id="delete-last" class="btn w-full">Letztes Element löschen</button>
            <button id="delete-all" class="btn w-full">Alles löschen</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table class="table w-full">
          <thead>
            <tr>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Geburtsjahr</th>
            </tr>
          </thead>
          <tbody id="person-list">
          </tbody>
        </table>
      </div>
    </div>
  </div>
`;

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'synthwave');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});

const form = document.getElementById('person-form');
const personList = document.getElementById('person-list');

let persons = [];
let editMode = false;
let editPersonId = null;

const displayPersons = () => {
  personList.innerHTML = '';
  persons.forEach((person) => {
    const age = new Date().getFullYear() - person.birthyear;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${person.firstname}</td>
      <td>${person.lastname}</td>
      <td>${age}</td>
      <td>
      <button class="btn btn-circle btn-sm edit-person" data-id="${person.id}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
      </button>
        <button class="btn btn-circle btn-sm delete-person" data-id="${person.id}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </td>
    `;
    personList.appendChild(newRow);
  });

  document.querySelectorAll('.edit-person').forEach(button => {
    button.addEventListener('click', () => {
      editMode = true;
      editPersonId = button.dataset.id;
      loadPerson(editPersonId);
    });
  });

  document.querySelectorAll('.delete-person').forEach(button => {
    button.addEventListener('click', () => deletePerson(button.dataset.id));
  });
}


const deletePerson = (id) => {
  persons = persons.filter(p => p.id != id);
  displayPersons();
};

const loadPerson = (id) => {
  const person = persons.find(p => p.id == id);
  if (person) {
    document.getElementById('firstname').value = person.firstname;
    document.getElementById('lastname').value = person.lastname;
    document.getElementById('birthyear').value = person.birthyear;
  }
};

const upsertPerson = (e) => {
  e.preventDefault();

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const birthyear = parseInt(document.getElementById('birthyear').value);

  if (editMode) {
    // Update person
    const person = persons.find(p => p.id == editPersonId);
    if (person) {
      person.firstname = firstname;
      person.lastname = lastname;
      person.birthyear = birthyear;
      editMode = false;
      editPersonId = null;
    }
  } else {
    const newPerson = {
      id: persons.length,
      firstname,
      lastname,
      birthyear: parseInt(birthyear),
    };
  
    persons.push(newPerson);
  }

  displayPersons();
  form.reset();
};

document.getElementById('sort-lastname').addEventListener('click', () => {
  persons.sort((a, b) => a.lastname.localeCompare(b.lastname));
  displayPersons();
});

document.getElementById('sort-age').addEventListener('click', () => {
  persons.sort((a, b) => a.birthyear - b.birthyear);
  displayPersons();
});

document.getElementById('delete-last').addEventListener('click', () => {
  persons.pop();
  displayPersons();
});

document.getElementById('delete-all').addEventListener('click', () => {
  persons = [];
  displayPersons();
});

form.addEventListener('submit', upsertPerson);
