const notificationList = document.querySelector('.notification');
const notificationBtn = document.querySelector('.header__icon-voicer');
const closeMenu = document.querySelector('.notification__close-btn');
const notificationItem = document.querySelector('.notification__card');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__top-action');

function showModal() {
  notificationList.style.display = 'none';
  modal.style.display = 'block';
}

notificationItem.addEventListener('click', showModal);

  function closeModal() {
    modal.style.display = 'none';
  }
  
close.addEventListener('click', closeModal);  

function show() {
  notificationList.style.display = 'block';
}

notificationBtn.addEventListener('click', show);

function hide() {
  notificationList.style.display = 'none';
}

closeMenu.addEventListener('click', hide);

// Tabs

const tabs = document.querySelectorAll('.tabs__toggle');
const contents = document.querySelectorAll('.tabs__content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    contents.forEach(content => {
      content.classList.remove('tabs__content--active');
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabs__toggle--active');
    })

    contents[index].classList.add('tabs__content--active');
    tabs[index].classList.add('tabs__toggle--active');
  })
})

// Show/hide Page2

const viewAllBtn = document.querySelector('.btn');
const tabsWindow = document.querySelector('.tabs');

function showPageWithTabs() {
  tabsWindow.style.display = 'block';
  notificationList.style.display = 'none';
}

viewAllBtn.addEventListener('click', showPageWithTabs);

window.addEventListener('click', function(e){
  if (!document.querySelector('.tabs__wrapper').contains(e.target) && e.target !== viewAllBtn){
    tabsWindow.style.display = 'none';
  } 
})