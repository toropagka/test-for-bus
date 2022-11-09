'use strict';

let openGroupModal = document.querySelector('#openGroupModal');
let closeGroupModal = document.getElementById('closeGroup');

let contactButton = document.getElementById('contactButton');
let closeContactModal = document.getElementById('closeContact');

let openAddGroupButton = document.getElementById('addGroup');
let deleteGroupInput = document.getElementById('deleteGroupInput');

let groupList = document.getElementById('groupList');
let mainGroupList = document.getElementById('main');

let groupInput = document.querySelector('#addGroupInput');
let dropdownGroup = document.getElementById('dropdownGroup');

let saveGroup = document.getElementById('saveGroup');
let saveContact = document.getElementById('saveContact');
let targetId;

const contactPhone = document.querySelector('#contactPhone');

// unique id
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
    groupContacts: [
      {
        id: guidFactory.create(2),
        contactName: 'fsf hgjh jhj',
        contactPhone: '+7 (777) 777-77-77',
      },
      {
        id: guidFactory.create(2),
        contactName: 'Test2 Test2 Test2',
        contactPhone: '+7 (777) 777-77-77',
      },
    ],
  },
  {
    id: guidFactory.create(1),
    groupName: 'family',
    groupContacts: [
      {
        id: guidFactory.create(2),
        contactName: 'sfdsf Test Test',
        contactPhone: '+7 (777) 777-77-77',
      },
    ],
  },
];

localStorage.setItem('groupsArray', JSON.stringify(groupsArray));
// получаем актуальный массив из ЛС
function realGroupsArray() {
  let newRequest = localStorage.getItem('groupsArray');
  newRequest = JSON.parse(newRequest);
  return newRequest;
}

// показ инпута для добавления группы
openAddGroupButton.addEventListener('click', () => {
  document.querySelector('#inputWrapper').classList.remove('hidden');
});

// удаление инпута
deleteGroupInput.addEventListener('click', function () {
  document.querySelector('#inputWrapper').classList.add('hidden');
  groupInput.value = '';
});

// отрисовка списка групп в модалке
function renderGroupList() {
  return (groupList.innerHTML = groupsArray
    .map(
      (el) => `<li class="group-list--item">
  <div class="item-name"><span>${el.groupName}</span></div>
  <button type="button" class="item-icon" data-delete=true id='${el.id}'><svg width="38" height="38" viewBox="0 0 38 38" fill="none"
     xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="37" height="37" rx="5.5" />
        <path
         d="M12.6666 26.3889C12.6666 27.55 13.6166 28.5 14.7778 28.5H23.2222C24.3833 28.5 25.3333 27.55 25.3333 26.3889V13.7222H12.6666V26.3889ZM15.2633 18.8733L16.7516 17.385L19 19.6228L21.2378 17.385L22.7261 18.8733L20.4883 21.1111L22.7261 23.3489L21.2378 24.8372L19 22.5994L16.7622 24.8372L15.2739 23.3489L17.5116 21.1111L15.2633 18.8733ZM22.6944 10.5556L21.6389 9.5H16.3611L15.3055 10.5556H11.6111V12.6667H26.3889V10.5556H22.6944Z" />
    </svg>
   </button>
   </li>`
    )
    .join(''));
}
renderGroupList();

