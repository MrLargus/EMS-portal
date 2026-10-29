document.addEventListener('DOMContentLoaded', () => {
  const ticker = document.getElementById('newsTicker');
  if (!ticker || typeof NEWS_DATA === 'undefined') return;
  ticker.innerHTML = '';
  if (NEWS_DATA.length === 0) {
    ticker.innerHTML = '<span class="ticker-title" style="padding: 0 20px;">Пока нет новостей</span>';
    return;
  }
  const createTickerSet = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'ticker-set';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    NEWS_DATA.forEach(news => {
      const a = document.createElement('a');
      a.href = `pages/general-info.html#${news.id}`;
      a.className = 'ticker-item';
      a.innerHTML = `
        <span class="ticker-date">${news.date}</span>
        <span class="ticker-title">${news.tickerTitle}</span>
        <span class="ticker-separator">•</span>
      `;
      wrapper.appendChild(a);
    });
    return wrapper;
  };
  const firstSet = createTickerSet();
  ticker.appendChild(firstSet);
  requestAnimationFrame(() => {
    const setWidth = firstSet.offsetWidth;
    const screenWidth = window.innerWidth;
    const copiesNeeded = Math.max(2, Math.ceil(screenWidth / setWidth) + 1);
    for (let i = 1; i < copiesNeeded; i++) {
      ticker.appendChild(createTickerSet());
    }
    const speed = 50;
    const totalWidth = setWidth * copiesNeeded;
    const duration = totalWidth / speed;
    ticker.style.animation = `marquee ${duration}s linear infinite`;
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${setWidth}px); }
      }
    `;
    document.head.appendChild(style);
  });
});