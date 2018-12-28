/****************************
APP SETUP
****************************/
const body = document.querySelector('body');
const gallery = document.querySelector('#gallery');
const search = document.querySelector('.search-container');
search.innerHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
  </form>
`;

let directory;

/****************************
API CALLS
****************************/
const url =
  'https://randomuser.me/api/?results=12&nat=us,dk,fr,gb&exc=login,registered,id';

/**
 * Fetches twelve random users from the Random User Generator API.
 * Creates the directory class based on the users returned.
 */
fetch(url)
  .then(response => response.json())
  .then(data => {
    directory = new Directory(
      data.results.map((data, index) => new Employee(data, index))
    );
    directory.cacheEmployeeImages();
    const employeeHtml = directory.employees
      .map(employee => employee.renderEmployeeLimited())
      .join('');
    gallery.innerHTML = employeeHtml;
    const cards = document.querySelectorAll('.card')
    const ids = [];
    cards.forEach(card => {
      ids.push(card.id.split('-')[1]);
    });
    const employees = ids.map(id => directory.employees[id]);
    directory.currentEmployeeList = employees;
  })
  .catch(error => console.error(error));

/****************************
APP FUNCTIONS
****************************/

/**
 * Determines the employee clicked.
 * Creates the employee html for the modal.
 * Calls the append modal function.
 * @param {event} event - The user clicks on a card in the gallery.
 */
const handleCardClick = event => {
  if (event.target.id !== 'gallery') {
    const employeeIndex = event.target.closest('.card').id.split('-')[1];
    const employee = directory.employees[employeeIndex];
    directory.viewFullDetails(employee.renderEmployeeFull());
  }
};

/**
 * Handles user interaction with the modal.
 * If the user clicks the close button, or clicks outside of the modal container, the modal closes.
 * If the user clicks the next or prev buttons, direct to the corresponding employee.
 * @param {event} event - The triggering event. The user clicks anywhere once the modal is open.
 */
const handleModalClick = event => {
  const target = event.target;
  if(target.className === 'modal-container' || target.id === 'modal-close-btn') {
    directory.closeFullDetails();
  }
  
  if(target.id === 'modal-prev') {
    directory.viewPreviousEmployee();
  }

  if(target.id === 'modal-next') {
    directory.viewNextEmployee();
  }
}

/**
 * Performs the filtering search.
 * Clears the search field.
 * @param {event} event - The user submits the search form.
 */
const performSearch = event => {
  event.preventDefault();
  const searchField = document.querySelector('#search-input');
  const employees = directory.searchEmployees(searchField.value.toLowerCase());
  const employeeHtml = directory.filterDirectoryBySearch(employees);
  gallery.innerHTML = employeeHtml;
};

/****************************
EVENT HANDLERS
****************************/
document.querySelector('form').addEventListener('keyup', performSearch);
document.querySelector('#gallery').addEventListener('click', handleCardClick);
body.addEventListener('click', handleModalClick);
