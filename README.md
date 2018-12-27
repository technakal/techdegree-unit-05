# Random User API

## Techdegree Unit 05

### Project Overview

### Glossary

| Term               | Definition                                                                                                                                                                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Employee           | A person who works for the company requesting the prototype.                                                                                                                                                                                 |
| Employee_App       | The employee directory.                                                                                                                                                                                                                      |
| Employee_Dashboard | The primary User_Interface module, containing the Employee_List.                                                                                                                                                                             |
| Employee_Data      | Information about the Employee. Full details include: image, first and last name, email address, cell phone number, street name and number, city, state or country, postal code, and birthday. Appears as a modal on the Employee_Dashboard. |
| Employee_List      | The list of all Employees. Displays every Employee_Overview.                                                                                                                                                                                 |
| Employee_Overview  | A visual representation of the Employee. Contains a subset of Employee_Data about the Employee which is comprised of: image, first and last name, email address, and city or location.                                                       |
| Random_User_API    | The third-party API used to generate Employees and their Employee_Data. [Random User Generator API](https://randomuser.me/).                                                                                                                 |
| Visual_Design      | The appearance of the Employee_App, as specified in the Design section of this document.                                                                                                                                                     |

### Requirements

#### User Stories

1. As a user, I can view a listing of each employee at my company, so that I know who works here.
2. As a user, I can view basic information about each employee from the overview screen, so that I can know the important contact information about the employee.
3. As a user, I can view additional information about any employee I choose, so that I know more about my coworkers.
   4.As a user, I can thumb through additional information about each employee, one at a time, so that I can properly stalk my coworkers.

#### Functional Requirements

##### Priority 1

1. When the user loads the Employee_App, the Employee_App shall display twelve random users from the Random_User_API.
   2 When the user is on the Employee_Dashboard, the Employee_App shall display the Employee_List.
2. The Employee_List shall display the Employee_Overview for each Employee simultaneously.
3. When the user selects the Employee_Overview, the Employee_App shall display the Employee_Data for the selected Employee without navigating away from the Employee_Dashboard.
4. When the user exits the Employee_Data, the Employee_App shall display the Employee_Dashboard.

##### Priority 2

6. When the user is viewing the Employee_Data, the Employee_App shall allow the user to navigate through the Employee_Data for each Employee, one at a time.
7. When {the user reaches the beginning of the Employee_List} AND {the user navigates to the prior Employee}, the Employee_App shall navigate the user to the Employee at the end of the Employee_List.
8. When {the user reaches the end of the Employee_List} AND {the user navigates to the next Employee}, the Employee_App shall navigate the user to the Employee at the beginning of the Employee_List.
9. The Employee_App shall allow the user to filter the Employee_List by name.
10. The Employee_App shall differ from the Visual_Design in one or more of the following ways:
    a. Color
    b. Font
    c. Box or text shadowing
    d. Animation or transition

#### Constraints

1. The Employee_App shall use the Random_User_API to retrieve Employee_Data.
2. The Employee_App shall not use any frameworks or third-party libaries.
3. The Employee_App shall display the Employee_Overview of twelve Employees in the User_Interface.
4. The Employee_App shall match the Visual_Design provided by the designer.

### Design

#### API Methods

- [API documentation](https://randomuser.me/documentation).

##### Requesting Multiple Users

- https://randomuser.me/api/?results=x
  - x equals the number of users to retrieve.

##### Specifying JSON Format

- https://randomuser.me/api/?format=x
  - x equals the format. Accepted format values are:
    - JSON
    - PrettyJSON or pretty
    - CSV
    - YAML
    - XML

##### Specifying Nationality

- https://randomuser.me/api/?nat=x
  - x equals the two digit nationality code. Mulitple nationalities can be requested using a comma-separated list:
    - ?nat=us,dk,fr,gb
  - Available nationalities:
    - AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US

##### Including and Excluding Fields

- https://randomuser.me/api/?inc=x OR https://randomuser.me/api/?exc=y
  - x equals the included field names. By default, all fields are returned.
  - y equals the excluded field names. In this application, we can exclude:
    - login
    - registered
  - Mulitple nationalities can be requested using a comma-separated list.

##### JSONP Callback

- If information is required in the form of a JSONP callback, use the callback method `randomuserdata`:
  - https://randomuser.me/api/?callback=randomuserdata

#### Code Design

##### File Structure

###### Diagram

root -|  
      |  
      |--index.html  
      |  
      |-- js--|  
      |       |--app.js  
      |       |--Directory.js  
      |       |--Employee.js  
      |  
      |--css--|  
              |--normalize.css  
              |--styles.css  

###### JavaScript Files

**app.js**

- Initializes classes
- Initializes event handlers
- Performs fetch calls

**Directory.js**

- Contains all Employee objects
- Handles user interface interactivity
- Renders modal

**Employee.js**

- Stores information on a single employee
- Renders Employee_Overview
- Renders Employee_Data

##### Classes

**Employee**

_**Attributes**_

- image
- first name
- last name
- email address
- cell phone number
- street name and number
- city
- state or country
- postal code
- birthday

_**Methods**_

```js
get name() {
  // returns this.firstName + this.lastName
}

checkName(searchTerm) {
  // if name().includes( search ) return this
}

renderEmployeeLimited() {
  // renders the Employee_Overview card to the DOM.
}

renderEmployeeFull() {
  // renders the Employee_Data card to the modal.
}
```

**Directory**

_**Attributes**_

- Employees

_**Methods**_

```js
filterDirectoryBySearch() {
  // appends the results fo searchEmployees() to the DOM.
}

searchEmployees(searchTerm) {
  // returns array of all this.employees.map(employee => employee.checkName())
}

determineDisplayedEmployee() {
  // returns the employee object currently appended to the modal.
}

viewFullDetails(employee) {
  // appends the modal to the DOM.
  // calls renderEmployeeFull(employee)
  // initiates modal event listeners
}

viewNextEmployee() {
  // employee = determineDisplayedEmployee()
  // if indexOf(employee) !== this.employees.length
    // calls renderEmployeeFull() on employee[index + 1]
  // else
    // calls renderEmployeeFull() on employee[0]
}

viewPreviousEmployee() {
  // employee = determineDisplayedEmployee()
  // if indexOf(employee) !== 0
    // calls renderEmployeeFull() on employee[index - 1]
  // else
    // calls renderEmployeeFull() on employee[this.employees.length - 1]
}

closeFullDetails() {
  // removes the modal from the DOM.
}
```

#### Visual Design

##### Colors

##### Fonts

#### Mockups

![Employee Directory](https://github.com/technakal/techdegree-unit-05/blob/master/mockups/employee_directory.png)

![Employee Overlay](https://github.com/technakal/techdegree-unit-05/blob/master/mockups/employee_overlay.png)

### Development Documentation
