document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        alert("Form is valid and can be submitted.");
      }
    });
  
    function validateForm() {
      let isValid = true;
  
      const fieldsToValidate = [
        { id: "aadhaar", regex: /^\d+$/, message: "Aadhaar No. must consist of digits only." },
        { id: "name", regex: /^[A-Za-z]+$/, message: "Field 'Name' must consist of alphabets only." },
        { id: "school-name", regex: /^[A-Za-z]+$/, message: "Field 'School Name' must consist of alphabets only." },
        {
          id: "password",
          validate: () => {
            const passwordField = document.querySelector("#password");
            const passwordValue = passwordField.value;
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#_]).{6,14}$/.test(passwordValue);
          },
          message:
            "Password must be 6 to 14 characters, containing at least one alphabet, one digit, and one of the special characters @, $, #, or _.",
        },
        {
          id: "dob",
          validate: () => {
            const dobField = document.querySelector("#dob");
            const dobValue = new Date(dobField.value);
            const currentDate = new Date();
            const minAgeDate = new Date(currentDate.getFullYear() - 3, currentDate.getMonth(), currentDate.getDate());
            return dobValue <= minAgeDate;
          },
          message: "DOB should be entered in such a way so that the age must be at least 3 years.",
        },
        {
          id: "contact",
          regex: /^[1-9]\d{9}$/,
          message: "Contact number must be 10 digits and should not start with zero.",
        },
        {
          id: "login-id",
          regex: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
          message: "Email must be in a valid email format.",
        },
        {
          id: "siblings",
          regex: /^(\+|-)?\d+$/,
          message: "Siblings of the student must consist of an optional sign (+/-) and an integer.",
        },
        {
          id: "distance",
          validate: () => {
            const distanceField = document.querySelector("#distance");
            const distanceValue = parseFloat(distanceField.value);
            return !isNaN(distanceValue) && distanceValue >= 0 && distanceValue <= 14.25;
          },
          message: "Distance from school must be a non-negative number not greater than 14.25 km.",
        },
      ];
  
      for (const field of fieldsToValidate) {
        const fieldElement = document.querySelector(`#${field.id}`);
        const fieldValue = fieldElement.value.trim();
  
        if (field.validate ? !field.validate() : !field.regex.test(fieldValue)) {
          isValid = false;
          alert(field.message);
        }
      }
  
      return isValid;
    }
  });
  