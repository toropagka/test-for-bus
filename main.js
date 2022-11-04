'use strict';

let openContactModal = document.querySelector('#openContactModal');
let openGroupModal = document.querySelector('#openGroupModal');

let openGroupButton = document.getElementById('groupButton');
let closeGroupModal = document.getElementById('closeGroup');

let openContactButton = document.getElementById('contactButton');
let closeContactModal = document.getElementById('closeContact');

let openAddGroupButton = document.getElementById('addGroup');

let groupList = document.getElementById('groupList');
let mainGroupList = document.getElementById('main');

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
  if (groupsArray.length !== groupsArrayFromLS.length) {
    let newRequest = localStorage.getItem('groupsArray');
    newRequest = JSON.parse(newRequest);
    return newRequest;
  }
  return groupsArrayFromLS;
}

// открытие и закрытие модалок контактов и групп
openGroupButton.addEventListener('click', () => {
  openGroupModal.classList.add('open');
});

openGroupModal.addEventListener('click', (e) => {
  if (e.target === openGroupModal || e.target === closeGroupModal) {
    openGroupModal.classList.remove('open');
  }
});
openContactModal.addEventListener('click', (e) => {
  if (e.target === openContactModal || e.target === closeContactModal) {
    openContactModal.classList.remove('open');
  }
});

openContactButton.addEventListener('click', () => {
  openContactModal.classList.add('open');
});

// показ инпута для добавления группы
openAddGroupButton.addEventListener('click', () => {
  document.querySelector('#inputWrapper').classList.remove('hidden');
});

/* вариант с непустым списком */

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

function renderMainGroupList() {
  realGroupsArray();
  if (realGroupsArray().length > 0) {
    return (mainGroupList.innerHTML = realGroupsArray()
      .map(
        (el) => `<div class="main-container">
      <!-- <span class="main-text"> Cписок контактов пуст</span> -->
      <!-- вариант с непустым списком -->
      <button class="main-dropdown_button">
      ${el.groupName}
        <svg class="chevron-icon" width="13" height="8" viewBox="0 0 13 8" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a1"
            d="M10.885 7.70502L6.29498 3.12502L1.70498 7.70502L0.294983 6.29502L6.29498 0.295017L12.295 6.29502L10.885 7.70502Z" />
        </svg>

      </button>
      <ul class="main-option-container">
        <li class="option">
          <span class="main-container--name">Фамилия Имя Отчество</span>
          <div class="main-container--buttons">
            <span class="main-container--number">+7 (ХХХ) ХХХ - ХХ - ХХ</span>
            <button type="button" class="item-icon item-icon--blue">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.1" x="0.5" y="0.5" width="37" height="37" rx="5.5" stroke="black" />
                <g clip-path="url(#clip0_1894_95)">
                  <path
                    d="M10 24.2501V28.0001H13.75L24.81 16.9401L21.06 13.1901L10 24.2501ZM27.71 14.0401C28.1 13.6501 28.1 13.0201 27.71 12.6301L25.37 10.2901C24.98 9.90006 24.35 9.90006 23.96 10.2901L22.13 12.1201L25.88 15.8701L27.71 14.0401Z"
                    fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_1894_95">
                    <rect width="24" height="24" fill="white" transform="translate(7 7)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button type="button" class="item-icon"><svg width="38" height="38" viewBox="0 0 38 38" fill="none"
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
          </div>
        </li>
      </ul>
    </div>`
      )
      .join(''));
  } else {
    return (mainGroupList.innerHTML = `<span class="main-text"> Cписок контактов пуст</span>`);
  }
}

renderMainGroupList();

function addDropdown() {
  let mainDropdownContainers = document.querySelectorAll('.main-container');

  for (let item of mainDropdownContainers) {
    console.log(item);
    item.firstElementChild.onclick = () => {
      item.firstElementChild.classList.toggle('active');
      item.lastElementChild.classList.toggle('hidden');
    };
  }
}
addDropdown();
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
  localStorage.setItem('groupsArray', JSON.stringify(groupsArray));
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
  dropdownGroup.innerHTML = `<option disabled selected>Выберите группу</option>
  `;
  realGroupsArray();
  groupOtionsRendering();
  openGroupModal.classList.remove('open');
  renderMainGroupList();
  addDropdown();
});
