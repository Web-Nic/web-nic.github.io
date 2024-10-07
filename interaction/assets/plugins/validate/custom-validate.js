
// FORM VALIDATION

function newValid(constraints, elForm) {
  // Before using it we must add the parse and format functions
  // Here is a sample implementation using moment.js
  validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
      let format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

  // These are the constraints used to validate the form

  // Hook up the form so we can prevent it from being posted
  let form = document.querySelector(elForm);
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  // Hook up the inputs to validate on the fly
  let inputs = document.querySelectorAll("input, textarea, select")
  for (let i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
      let errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  function handleFormSubmit(form, input) {
    // validate the form against the constraints
    let errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
    console.log(errors);
  }

  // Updates the inputs with the validation errors
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    let formGroup = closestParent(input.parentNode, "form-group")
      // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("is-invalid");
      if (formGroup.querySelector('.feedback__badge')) {
        formGroup.querySelector('.feedback__badge').innerText = fieldInvalid;
      }
      // then we append all the errors
      _.each(errors, function(error) {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("is-valid");
      if (formGroup.querySelector('.feedback__badge')) {
        formGroup.querySelector('.feedback__badge').innerText = fieldValid;
      }
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("is-invalid");
    formGroup.classList.remove("is-valid");
    // and remove any old messages
    _.each(formGroup.querySelectorAll(".feedback__text"), function(el) {
      el.innerText = '';
    });
  }

  function addError(messages, error) {
    let block = messages.querySelector(".feedback__text");
    block.innerText = error;
  }
  function showSuccess() {
    window.location.href='template-mvp.html'
    // alert("Ура!!!");
  }
};


let formLogin = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    format: {
      pattern: "^(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
      message: passwordFields,
    },
    length: {
      minimum: 6,
    },
  },
  remember: {
    presence: {
    },
    inclusion: {
      within: [true],
    }
  },
};

if (document.querySelector('#loginForm')) {
  newValid(formLogin, "#loginForm");
}


let formResend = {
  email: {
    presence: true,
    email: true,
  },
};

if (document.querySelector('#formResend')) {
  newValid(formResend, "#formResend");
}

let formSignup = {
  'full-name': {
    presence: true,
    length: {
      minimum: 3,
      maximum: 50,
    },
    format: {
      // We don't allow anything that a-z and 0-9
      pattern: "[а-яґієї’a-z0-9-]+",
      // but we don't care if the username is uppercase or lowercase
      flags: "i",
      message: textFields,
    },
  },
  company: {
    presence: true,
    format: {
      // We don't allow anything that a-z and 0-9
      pattern: "[а-яґієї’a-z0-9-]+",
      // but we don't care if the username is uppercase or lowercase
      flags: "i",
      message: textFields,
    },
  },
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    format: {
      pattern: "^(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
      message: passwordFields,
    },
    length: {
      minimum: 6,
    },
  },
};

if (document.querySelector('#formSignup')) {
  new newValid(formSignup, "#formSignup");
}

