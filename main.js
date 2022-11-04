'use strict';

let openContactModal = document.querySelector('#openContactModal');
let openGroupModal = document.querySelector('#openGroupModal');

let openGroupButton = document.getElementById('groupButton');
let closeGroupModal = document.getElementById('closeGroup');

let openContactButton = document.getElementById('contactButton');
let closeContactModal = document.getElementById('closeContact');

let openAddGroupButton = document.getElementById('addGroup');

let mainDropdownContainer = document.querySelector('.main-container');
let mainDropdownButton = document.querySelector('.main-dropdown_button');
let mainOptionsContainer = document.querySelector('.main-option-container');

let groupList = document.getElementById('groupList');

let groupInput = document.querySelector('#addGroupInput');
let dropdownGroup = document.getElementById('dropdownGroup');

let saveGroup = document.getElementById('saveGroup');
// unique id
// переписать на класс
let guidFactory = (function () {
  function getRandomString() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  function gen(t) {
    let result = '';
    for (let i = 0; i < t; ++i) result += getRandomString();
    return result;
  }

  return {
    create: function () {
      return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
    },
  };
})();

// создание массива групп, добавление в ЛС и извлечение
let groupsArray = [
  {
    id: guidFactory.create(1),
    groupName: 'friends',
  },
  {
    id: guidFactory.create(1),
    groupName: 'family',
  },
];
localStorage.setItem('groupsArray', JSON.stringify(groupsArray));

let groupsArrayFromLS = localStorage.getItem('groupsArray');
groupsArrayFromLS = JSON.parse(groupsArrayFromLS);

function realGroupsArray() {
  if (groupsArray.length > groupsArrayFromLS.length) {
    let newRequest = localStorage.getItem('groupsArray');
    newRequest = JSON.parse(newRequest);
    return newRequest;
  }
  return groupsArrayFromLS;
}

// открытие модалок контактов и групп
openGroupButton.addEventListener('click', () => {
  openGroupModal.classList.add('open');
});
openContactModal.addEventListener('click', (e) => {
  if (e.target === openContactModal || e.target === closeContactModal) {
    openContactModal.classList.remove('open');
  }
});

openGroupModal.addEventListener('click', (e) => {
  if (e.target === openGroupModal || e.target === closeGroupModal) {
    openGroupModal.classList.remove('open');
  }
});

openContactButton.addEventListener('click', () => {
  openContactModal.classList.add('open');
});

openAddGroupButton.addEventListener('click', () => {
  document.querySelector('#inputWrapper').classList.remove('hidden');
});

/* вариант с непустым списком */

mainDropdownButton.onclick = () => {
  mainDropdownContainer.classList.toggle('active');
  mainOptionsContainer.classList.toggle('hidden');
};

function renderGroupList() {
  return (groupList.innerHTML = groupsArray
    .map(
      (el) => `<li class="group-list--item">
  <div class="item-name"><span>${el.groupName}</span></div>
  <button type="button" class="item-icon" data-delete=true id='${el.id}'><svg width="38" height="38" viewBox="0 0 38 38" fill="none"
     xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="37" height="37" rx="5.5" />
      <g clip-path="url(#clip0_1894_238)">
        <path
         d="M12.6666 26.3889C12.6666 27.55 13.6166 28.5 14.7778 28.5H23.2222C24.3833 28.5 25.3333 27.55 25.3333 26.3889V13.7222H12.6666V26.3889ZM15.2633 18.8733L16.7516 17.385L19 19.6228L21.2378 17.385L22.7261 18.8733L20.4883 21.1111L22.7261 23.3489L21.2378 24.8372L19 22.5994L16.7622 24.8372L15.2739 23.3489L17.5116 21.1111L15.2633 18.8733ZM22.6944 10.5556L21.6389 9.5H16.3611L15.3055 10.5556H11.6111V12.6667H26.3889V10.5556H22.6944Z" />
       </g>
     <defs>
      <clipPath id="clip0_1894_238">
        <rect width="25.3333" height="25.3333" fill="white" transform="translate(6.33325 6.33331)" />
         </clipPath>
      </defs>
    </svg>
   </button>
   </li>`
    )
    .join(''));
}
renderGroupList();

// добавление группы в массив
groupInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13 && groupInput.value.length) {
    groupsArray.push({
      id: guidFactory.create(1),
      groupName: groupInput.value,
    });
    localStorage.setItem('groupsArray', JSON.stringify(groupsArray));

    renderGroupList();
    groupInput.value = '';
  }
});

// удаление группы
groupList.addEventListener('click', (e) => {
  if (e.target.dataset) {
    groupsArray.forEach(function (el, i) {
      if (el.id == e.target.id) groupsArray.splice(i, 1);
    });
  }
  renderGroupList();
});

// список опций на основе массива групп
function groupOtionsRendering() {
  for (let i = 0; i < realGroupsArray().length; i++) {
    let option = realGroupsArray()[i];
    let element = document.createElement('option');
    element.textContent = option.groupName;
    element.value = option.groupName;
    dropdownGroup.appendChild(element);
  }
}
groupOtionsRendering();

saveGroup.addEventListener('click', () => {
  realGroupsArray();
  groupOtionsRendering();
});
