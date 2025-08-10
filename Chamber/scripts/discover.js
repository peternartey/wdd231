// discover.js - JavaScript module to add simple dynamic styling and interaction

// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // 1. Add a hover effect on business cards that changes background color
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.backgroundColor = '#f0f8ff';  // Light blue highlight on hover
      card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      card.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.backgroundColor = '';
      card.style.boxShadow = '';
    });
  });

  // 2. Style "Join the Chamber" button on hero to have a subtle pulse animation
  const joinBtn = document.querySelector('.hero .btn');
  if (joinBtn) {
    joinBtn.style.transition = 'transform 0.3s ease';
    let growing = false;

    setInterval(() => {
      if (growing) {
        joinBtn.style.transform = 'scale(1)';
      } else {
        joinBtn.style.transform = 'scale(1.05)';
      }
      growing = !growing;
    }, 2000);
  }

  // 3. Show last updated date in footer
  const lastUpdatedElem = document.getElementById('last-updated');
  if (lastUpdatedElem) {
    const today = new Date();
    lastUpdatedElem.textContent = today.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // 4. Add smooth scrolling to anchor links (e.g., the join button)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetID = link.getAttribute('href').slice(1);
      const targetElem = document.getElementById(targetID);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
