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
      id: data.users.length + 1,
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