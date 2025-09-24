import userModel from "../models/userModel.js";

export async function createUser({ username, password, birthDate }) {
  const user = await userModel.create({ username, password, birthDate });
  return user;
}

export async function getUserById(id) {
  if (!user) {
    return null;
  }
  return await userModel.findByPk(id);
}

export async function updtateUser(id, values) {
  const user = await getUserById(id);
  if (!user) {
    return null;
  }
  return await user.update(values);
}

export async function deleteUser(id) {
  const user = await getUserById(id);
  if (!user) {
    return null;
  }

  return await user.destroy()
}

export async function getAllusers() {
  return await userModel.findAll();
}

export async function userExists(username) {
  const user = await userModel.findOne({ where: { username } });
  return Boolean(user);
}

