/* =========================================================
   ПЕРЕКЛЮЧАТЕЛЬ ТЕМ (день / ночь) — ОБРАБОТЧИК КЛИКА
   ========================================================= */
(function () {
  'use strict';

  const STORAGE_KEY = 'ems_theme';
  const body = document.body;
  const toggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add('theme-' + theme);
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = body.classList.contains('theme-dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  // Следим за системной темой (если пользователь не выбирал вручную)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let manual = null;
      try { manual = localStorage.getItem(STORAGE_KEY); } catch (err) {}
      if (!manual) applyTheme(e.matches ? 'dark' : 'light');
    });
  }
})();