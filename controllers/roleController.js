import { roleService } from "../services/indexService.js";

export async function createRole(req, res, next) {
  try {
    const { roleName } = req.body;
    const role = await roleService.createRole({ roleName });
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
}

export async function getRoleById(req, res, next) {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
}

export async function updateRole(req, res, next) {
  try {
    const { id } = req.params;
    const { roleName } = req.body;
    const updatedRole = await roleService.updateRole(id, { roleName });
    res.status(200).json(updatedRole);
  } catch (error) {
    next(error);
  }
}

export async function deleteRole(req, res, next) {
  try {
    const { id } = req.params;
    await roleService.deleteRole(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getAllRoles(req, res, next) {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
}
