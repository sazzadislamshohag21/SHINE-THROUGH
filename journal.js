const topicGroup = document.querySelector('[data-journal-topics]');
const topicButtons = [...document.querySelectorAll('[data-topic]')];
const cards = [...document.querySelectorAll('[data-story-card]')];
const storyCount = document.querySelector('[data-story-count]');

function displayTopic(topic) {
  const selected = topicButtons.some(button => button.dataset.topic === topic) ? topic : 'all';
  let visibleCount = 0;
  cards.forEach(card => {
    card.hidden = selected !== 'all' && card.dataset.storyTopic !== selected;
    if (!card.hidden) visibleCount += 1;
  });
  topicButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === selected)));
  storyCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'story' : 'stories'} to explore`;
}

if (topicGroup) {
  topicGroup.hidden = false;
  displayTopic(new URL(window.location.href).searchParams.get('topic'));
  topicButtons.forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const url = new URL(window.location.href);
    const topic = button.dataset.topic;
    if (topic === 'all') url.searchParams.delete('topic');
    else url.searchParams.set('topic', topic);
    url.hash = 'stories';
    window.history.pushState(null, '', url);
    displayTopic(topic);
  }));
  window.addEventListener('popstate', () => displayTopic(new URL(window.location.href).searchParams.get('topic')));
}
