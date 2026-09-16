const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
  mobileMenu.hidden = true;
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function bindTabs({ tabSelector, panelSelector, dataKey, panelId }) {
  const tabs = Array.from(document.querySelectorAll(tabSelector));
  const panels = Array.from(document.querySelectorAll(panelSelector));
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const value = tab.dataset[dataKey];

      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== panelId(value);
      });
    });
  });
}

bindTabs({
  tabSelector: '.format-tab',
  panelSelector: '.format-panel',
  dataKey: 'format',
  panelId: (value) => `panel-${value}`
});

bindTabs({
  tabSelector: '.how-tab',
  panelSelector: '.how-panel',
  dataKey: 'how',
  panelId: (value) => `how-${value}-panel`
});
