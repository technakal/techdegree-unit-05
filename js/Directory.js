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
    if(employees.length) {
      return employees.map(employee => employee.renderEmployeeLimited()).join('');
    } 
    return `<h2>No employees have "<em>${document.querySelector('#search-input').value.toLowerCase()}</em>" in their name.</h2>`
  }
  
  /**
   * Searches for employees whose names match the searchTerm.
   * Returns the list of employees.
   * @param {string} searchTerm - The entered term to search on.
   */
  searchEmployees(searchTerm) {
    return this.employees.map(employee => {
      const match = employee.checkName(searchTerm);
      if(match) {
        return employee;
      }
    }).filter(employee => employee !== undefined);
  }
  
  /**
   * Returns the index of the current employee displayed in the modal.
   */
  determineDisplayedEmployee() {
    return Number(document.querySelector('.modal').id.split('-')[1]);
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
    const currentIndex = this.determineDisplayedEmployee();
    if(currentIndex !== this.employees.length - 1) {
      const nextEmployee = this.employees[currentIndex + 1];
      const nextHtml = nextEmployee.renderEmployeeFull();
      this.closeFullDetails();
      this.viewFullDetails(nextHtml);
    } else {
      const nextHtml = this.employees[0].renderEmployeeFull();
      this.closeFullDetails();
      this.viewFullDetails(nextHtml);
    }
  }
  
  /**
   * Loads the modal view of the previous employee in the directory sequence.
   * If currently viewing the first employee, loads the last employee in the directory.
   */
  viewPreviousEmployee() {
    const currentIndex = this.determineDisplayedEmployee();
    if(currentIndex !== 0) {
      const nextEmployee = this.employees[currentIndex - 1];
      const nextHtml = nextEmployee.renderEmployeeFull();
      this.closeFullDetails();
      this.viewFullDetails(nextHtml);
    } else {
      const nextHtml = this.employees[this.employees.length - 1].renderEmployeeFull();
      this.closeFullDetails();
      this.viewFullDetails(nextHtml);
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
