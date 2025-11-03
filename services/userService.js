import { GameError, RoleError, UserError } from "../errors/index.error.js";
import { userRepository , userGameRepository , userRoleRepository , roleRepository , gameRepository } from "../repositories/indexRepository.js";
import bcrypt from "bcrypt";


export async function createUser({ username, password, birthDate }) {

    if (await userRepository.userExists(username)){
        throw new UserError.ConflictError("Ce nom d'utilisateur est déja utilisé")
    }
    if (!username || username.length > 255){
        throw new UserError.BadRequestError("Le nom doit compter entre 1 et 250 caractères")
    }
    if (!password || password.length < 7){
        throw new UserError.BadRequestError("Le mot de passe doit faire au moins 7 caractères")
    }
    if (!birthDate){
        throw new UserError.BadRequestError("L'année de naissance est obligatoire")
    }

    const hashedPassword = await bcrypt.hash(password, 10);



    const user = await userRepository.createUser({ username, password:hashedPassword, birthDate });

    return user;
}

export async function getUserById(id) {
  const user =  await userRepository.getUserById(id);

  if (!user){
    throw new UserError.NotFoundError("cet utilisatur n'existe pas")
  }

  return {
    id : user.id,
    username : user.username,
    password : user.password,
    birthDate : user.birthDate
  }
}


export async function updateUser(id, { username, password, birthDate }) {
    if (await userRepository.userExists(username)){
        throw new UserError.ConflictError("Ce nom d'utilisateur est déja utilisé")
    }
    if (!username || username.length > 255){
        throw new UserError.BadRequestError("Le nom doit compter entre 1 et 250 caractères")
    }
    if (!password || password.length < 7){
        throw new UserError.BadRequestError("Le mot de passe doit faire au moins 7 caractères")
    }
    if (!birthDate){
        throw new UserError.BadRequestError("L'année de naissance est obligatoire")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.updateUser(id, { username, password:hashedPassword, birthDate });

    return user;
}

export async function deleteUser(id){
    if (!await getUserById(id)){
        throw new UserError.NotFoundError("Cet utilisteur n'existe pas");
    }

    return (await userRepository.deleteUser(id)).dataValues;
}

export async function getAllUsers(){
    const userList = await userRepository.getAllUsers()
    if(!userList){
        throw new UserError.NotFoundError("Aucun utilisateur n'a été trouvé");
        
    }
    return userList;
}

// méthodes pour tables liés :

// userRoles : 

export async function addRoleToUser({idRole, idUser}){
    const user = await userRepository.getUserById(idUser)
    const role = await roleRepository.getRoleById(idRole)
    if(!user){
        throw new UserError.NotFoundError("l'utilisateur n'existe pas");
    }
    if(!role){
        throw new RoleError.NotFoundError("Le role n'existe pas");  
    }
    const existing = await userRoleModel.findOne({ where: { idRole, idUser } });
    if (existing){
        throw new RoleError.ConflictError("L'utilisateur possède déjà ce rôle");
    }
    return userRoleRepository.addRoleToUser({ roleId: idRole, userId: idUser })
}

export async function getUserRoles(id) {
  const roles = await userRoleRepository.getUserRoles(id);
  if (!roles.length) throw new UserError.NotFoundError("Aucun role trouvé pour cet utilisateur");
  return roles;
}


export async function removeRoleFromUser({ idUser, idRole }) {
  const user = await userRepository.getUserById(idUser);
  const role = await roleRepository.getRoleById(idRole);

  if (!user) throw new UserError.NotFoundError("L'utilisateur n'existe pas");
  if (!role) throw new RoleError.NotFoundError("Le rôle n'existe pas");

  const removed = await userRoleRepository.removeRoleFromUser({ userId: idUser, roleId: idRole });

  if (!removed) throw new RoleError.NotFoundError("Ce rôle n'est pas attribué à cet utilisateur");

  return { message: "Rôle retiré avec succès" };
}


// userGames :

export async function addGameToUser({idUser , idGame}){
    const user = await userRepository.getUserById(idUser)
    const game = await gameRepository.getGameById(idGame)
    if(!user){
        throw new UserError.NotFoundError("l'utilisateur n'existe pas");
    }
    if(!game){
        throw new GameError.NotFoundError("Ce jeu n'existe pas");  
    }
    const existing = await userGameModel.findOne({ where: { idUser, idGame } });
    if (existing){
         throw new GameError.ConflictError("L'utilisateur possède déjà ce jeu");
    }
    return userGameRepository.addGameToUser({ userId: idUser, gameId: idGame })
}

export async function getUserGames(id) {
  const games = await userGameRepository.getUserGames(id);
  if (!games.length) throw new GameError.NotFoundError("Aucun jeu trouvé pour cet utilisateur");
  return games;
}


export async function removeGameFromUser({ idUser, idGame }) {
  const user = await userRepository.getUserById(idUser);
  const game = await gameRepository.getGameById(idGame);

  if (!user) throw new UserError.NotFoundError("L'utilisateur n'existe pas");
  if (!game) throw new GameError.NotFoundError("Le jeu n'existe pas");

  const removed = await userGameRepository.removeGameFromUser({ userId: idUser, gameId: idGame });

  if (!removed) throw new GameError.NotFoundError("Ce jeu n'est pas associé à cet utilisateur");

  return { message: "Jeu retiré avec succès" };
}


