// Hash-based router. Populates #skill-nav and dispatches render() to the
// active skill whenever the hash changes or prices update.
export function initRouter(skills, getState) {
  const nav = document.getElementById('skill-nav');
  const app = document.getElementById('app');

  // Build nav links
  nav.innerHTML = skills
    .map(s => `<a href="#${s.id}">${s.icon} ${s.label}</a>`)
    .join('');

  function getActiveSkill() {
    const hash = location.hash.slice(1);
    return skills.find(s => s.id === hash) || skills[0];
  }

  function syncNav(skill) {
    nav.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${skill.id}`);
    });
  }

  function render(state) {
    const skill = getActiveSkill();
    syncNav(skill);
    skill.render(app, state);
  }

  window.addEventListener('hashchange', () => render(getState()));

  // Initial render (prices may not be loaded yet; skill handles empty state)
  render(getState());

  return { render };
}
