// Selección de elementos del DOM
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const age = document.getElementById('age');
const formStatus = document.getElementById('formStatus');

// Objeto para rastrear el estado de validez de cada campo
const formState = {
    username: false,
    email: false,
    password: false,
    age: false
};

// --- FUNCIONES DE UTILIDAD (Buenas prácticas) ---

// Muestra el estado de error en un input
const showImgError = (inputElement, errorElement, message) => {
    inputElement.classList.add('invalid');
    inputElement.classList.remove('valid');
    errorElement.textContent = message;
};

// Muestra el estado correcto en un input
const showSuccess = (inputElement, errorElement) => {
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    errorElement.textContent = '';
};

// --- FUNCIONES DE VALIDACIÓN ---

const validateUsername = () => {
    const errorElement = document.getElementById('usernameError');
    const value = username.value.trim();

    if (value === '') {
        showImgError(username, errorElement, 'El nombre es obligatorio.');
        formState.username = false;
    } else {
        showSuccess(username, errorElement);
        formState.username = true;
    }
};

const validateEmail = () => {
    const errorElement = document.getElementById('emailError');
    const value = email.value.trim();
    // Expresión regular estándar para correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showImgError(email, errorElement, 'El correo es obligatorio.');
        formState.email = false;
    } else if (!emailRegex.test(value)) {
        showImgError(email, errorElement, 'Introduce un correo electrónico válido.');
        formState.email = false;
    } else {
        showSuccess(email, errorElement);
        formState.email = true;
    }
};

const validatePassword = () => {
    const errorElement = document.getElementById('passwordError');
    const value = password.value; // Sin .trim() por si quiere usar espacios

    if (value === '') {
        showImgError(password, errorElement, 'La contraseña es obligatoria.');
        formState.password = false;
    } else if (value.length < 6) {
        showImgError(password, errorElement, 'Debe tener al menos 6 caracteres.');
        formState.password = false;
    } else {
        showSuccess(password, errorElement);
        formState.password = true;
    }
};

const validateAge = () => {
    const errorElement = document.getElementById('ageError');
    const value = age.value.trim();

    if (value === '') {
        showImgError(age, errorElement, 'La edad es obligatoria.');
        formState.age = false;
    } else if (isNaN(value) || Number(value) <= 0) {
        showImgError(age, errorElement, 'Introduce un número de edad válido.');
        formState.age = false;
    } else {
        showSuccess(age, errorElement);
        formState.age = true;
    }
};

// --- ASIGNACIÓN DE EVENTOS (oninput y onblur) ---

// Eventos para Nombre
username.addEventListener('input', validateUsername);
username.addEventListener('blur', validateUsername);

// Eventos para Correo
email.addEventListener('input', validateEmail);
email.addEventListener('blur', validateEmail);

// Eventos para Contraseña
password.addEventListener('input', validatePassword);
password.addEventListener('blur', validatePassword);

// Eventos para Edad
age.addEventListener('input', validateAge);
age.addEventListener('blur', validateAge);

// --- EVENTO DE ENVÍO (onsubmit) ---

form.addEventListener('submit', (event) => {
    // Evitamos el comportamiento por defecto de recargar la página
    event.preventDefault();

    // Forzamos la validación de todos los campos antes de enviar
    validateUsername();
    validateEmail();
    validatePassword();
    validateAge();

    // Verificamos si todos los campos en nuestro objeto de estado son verdaderos (true)
    const isFormValid = Object.values(formState).every(field => field === true);

    if (isFormValid) {
        formStatus.textContent = "¡Formulario enviado con éxito!";
        formStatus.className = "form-status success";
        
        // Aquí podrías enviar los datos a un servidor
        console.log("Datos del formulario:", {
            username: username.value,
            email: email.value,
            password: password.value,
            age: age.value
        });

        // Opcional: limpiar el formulario tras el éxito
        form.reset();
        // Remover clases de éxito visuales después del reset
        document.querySelectorAll('input').forEach(input => input.classList.remove('valid'));
    } else {
        formStatus.textContent = "Por favor, corrige los errores antes de enviar.";
        formStatus.className = "form-message"; // Reutiliza estilo de error o por defecto
        formStatus.style.color = "var(--error-color)";
    }
});