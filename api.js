const baseUrl = 'https://bbd7-2800-e2-2780-2479-2417-fe6c-d24e-ecb3.ngrok-free.app/users';

export async function getUsers() {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
        });
        if (!response.ok) throw new Error('Error al obtener usuarios');
        const users = await response.json();
        console.log('Datos recibidos:', users); // Debug
        return users;
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
        throw error;
    }
}

// Función para crear un nuevo usuario
export async function createUser(user) {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Error al crear usuario');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Función para actualizar un usuario existente
export async function updateUser(userId, user) {
    try {
        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Error al actualizar usuario');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
