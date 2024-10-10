const baseUrl = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users';

export async function getUsers() {
    try {
        const response = await fetch(baseUrl, {method: 'GET',});
        if (!response.ok) throw new Error('Error al obtener usuarios');
        const users = await response.json();
        console.log('Datos recibidos:', users); 
        return users;
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
        throw error;
    }
}


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