// отрисовка групп на главном экране
function renderMainGroupList() {
  realGroupsArray();
  if (realGroupsArray().length > 0) {
    return (mainGroupList.innerHTML = realGroupsArray()
      .map(
        (el) => `<div class="main-container active">
      <button class="main-dropdown_button">
      ${el.groupName}
        <svg class="chevron-icon" width="13" height="8" viewBox="0 0 13 8" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a1"
            d="M10.885 7.70502L6.29498 3.12502L1.70498 7.70502L0.294983 6.29502L6.29498 0.295017L12.295 6.29502L10.885 7.70502Z" />
        </svg>
      </button>
      <ul class="main-option-container">
      ${el.groupContacts
        ?.map(
          (el) => `<li class="option">
      <span class="main-container--name">${el.contactName}</span>
      <span class="main-container--number">${el.contactPhone}</span>
      <div class="main-container--buttons">
        
        <button type="button" id="${el.id}" data-edit="true" class="item-icon item-icon--blue">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.1" x="0.5" y="0.5" width="37" height="37" rx="5.5" stroke="black" />
              <path
                d="M10 24.2501V28.0001H13.75L24.81 16.9401L21.06 13.1901L10 24.2501ZM27.71 14.0401C28.1 13.6501 28.1 13.0201 27.71 12.6301L25.37 10.2901C24.98 9.90006 24.35 9.90006 23.96 10.2901L22.13 12.1201L25.88 15.8701L27.71 14.0401Z"
                fill="black" />
          </svg>
        </button>
        <button type="button" id="${el.id}" data-delete="true" class="item-icon"><svg width="38" height="38" viewBox="0 0 38 38" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="37" height="37" rx="5.5" />
              <path
                d="M12.6666 26.3889C12.6666 27.55 13.6166 28.5 14.7778 28.5H23.2222C24.3833 28.5 25.3333 27.55 25.3333 26.3889V13.7222H12.6666V26.3889ZM15.2633 18.8733L16.7516 17.385L19 19.6228L21.2378 17.385L22.7261 18.8733L20.4883 21.1111L22.7261 23.3489L21.2378 24.8372L19 22.5994L16.7622 24.8372L15.2739 23.3489L17.5116 21.1111L15.2633 18.8733ZM22.6944 10.5556L21.6389 9.5H16.3611L15.3055 10.5556H11.6111V12.6667H26.3889V10.5556H22.6944Z" />
          </svg>
        </button>
      </div>
    </li>`
        )
        .join('')}
        
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
    let isOpen = true;
    let itemHeight = item.lastElementChild.clientHeight;
    item.lastElementChild.style.height = itemHeight + 'px';
    item.firstElementChild.onclick = () => {
      item.classList.toggle('active');
      isOpen = !isOpen;
      isOpen
        ? (item.lastElementChild.style.height = itemHeight + 'px')
        : (item.lastElementChild.style.height = '0px');
    };
  }
}
addDropdown();
// добавление группы в массив
groupInput.addEventListener('change', () => {
  if (groupInput.value.length) {
    groupsArray.push({
      id: guidFactory.create(1),
      groupName: groupInput.value,
      groupContacts: [],
    });
    renderGroupList();
    groupInput.value = '';
  }
});
// сохранение группы
saveGroup.addEventListener('click', () => {
  closeGroupModal.click();
  dropdownGroup.innerHTML = `<option disabled selected>Выберите группу</option>
  `;
  localStorage.setItem('groupsArray', JSON.stringify(groupsArray));
  realGroupsArray();
  groupOtionsRendering();
  renderMainGroupList();
  editContact();
  addDropdown();
  deleteGroupInput.click();
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

// сохранение контакта
saveContact.addEventListener('click', () => {
  if (targetId) {
    groupsArray.forEach((item) =>
      item.groupContacts.forEach((el, index) => {
        el.id === targetId ? item.groupContacts.splice(index, 1) : null;
      })
    );
  }
  let contactInfo = {};
  contactInfo.id = guidFactory.create(2);
  contactInfo.contactName = document.getElementById('contactName').value;
  contactInfo.contactPhone = document.getElementById('contactPhone').value;
  let selectedGroup = dropdownGroup.value;
  for (let el of groupsArray) {
    el.groupName === selectedGroup ? el.groupContacts.push(contactInfo) : null;
  }
  localStorage.setItem('groupsArray', JSON.stringify(groupsArray));
  renderMainGroupList();
  editContact();
  closeContactModal.click();
  addDropdown();
});
// очистка формы
closeContactModal.addEventListener('click', () => {
  document.form.reset();
});
contactButton.addEventListener('click', () => {
  let gray = document.querySelector('.offcanvas-backdrop');
  gray.addEventListener('click', () => {
    document.form.reset();
  });
});

// редактирование и удаление контакта с главной страницы
function editContact() {
  let mainOptionContainer = document.querySelectorAll('.main-option-container');
  groupsArray.forEach(function (item, index) {
    mainOptionContainer[index].addEventListener('click', (e) => {
      if (e.target.dataset.delete) {
        item.groupContacts.forEach(function (el, i) {
          if (el.id == e.target.id) {
            item.groupContacts.splice(i, 1);
          }
        });
        localStorage.setItem('groupsArray', JSON.stringify(groupsArray));
        renderMainGroupList();
        addDropdown();
        editContact();
      }

      if (e.target.dataset.edit) {
        item.groupContacts.forEach(function (el, i) {
          targetId = el.id;
          if (el.id == e.target.id) {
            document.getElementById('contactName').value = el.contactName;
            document.getElementById('contactPhone').value = el.contactPhone;
            dropdownGroup.value = item.groupName;
            contactButton.click();
          }
        });
      }
    });
  });
}
editContact();
// маска телефона
const prefixNumber = (str) => {
  if (str === '7') {
    return '7 (';
  }
  if (str === '8') {
    return '8 (';
  }
  if (str === '9') {
    return '7 (9';
  }
  return '7 (';
};

// ======================================
contactPhone.addEventListener('input', () => {
  const value = contactPhone.value.replace(/\D+/g, '');
  const numberLength = 11;

  let result;
  if (contactPhone.value.includes('+8') || contactPhone.value[0] === '8') {
    result = '';
  } else {
    result = '+';
  }

  //
  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ') ';
        break;
      case 7:
        result += '-';
        break;
      case 9:
        result += '-';
        break;
      default:
        break;
    }
    result += value[i];
  }
  //
  contactPhone.value = result;
});

// маска на ввод ФИО
document.getElementById('contactName').addEventListener('input', function () {
  this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
});
