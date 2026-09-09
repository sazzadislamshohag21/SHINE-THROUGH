const articles = [...document.querySelectorAll('[data-journal-article]')];
const missingStory = document.querySelector('[data-story-missing]');

function showArticle({ focus = false } = {}) {
  let slug;
  try {
    slug = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    slug = null;
  }
  const selected = slug === '' ? articles[0] : articles.find(article => article.id === slug);
  articles.forEach(article => { article.hidden = article !== selected; });
  missingStory.hidden = Boolean(selected);
  document.title = selected ? `${selected.dataset.articleTitle} — SHINE THROUGH Journal` : 'Story not found — SHINE THROUGH Journal';
  const heading = (selected || missingStory).querySelector('h1');
  if (selected) selected.querySelector('.article-photo img').loading = 'eager';
  if (focus) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

if (articles.length && missingStory) {
  showArticle();
  window.addEventListener('hashchange', () => showArticle({ focus: true }));
  // Keep the active story's URL when the accessibility shortcut moves focus.
  document.querySelector('.skip-link')?.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#main').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}
