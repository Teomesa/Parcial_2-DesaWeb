export function renderUsers(users, onClickUser) {
    const usersContainer = document.getElementById('users');
    usersContainer.innerHTML = ''; // Limpiar la lista antes de volver a renderizarla

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user-item');

        const userImage = document.createElement('img');
        userImage.src = user.photo;
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
        userElement.addEventListener('click', () => onClickUser(user));
        usersContainer.appendChild(userElement);
    });
}

// Función para llenar el formulario con los datos de un usuario
export function fillForm(user) {
    document.getElementById('user-id').value = user.id;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('jobTitle').value = user.jobTitle;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
}

// Función para limpiar el formulario
export function clearForm() {
    document.getElementById('user-id').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('jobTitle').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}
