import { getUsers, createUser, updateUser } from './api.js';
import { renderUsers, fillForm, clearForm } from './dom.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Manejador de eventos para el botón de mostrar/ocultar usuarios
    const toggleButton = document.getElementById('toggle-users');
    const usersContainer = document.getElementById('users');

    toggleButton.addEventListener('click', () => {
        if (usersContainer.style.display === 'none') {
            usersContainer.style.display = 'grid'; // Mostrar usuarios
            toggleButton.innerText = 'Ocultar Usuarios'; // Cambiar texto del botón
        } else {
            usersContainer.style.display = 'none'; // Ocultar usuarios
            toggleButton.innerText = 'Mostrar Usuarios'; // Cambiar texto del botón
        }
    });

    // Cargar usuarios al inicio
    await loadUsers();

    // Manejador de eventos para el botón de actualizar usuarios
    const refreshButton = document.getElementById('refresh-users');
    refreshButton.addEventListener('click', loadUsers);

    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = document.getElementById('user-id').value;

        const user = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            jobTitle: document.getElementById('jobTitle').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
        };

        const photoInput = document.getElementById('photo');
        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const reader = new FileReader();
            reader.onloadend = async () => {
                user.photo = reader.result; // Asignar la imagen leída al objeto usuario
                await submitUser(userId, user); // Llamar a la función para guardar el usuario
            };
            reader.readAsDataURL(file); // Leer el archivo como URL de datos
        } else {
            user.photo = ''; // No se seleccionó imagen
            await submitUser(userId, user);
        }

        clearForm();
    });
});

// Función para validar los campos del formulario
function validateUser(user) {
    return user.firstName && user.lastName && user.jobTitle && user.email && user.phone;
}

// Función para crear o actualizar el usuario
async function submitUser(userId, user) {
    if (userId) {
        await updateUser(userId, user);
        alert('Usuario actualizado con éxito');
    } else {
        const createdUser = await createUser(user);
        alert('Usuario creado con éxito');
        // Renderizar el usuario creado al final de la lista
        const usersContainer = document.getElementById('users');
        renderUsers([createdUser], () => fillForm(createdUser), usersContainer);
    }
}

// Función para cargar usuarios
async function loadUsers() {
    try {
        const users = await getUsers();
        const usersContainer = document.getElementById('users');
        usersContainer.innerHTML = ''; 
        renderUsers(users, (user) => {
            fillForm(user);
            scrollToForm(); 
        }, usersContainer);
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
    }
}

// Función para desplazar la vista al formulario
function scrollToForm() {
    const formSection = document.getElementById('user-form-section');
    formSection.scrollIntoView({ behavior: 'smooth' }); 
}
