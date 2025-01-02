document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const cartLink = document.querySelector('.cart-link');
    const addButtons = document.querySelectorAll('.btn-add');
  
    let cartCount = 0;
  
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('active');
    });
  
    addButtons.forEach(button => {
      button.addEventListener('click', () => {
        cartCount++;
        cartLink.textContent = `Carrito (${cartCount})`;
      });
    });
  });
  