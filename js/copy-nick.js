document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');
  const copyElements = document.querySelectorAll('.copy-nick');
  if (!toast || copyElements.length === 0) return;

  copyElements.forEach(el => {
    el.addEventListener('click', async () => {
      const textToCopy = el.getAttribute('data-nick') || el.textContent.trim();
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('✅ Никнейм скопирован!');
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('✅ Никнейм скопирован!');
      }
    });
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }
});