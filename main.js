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
  document.querySelector('#itemInput').classList.remove('hidden');
});

/* вариант с непустым списком */

let selectContainer = document.querySelector('.main-container');
let select = document.querySelector('.main-dropdown_button');
let options = document.querySelectorAll('.main-container .option');

select.onclick = () => {
  selectContainer.classList.toggle('active');
};

options.forEach((e) => {
  e.addEventListener('click', () => {
    selectContainer.classList.remove('active');
    options.forEach((e) => {
      e.classList.remove('selected');
    });
    e.classList.add('selected');
  });
});
