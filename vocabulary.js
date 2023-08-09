let vocabularyList = [];
/** @ts-expect-error @type HTMLInputElement */
const nameInput = document.querySelector('.nameInput');
/** @ts-expect-error @type HTMLInputElement */
const definitionInput = document.querySelector('.definitionInput');
const ul = document.querySelector('ul');

const data = localStorage.getItem('list');
if (data !== null) {
  vocabularyList = JSON.parse(data);
  console.log(vocabularyList);
  reRender(vocabularyList);
}
function reRender(list, indexToEdit) {
  if (ul !== null) {
    ul.innerHTML = '';
  }
  for (let i = 0; i < list.length; i++) {
    const li = document.createElement('li');
    if (indexToEdit === i) {
      const saveButton = document.createElement('button');
      saveButton.className = 'saveButton';
      saveButton.innerText = 'save';
      saveButton.onclick = () => saveItem(i);
      li.innerHTML = `<input class="nameEditInput" value="${list[i].name}"> <input class="definitionEditInput" value="${list[i].definition}">`;
      li.appendChild(saveButton);
      console.log({ li, saveButton });
    } else {
      const editButton = document.createElement('button');
      editButton.className = 'editButton';
      editButton.onclick = () => reRender(list, i);
      editButton.type = 'button';
      const deleteButton = document.createElement('button');
      deleteButton.className = 'deleteButton';
      deleteButton.onclick = () => deleteItem(i);

      li.innerHTML = `<span>${list[i].name}: ${list[i].definition}</span>`;
      deleteButton.innerText = '🗙';
      editButton.innerText = '✎';

      li.appendChild(deleteButton);
      li.appendChild(editButton);
    }
    if (ul !== null) {
      ul.appendChild(li);
    }
  }
}

function addButton() {
  if (nameInput.value === '' && definitionInput.value === '') return;

  const vocabulary = {
    name: '',
    definition: '',
  };
  vocabulary.name = nameInput.value;
  vocabulary.definition = definitionInput.value;
  nameInput.value = '';
  definitionInput.value = '';
  vocabularyList.push(vocabulary);
  localStorage.setItem('list', JSON.stringify(vocabularyList));
  reRender(vocabularyList);
}

function deleteItem(index) {
  vocabularyList.splice(index, 1);
  localStorage.setItem('list', JSON.stringify(vocabularyList));
  reRender(vocabularyList);
}

function saveItem(index) {
  /** @ts-expect-error @type HTMLInputElement */
  const nameEditInput = document.querySelector('.nameEditInput');
  /** @ts-expect-error @type HTMLInputElement */
  const definitionEditInput = document.querySelector('.definitionEditInput');
  if (nameEditInput.value === '' && definitionEditInput.value === '') return;
  vocabularyList[index].name = nameEditInput.value;
  vocabularyList[index].definition = definitionEditInput.value;
  localStorage.setItem('list', JSON.stringify(vocabularyList));
  reRender(vocabularyList);
}

function search() {
  /** @ts-expect-error @type HTMLInputElement */
  const searchQuery = document.querySelector('.search').value;
  reRender(vocabularyList.filter(a => a.name.includes(searchQuery) || a.definition.includes(searchQuery)));
}
