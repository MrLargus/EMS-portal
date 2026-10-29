document.addEventListener('DOMContentLoaded', () => {
  const ACCESS_CODES = { hrid: 'hrid2026', epd: 'epd2026' };
  const ACCESS_TARGETS = { hrid: 'https://mrlargus.github.io/EMS-HRID/', epd: 'https://mrlargus.github.io/EMS-EPD/' };
  const ACCESS_TITLES = { hrid: 'ОТДЕЛ ОБУЧЕНИЯ — HRID', epd: 'ОТДЕЛ ПСИХИАТРИИ — EPD' };

  const modal = document.getElementById('accessModal');
  const modalTitle = document.getElementById('accessTitle');
  const modalSubtitle = document.getElementById('accessSubtitle');
  const input = document.getElementById('accessInput');
  const errorEl = document.getElementById('accessError');
  const btnConfirm = document.getElementById('accessConfirm');
  const btnCancel = document.getElementById('accessCancel');

  if (!modal) return; 

  let currentDept = null;

  function openAccessModal(dept) {
    currentDept = dept;
    modalTitle.textContent = ACCESS_TITLES[dept] || 'ЗАПРОС ДОСТУПА';
    modalSubtitle.textContent = 'Введите код доступа для перехода в раздел.';
    input.value = '';
    errorEl.style.display = 'none';
    modal.style.display = 'flex';
    setTimeout(() => input.focus(), 50);
  }

  function closeAccessModal() {
    modal.style.display = 'none';
    currentDept = null;
    input.value = '';
    errorEl.style.display = 'none';
  }

  function tryAccess() {
    if (!currentDept) return;
    const expected = ACCESS_CODES[currentDept];
    const entered = input.value.trim();

    if (entered === expected) {
      errorEl.style.display = 'none';
      window.location.href = ACCESS_TARGETS[currentDept];
    } else {
      errorEl.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }

  document.querySelectorAll('[data-dept]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openAccessModal(card.dataset.dept);
    });
  });

  btnConfirm.addEventListener('click', tryAccess);
  btnCancel.addEventListener('click', closeAccessModal);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryAccess(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeAccessModal();
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAccessModal();
  });
});