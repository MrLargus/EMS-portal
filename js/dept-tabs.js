function switchDeptTab(tabName) {
  const tabs = document.querySelectorAll('.doc-tab');
  const panes = document.querySelectorAll('.doc-pane');

  tabs.forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.doc-tab[data-tab="${tabName}"]`);
  if (activeTab) activeTab.classList.add('active');

  panes.forEach(p => p.style.display = 'none');
  const activePane = document.getElementById('pane-' + tabName);
  if (activePane) activePane.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  const activeTab = document.querySelector('.doc-tab.active');
  if (activeTab) {
    switchDeptTab(activeTab.dataset.tab);
  }
});