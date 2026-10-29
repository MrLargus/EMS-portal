/* =========================================================
   ИНИЦИАЛИЗАЦИЯ ТЕМЫ (ВСТАВЛЯТЬ В <head> КАЖДОЙ СТРАНИЦЫ)
   ========================================================= */
(function () {
  const STORAGE_KEY = 'ems_theme';
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  // Если сохранённой темы нет — ВСЕГДА светлая
  const initial = saved || 'light';

  // 1. Сразу вешаем класс на <html>
  document.documentElement.classList.toggle('theme-dark', initial === 'dark');

  // 2. Когда <body> появится, вешаем класс и на него
  function applyToBody() {
    if (document.body) {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add('theme-' + initial);
    }
  }

  if (document.body) {
    applyToBody();
  } else {
    const observer = new MutationObserver((mutations, obs) => {
      if (document.body) {
        applyToBody();
        obs.disconnect();
      }
    });
    observer.observe(document.documentElement, { childList: true });
  }
})();