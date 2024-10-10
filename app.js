import { getUsers, createUser, updateUser } from './api.js';
import { renderUsers, fillForm, clearForm } from './dom.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const users = await getUsers();
        renderUsers(users, (user) => {
            fillForm(user); 
        });
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
    }

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
    
        // Validar el usuario antes de proceder
        if (!validateUser(user)) {
            alert('Por favor, completa todos los campos correctamente.');
            return; // Salir si la validación falla
        }
    
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
        await createUser(user);
        alert('Usuario creado con éxito');
    }
}
