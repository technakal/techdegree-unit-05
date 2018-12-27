/****************************
APP SETUP
****************************/
const gallery = document.querySelector('#gallery');
const search = document.querySelector('.search-container');
search.innerHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
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
    const employeeHtml = directory.employees
      .map(employee => employee.renderEmployeeLimited())
      .join('');
    gallery.innerHTML = employeeHtml;
  })
  .catch(error => console.error(error));

/****************************
APP FUNCTIONS
****************************/

/**
 * Opens the modal for the selected employee.
 * @param {event} event - The user clicks on a card in the gallery.
 */
const handleCardClick = event => {
  if (event.target.id !== 'gallery') {
    console.log(event.target);
  }
};

/**
 * Performs the filtering search.
 * Clears the search field.
 * @param {event} event - The user submits the search form.
 */
const performSearch = event => {
  event.preventDefault();
  const searchField = document.querySelector('#search-input');
  if (searchField.value) {
    console.log(searchField.value);
    searchField.value = '';
    searchField.focus();
  }
};

/****************************
EVENT HANDLERS
****************************/
document.querySelector('form').addEventListener('submit', performSearch);
document.querySelector('#gallery').addEventListener('click', handleCardClick);
