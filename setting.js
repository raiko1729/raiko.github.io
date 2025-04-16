const settingsIcon = document.getElementById('settings-icon');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const modalContent = document.querySelector('.modal-content');


settingsIcon.addEventListener('click', () => {
  settingsModal.classList.remove('hidden');
});

closeSettings.addEventListener('click', () => {
  settingsModal.classList.add('hidden');
});

// モーダルの外（背景）をクリックしたら閉じる
settingsModal.addEventListener('click', () => {
  settingsModal.classList.add('hidden');
});

// モーダルの中身をクリックしても閉じないようにする
modalContent.addEventListener('click', (e) => {
  e.stopPropagation();
});
