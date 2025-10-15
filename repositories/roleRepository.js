import roleModel from "../models/roleModel.js";

export async function createRole({ roleName }) { //
  const role = await roleModel.create({ roleName });
  return role;
}

export async function getRoleById(id) { //
  return await roleModel.findByPk(id) || null
}


export async function updateRole(id, values) {  //
  const role = await getRoleById(id);
  if (!role) {
    return null;
  }
  return await role.update(values);
}

export async function deleteRole(id) { //
  const role = await getRoleById(id);
  if (!role) {
    return null;
  }

  return await role.destroy()
}

export async function getAllRoles() {  //
  return await roleModel.findAll();
}

export async function roleExists(roleName) {
  const role = await roleModel.findOne({ where: { roleName } });
  return Boolean(role);
}

