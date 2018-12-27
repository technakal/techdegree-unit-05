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

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }

  renderEmployeeLimited() {
    const employeeHtml = `
      <div class="card" id="employee-${this.id}">
        <div class="card-img-container">
          <img class="card-img" src="${this.picture.thumbnail}" alt="${
      this.fullName
    } picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${this.fullName}</h3>
          <p class="card-text">${this.email}</p>
          <p class="card-text cap">${this.location.city}, ${
      this.location.state
    }</p>
        </div>
      </div>
    `;
    return employeeHtml;
  }
}
