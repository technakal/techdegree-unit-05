class Directory {
  constructor(employees) {
    this.employees = employees;
  }

  /**
   * Caches all "medium" employee images in the user's browser so that the modal doesn't bounce when the employee details are displayed the first time.
   */
  cacheEmployeeImages() {
    this.employees.forEach(employee => {
      const img = document.createElement('img');
      img.src = employee.picture.medium;
      img.style.display = 'none';
      document.querySelector('body').appendChild(img);
      document.querySelector('body').removeChild(img);
    });
  }

  /**
   * Renders the remaining employees after the searchEmployees function to the DOM.
   * @param {array} employees - The list of employees to be rendered.
   */
  filterDirectoryBySearch(employees) {
    if (employees.length) {
      return employees
        .map(employee => employee.renderEmployeeLimited())
        .join('');
    }
    return `<h2>No employees have "<em>${document
      .querySelector('#search-input')
      .value.toLowerCase()}</em>" in their name.</h2>`;
  }

  /**
   * Searches for employees whose names match the searchTerm.
   * Returns the list of employees.
   * @param {string} searchTerm - The entered term to search on.
   */
  searchEmployees(searchTerm) {
    return this.employees
      .map(employee => {
        const match = employee.checkName(searchTerm.toLowerCase());
        if (match) {
          return employee;
        }
      })
      .filter(employee => employee !== undefined);
  }

  /**
   * Returns the index of the current employee displayed in the modal.
   */
  determineDisplayedEmployee() {
    return document.querySelector('.modal').id;
  }

  /**
   * Appends the modal to the DOM.
   * Sets up event listeners on the modal.
   * @param {object} employeeHtml - The employee data html to add to the modal.
   */
  viewFullDetails(employeeHtml) {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    body.appendChild(modalContainer);
    modalContainer.innerHTML = employeeHtml;
  }

  /**
   * Loads the modal view of the next employee in the directory sequence.
   * If currently viewing the last employee, loads the first employee in the directory.
   */
  viewNextEmployee() {
    const allAppendedEmployees = document.querySelectorAll('.card');
    const currentEmployeeId = this.determineDisplayedEmployee();

    if (
      currentEmployeeId !==
      allAppendedEmployees[allAppendedEmployees.length - 1].id
    ) {
      const nextEmployeeId = document.querySelector(`#${currentEmployeeId}`)
        .nextElementSibling.id;
      const nextEmployee = this.employees[nextEmployeeId.split('-')[1]];
      this.closeFullDetails();
      this.viewFullDetails(nextEmployee.renderEmployeeFull());
    } else {
      const firstEmployeeId = allAppendedEmployees[0].id;
      const firstEmployee = this.employees[firstEmployeeId.split('-')[1]];
      this.closeFullDetails();
      this.viewFullDetails(firstEmployee.renderEmployeeFull());
    }
  }

  /**
   * Loads the modal view of the previous employee in the directory sequence.
   * If currently viewing the first employee, loads the last employee in the directory.
   */
  viewPreviousEmployee() {
    const allAppendedEmployees = document.querySelectorAll('.card');
    const currentEmployeeId = this.determineDisplayedEmployee();
    if (currentEmployeeId !== allAppendedEmployees[0].id) {
      const prevEmployeeId = document.querySelector(`#${currentEmployeeId}`)
        .previousElementSibling.id;
      const prevEmployee = this.employees[prevEmployeeId.split('-')[1]];
      this.closeFullDetails();
      this.viewFullDetails(prevEmployee.renderEmployeeFull());
    } else {
      const lastEmployeeId =
        allAppendedEmployees[allAppendedEmployees.length - 1].id;
      const lastEmployee = this.employees[lastEmployeeId.split('-')[1]];
      this.closeFullDetails();
      this.viewFullDetails(lastEmployee.renderEmployeeFull());
    }
  }

  /**
   * Removes the modal from the DOM.
   * @param {event} event - The user clicks the close button, or anywhere outside the modal.
   */
  closeFullDetails(event) {
    document.querySelector('.modal-container').remove();
  }
}
