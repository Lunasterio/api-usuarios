import fs from "fs";

const readData = () => {
    const data = fs.readFileSync("./users.json");
    return JSON.parse(data);
};

export const getUsers = (req, res) => {
    const data = readData();
    res.json(data.users);
};

const writeData = (data) => {
    try {
      fs.writeFileSync("./users.json", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

export const addUser = (req, res) => {
    const data = readData();
    const body = req.body;
    const newUser = {
      id: data.users.length,
      ...body,
    };
    data.users.push(newUser);
    writeData(data);
    res.json(newUser);
  };

  export const updateUser = (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const userIndex = data.users.findIndex((user) => user.id === id);
    data.users[userIndex] = {
      ...data.users[userIndex],
      ...body,
    };
    writeData(data);
    res.json({ message: "Usuario actualizado correctamente" });
  };

  export const getUser = (req, res) => {
    const data = readData();
    const userEmail = req.params.correo; // Obtiene el índice del zapato de la solicitud
  
    if (userEmail) {
      const user = data.users.find((usuario) => usuario.correo === userEmail);;
      res.json(user); // Devuelve solo el zapato especificado
    } else {
      res.json({ status: 404, mensaje: 'Usuario no existe' }); // Indica error si el índice es inválido
    }
  };