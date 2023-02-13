
export const handleNameChange = (setErrorName, name, setName) => event => {
    const input = event.target.value;
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-'\s]{0,40}$/;
    if (!regex.test(input)) {
      event.target.classList.add('error');
      setErrorName(`Please enter a valid ${name}`);
      return;
    } else if (regex.test(input)) {
        setName(input);
        event.target.classList.remove('error');
        setErrorName('');
    }
};

export const controlLenghtName  = (setErrorName, nameToControl, name) => {
    if (nameToControl.length <= 1) {
        setErrorName(`The ${name} must contain at least 2 letters`);
        document.getElementById(`input_${name}`).classList.add('error');
      return false;
    } else {
      setErrorName('');
      document.getElementById(`input_${name}`).classList.remove('error');
      return true;
    }
}