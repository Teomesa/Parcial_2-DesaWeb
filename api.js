export const usersData = [
    {
        "firstName": "Chasity",
        "lastName": "McKenzie",
        "email": "vm_ZmvAZ@ckjooemqxn.co",
        "id": 9,
        "photo": "http://loremflickr.com/640/480/people?17307",
        "jobTitle": "Factors",
        "phone": "3195732731"
    },
    {
        "firstName": "Jedidiah",
        "lastName": "Shields",
        "id": 4,
        "photo": "http://loremflickr.com/640/480/people?52478",
        "jobTitle": "Tactics",
        "email": "OxIwoBFrQ@rnojh.co",
        "phone": "3180980129"
    },
    {
        "firstName": "Alanis",
        "lastName": "Terry",
        "photo": "http://loremflickr.com/640/480/people?54186",
        "jobTitle": "Marketing",
        "phone": "3140320291",
        "email": "BOD73@rbsirbi.co",
        "id": 2
    },
    {
        "firstName": "Faustino",
        "lastName": "Murazik",
        "photo": "http://loremflickr.com/640/480/people?46835",
        "phone": "3153872779",
        "id": 9,
        "email": "LBv_s1bC-@gftayrtzhm.com.co",
        "jobTitle": "Factors"
    },
    {
        "firstName": "Esmeralda",
        "lastName": "Keeling",
        "jobTitle": "Data",
        "id": 1,
        "phone": "3165726468",
        "email": "7A-Oh@kcpj.com.co",
        "photo": "http://loremflickr.com/640/480/people?75666"
    }
];

// Función para obtener todos los usuarios
export function getUsers() {
    return usersData;
}

// Función para crear un nuevo usuario
export function createUser(newUser) {
    newUser.id = usersData.length ? usersData[usersData.length - 1].id + 1 : 1;
    usersData.push(newUser);
    return newUser;
}

// Función para actualizar un usuario existente
export function updateUser(userId, updatedUser) {
    const userIndex = usersData.findIndex(user => user.id === parseInt(userId));
    if (userIndex !== -1) {
        usersData[userIndex] = { ...usersData[userIndex], ...updatedUser };
        return usersData[userIndex];
    } else {
        throw new Error('Usuario no encontrado');
    }
}
