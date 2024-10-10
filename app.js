import { getUsers, createUser, updateUser } from './api.js';
import { renderUsers, fillForm, clearForm } from './dom.js';

document.addEventListener('DOMContentLoaded', async () => {
    const toggleButton = document.getElementById('toggle-users');
    const usersContainer = document.getElementById('users');

    toggleButton.addEventListener('click', async () => {
        const usersVisible = usersContainer.style.display === 'block';

        if (!usersVisible) {
            try {
                const users = await getUsers();
                renderUsers(users, (user) => {
                    fillForm(user);
                });
                usersContainer.style.display = 'grid';
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            }
        } else {
            usersContainer.style.display = 'none';
        }
    });

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
                renderUserCard(user); // Agregar usuario a la lista
            };
            reader.readAsDataURL(file); // Leer el archivo como URL de datos
        } else {
            user.photo = ''; // No se seleccionó imagen
            await submitUser(userId, user);
            renderUserCard(user); // Agregar usuario a la lista
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
        await createUser(user);
        alert('Usuario creado con éxito');
    }
}

// Función para renderizar una tarjeta de usuario
function renderUserCard(user) {
    const usersContainer = document.getElementById('users');
    const userElement = document.createElement('div');
    userElement.classList.add('user-item');

    const userImage = document.createElement('img');
    userImage.src = user.photo || 'default_photo.png'; // URL de la foto por defecto
    userImage.alt = `${user.firstName} ${user.lastName}`;
    userImage.classList.add('user-photo');

    const userInfo = document.createElement('div');
    userInfo.innerHTML = `
        <h3>${user.firstName} ${user.lastName}</h3>
        <p><strong>Título de trabajo:</strong> ${user.jobTitle}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Teléfono:</strong> ${user.phone}</p>
    `;

    userElement.appendChild(userImage);
    userElement.appendChild(userInfo);
    usersContainer.appendChild(userElement);
}
