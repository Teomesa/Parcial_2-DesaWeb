import { getUsers, createUser, updateUser } from './api.js';
import { renderUsers, fillForm, clearForm } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const userId = document.getElementById('user-id').value;
        const user = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            jobTitle: document.getElementById('jobTitle').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim()
        };

        if (!validateUser(user)) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        if (userId) {
            updateUser(userId, user);
            alert('Usuario actualizado con éxito');
        } else {
            createUser(user);
            alert('Usuario creado con éxito');
        }

        clearForm();
        loadUsers();
    });
});

// Función para cargar la lista de usuarios
function loadUsers() {
    const users = getUsers();
    renderUsers(users, (user) => {
        fillForm(user);
    });
}

// Función para validar los campos del formulario
function validateUser(user) {
    return user.firstName && user.lastName && user.jobTitle && user.email && user.phone;
}
