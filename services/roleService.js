import { RoleError } from "../errors/index.error.js";
import { roleRepository } from "../repositories/indexRepository.js";

export async function createRole({ roleName }) {

    if (roleRepository.roleExists(roleName)){
        throw new RoleError.ConflictError("Impossible de créer ce role, le role existe déja.")
    }
    if (!roleName || roleName.length > 255){
        throw new RoleError.BadRequestError("Impossible d'ajouter le role, le nom doit compter entre 1 et 250 caractères")
    }

    const role = await roleRepository.createRole({ roleName });

    return role.dataValues;
}

export async function getRoleById(id) {
  const role =  await roleRepository.getRoleById(id);

  if (!role){
    throw new RoleError.NotFoundError("le role n'existe pas")
  }

  return {
    id : role.id,
    roleName : role.roleName,
  }
}

export async function updateRole(id, { roleName }) {
    if (roleRepository.roleExists(roleName)){
        throw new RoleError.ConflictError("Impossible de changer pour ce nom, celui-ci est déja pris")
    }
    if (!roleName || roleName.length > 255){
        throw new RoleError.BadRequestError("Impossible de modifier pour ce nom, le nom doit compter entre 1 et 250 caractères")
    }

  const role = await roleRepository.updateRole(id, {
    roleName,
  });

  return role.dataValues;
}

export async function deleteRole(id){
    if (!await getRoleById(id)){
        throw new RoleError.NotFoundError("le role n'existe pas");
    }

    return (await roleRepository.deleteRole(id)).dataValues;
}

export async function getAllRoles(){
    return await roleRepository.getAllRoles()

}
