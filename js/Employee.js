class Employee {
  constructor(
    { gender, name, location, email, dob, phone, cell, picture },
    id
  ) {
    this.id = id;
    this.gender = gender;
    this.name = name;
    this.location = location;
    this.email = email;
    this.dateOfBirth = dob;
    this.phone = phone;
    this.cell = cell;
    this.picture = picture;
  }

  /**
   * Formats the birthday into a normal human-readable string.
   * @returns Birthday as a string in the format MM/DD/YYYY
   * @readonly
   * @memberof Employee
   */
  get birthday() {
    const birthday = this.dateOfBirth.date.split('T')[0].split('-');
    return `${birthday[1]}-${birthday[2]}-${birthday[0]}`;
    // 1966-01-09T02:28:51Z
  }

  /**
   * @returns First name and last name.
   * @readonly
   * @memberof Employee
   */
  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }

  /**
   * Returns the full address of the employee.
   * Street, city, state, and postal code.
   */
  get address() {
    return `${this.location.street} ${this.location.city}, ${this.location.state}  ${this.location.postcode}`;
  }

  /**
   * Checks whether the user's full name contains the searchTerm.
   * Returns a boolean.
   * @param {string} searchTerm - The search term entered by the user.
   */
  checkName(searchTerm) {
    if (this.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  }

  /**
   * Returns the template literal html needed to render the employee card in the main directory view.
   */
  renderEmployeeLimited() {
    return `
      <div class="card" id="employee-${this.id}">
        <div class="card-img-container">
          <img class="card-img" src="${this.picture.thumbnail}" alt="${this.fullName} picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${this.fullName}</h3>
          <p class="card-text">${this.email}</p>
          <p class="card-text cap">${this.location.city}, ${this.location.state}</p>
        </div>
      </div>
    `;
  }

  /**
   * Returns the template literal html needed to render the employee in the modal window.
   */
  renderEmployeeFull() {
    return `
      <div class="modal" id="employee-${this.id}">
        <button type="button" id="modal-close-btn" class="modal-close-btn">×</button>
        <div class="modal-info-container">
          <img class="modal-img" src="${this.picture.medium}" alt="${this.fullName} picture">
          <h3 id="name" class="modal-name cap">${this.fullName}</h3>
          <p class="modal-text">${this.email}</p>
          <p class="modal-text cap">${this.location.city}</p>
          <hr>
          <p class="modal-text">${this.cell}</p>
          <p class="modal-text cap">${this.address}</p>
          <p class="modal-text">Birthday: ${this.birthday}</p>
        </div>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    `;
  }
}
