'use strict';
let openGroupButton = document.getElementById('groupButton');
openGroupButton.addEventListener('click', () => {
  document.querySelector('#openGroupModal').classList.add('open');
});

let closeGroupModal = document.getElementById('closeGroup');
closeGroupModal.addEventListener('click', () => {
  document.querySelector('#openGroupModal').classList.remove('open');
});

let openContactButton = document.getElementById('contactButton');
openContactButton.addEventListener('click', () => {
  document.querySelector('#openContactModal').classList.add('open');
});

let closeContactModal = document.getElementById('closeContact');
closeContactModal.addEventListener('click', () => {
  document.querySelector('#openContactModal').classList.remove('open');
});

let openAddGroupButton = document.getElementById('addGroup');
openAddGroupButton.addEventListener('click', () => {
  document.querySelector('#inputWrapper').classList.remove('hidden');
});

/* вариант с непустым списком */

let selectContainer = document.querySelector('.main-container');
let select = document.querySelector('.main-dropdown_button');
let optionsContainer = document.querySelector('.main-option-container');

select.onclick = () => {
  selectContainer.classList.toggle('active');
  optionsContainer.classList.toggle('hidden');
};

let groupList = document.querySelector('.group-list');
let groupsArray = ['friends', 'family', 'sgfsgdsdfg', 'gdgdg'];
function renderGroupList() {
  return (groupList.innerHTML = groupsArray
    .map(
      (el) => `  <li class="group-list--item">
  <div class="item-name"><span>${el}</span></div>
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
   </li>`
    )
    .join(''));
}
renderGroupList();
// unique id
// переписать на класс
let guidFactory = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  function gen(t) {
    let result = '';
    for (let i = 0; i < t; ++i) result += s4();
    return result;
  }

  return {
    create: function () {
      return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
    },
  };
})();
console.log(guidFactory.create());

// добавление группы в массив
let groupInput = document.querySelector('#addGroupInput');
groupInput.addEventListener('keydown', (e) => {
  e.keyCode === 13 ? groupsArray.push(groupInput.value) : undefined;
  renderGroupList();
});
