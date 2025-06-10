function validarFormulario() {
    let esValido = true;
    esValido &= validarCampoRequerido('username');
    esValido &= validarCampoRequerido('nombre');
    esValido &= validarFechaNacimiento('fecha-nacimiento');
    esValido &= validarEmail('email');
    esValido &=validarCampoRequerido('direccion');
    esValido &= validarPassword('password', 'password2');
    return esValido;
}
function validarFormularioLogin() {
    let esValido = true;
    esValido &= validarCampoRequerido('username');
    esValido &= validarCampoRequerido('password');
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
function validarFechaNacimiento(campo) {
    const  input = document.getElementById(campo);
    if( input.value.trim() === '') {
        input.classList.add("is-invalid");
        return false;
    }
    const fecha = new Date(input.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    if (edad < 18) {
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
    const passwordValue = passInput.value.trim();
    const confirmPasswordValue = confirmPassInput.value.trim();

    passInput.classList.remove("is-invalid");
    confirmPassInput.classList.remove("is-invalid");

    if (passwordValue === '') {
        passInput.classList.add("is-invalid");
        return false;
    }
    if (confirmPasswordValue === '') {
        confirmPassInput.classList.add("is-invalid");
        return false;
    }

    if (passwordValue !== confirmPasswordValue) {
        confirmPassInput.classList.add("is-invalid");
        return false;
    }

    if (passwordValue.length < 8) {
        passInput.classList.add("is-invalid");
        return false;
    }

    if (passwordValue.length > 20) {
        passInput.classList.add("is-invalid");
        return false;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(passwordValue)) {
        passInput.classList.add("is-invalid");
        return false;
    }

    const numberRegex = /[0-9]/;
    if (!numberRegex.test(passwordValue)) {
        passInput.classList.add("is-invalid");
        return false;
    }

    const letterRegex = /[a-zA-Z]/;
    if (!letterRegex.test(passwordValue)) {
        passInput.classList.add("is-invalid");
        return false;
    }

    passInput.classList.remove("is-invalid");
    confirmPassInput.classList.remove("is-invalid");
    return true;
}
function validarEditPerfil(){
    let esValido = true;
    esValido &= validarCampoRequerido('editNombre');
    esValido &= validarEmail('editEmail');
    esValido &= validarCampoRequerido('editDireccion');
    return esValido;
}
function validarFormularioRecuperar() {
    let esValido = true;
    esValido &= validarCampoRequerido('username');
    esValido &= validarPassword('password', 'password2');
    return esValido;
}