export function onChangedHandler(
  event,
  inputIdentifier,
  stateElement,
  checkValidityCallback
) {

  const updatedForm = {
    ...this.state[stateElement]
  };

  const updatedFormElement = {
    ...updatedForm[inputIdentifier]
  };

  updatedFormElement.valid = checkValidityCallback(
    updatedFormElement.value,
    updatedFormElement.validation
  );

  updatedFormElement.value = event.target.value;

  updatedFormElement.touched = true;

  updatedForm[inputIdentifier] = updatedFormElement;

  let formIsValid = true;

  for (let inputIdentifier in updatedForm) {
    console.log(updatedForm[inputIdentifier].valid);
    formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
  }

  console.log(formIsValid);

  this.setState({
    [stateElement]: updatedForm,
    formIsValid: formIsValid
  });

}

export function checkValidity(value, rules) {
  let isValid = true;
  if (!rules) return true;

  if (rules.required) isValid = value.trim() !== '' && isValid;

  if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

  return isValid;
};
