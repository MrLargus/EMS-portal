/* =========================================================
   ИНИЦИАЛИЗАЦИЯ ТЕМЫ (ВСТАВЛЯТЬ В <head> КАЖДОЙ СТРАНИЦЫ)
   ========================================================= */
(function () {
  const STORAGE_KEY = 'ems_theme';
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  const prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initial = saved || (prefersDark ? 'dark' : 'light');

  // 1. Сразу вешаем класс на <html>, чтобы фон за пределами сайта был нужного цвета
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
    // Если body ещё нет, ждём его появления через MutationObserver (срабатывает мгновенно)
    const observer = new MutationObserver((mutations, obs) => {
      if (document.body) {
        applyToBody();
        obs.disconnect();
      }
    });
    observer.observe(document.documentElement, { childList: true });
  }
})();