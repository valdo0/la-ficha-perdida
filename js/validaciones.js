function validarFormulario() {
    let esValido = true;
    esValido &= validarCampoRequerido('username');
    esValido &= validarCampoRequerido('nombre');
    esValido &= validarCampoRequerido('fecha-nacimiento');
    esValido &= validarEmail('email');
    esValido &=validarCampoRequerido('direccion');
    esValido &= validarPassword('password', 'password2');
    return esValido;
}

function validarCampoRequerido(campo) {
    const input = document.getElementById(campo);
    if (input.value.trim() === '') {
        input.classList.add("is-invalid");
        return false;
    }
    input.classList.remove("is-invalid");
    return true;
}
function validarEmail(campo) {
    const input = document.getElementById(campo);
    const feedback = document.querySelector('.invalid-feedback');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    input.classList.remove('is-invalid');
    feedback
    if (!emailRegex.test(input.value.trim())) {
        input.classList.add("is-invalid");
        return false;
    }
    input.classList.remove("is-invalid");
    return true;
}
function validarPassword(password, confirmPassword) {
    const passInput = document.getElementById(password);
    const confirmPassInput = document.getElementById(confirmPassword);
    if (passInput.value.trim() === '') {
        passInput.classList.add("is-invalid");
        return false;
    }
    if (confirmPassInput.value.trim() === '') {
        confirmPassInput.classList.add("is-invalid");
        return false;
    }
    if (passInput.value !== confirmPassInput.value) {
        confirmPassInput.classList.add("is-invalid");
        return false;
    }
    confirmPassInput.classList.remove("is-invalid");
    passInput.classList.remove("is-invalid");
    return true;
}