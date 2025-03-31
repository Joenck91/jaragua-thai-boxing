
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.accordion-carousel');
  const items = document.querySelectorAll('.accordion-carousel li');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  let currentIndex = 0;

  // Ativa o item atual
  function updateActiveItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  // Navegação
  function goToPrev() {
    let newIndex = (currentIndex - 1 + items.length) % items.length;
    updateActiveItem(newIndex);
    scrollToItem(newIndex);
  }

  function goToNext() {
    let newIndex = (currentIndex + 1) % items.length;
    updateActiveItem(newIndex);
    scrollToItem(newIndex);
  }

  function scrollToItem(index) {
    const item = items[index];
    carousel.scrollTo({
      left: item.offsetLeft - (carousel.offsetWidth - item.offsetWidth) / 2,
      behavior: 'smooth'
    });
  }

  // Event listeners
  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);

  // Clique nos itens
  items.forEach((item, index) => {
    item.addEventListener('click', function() {
      updateActiveItem(index);
      scrollToItem(index);
    });
  });

  // Toque para mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  carousel.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      goToNext(); // Swipe left
    } else if (touchEndX > touchStartX + 50) {
      goToPrev(); // Swipe right
    }
  }

  // Inicializa com o primeiro item ativo
  updateActiveItem(0);
});
