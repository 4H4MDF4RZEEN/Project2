(function () {
  const toggle = document.getElementById('theme-toggle');
  const themeKey = 'preferred-theme';

  function getSystemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  let saved = null;
  try { saved = localStorage.getItem(themeKey); } catch (e) { /* ignore */ }

  const initial = saved || getSystemPref();
  document.documentElement.setAttribute('data-theme', initial);
  if (toggle) toggle.textContent = initial === 'dark' ? '☀️' : '🌙';

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(themeKey, next); } catch (e) {}
      toggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  if (!saved && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', e => {
        const newPref = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newPref);
        if (toggle) toggle.textContent = newPref === 'dark' ? '☀️' : '🌙';
      });
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(e => {
        const newPref = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newPref);
        if (toggle) toggle.textContent = newPref === 'dark' ? '☀️' : '🌙';
      });
    }
  }
})();
