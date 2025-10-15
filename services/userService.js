import { GameError, RoleError, UserError } from "../errors/index.error.js";
import { userRepository , userGameRepository , userRoleRepository , roleRepository , gameRepository } from "../repositories/indexRepository.js";

export async function createUser({ username, password, birthDate }) {

    if (userRepository.userExists(username)){
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

    const user = await userRepository.createUser({ username, password, birthDate });

    return user.dataValues;
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
    if (userRepository.userExists(username)){
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
  const user = await userRepository.updateUser(id, { username, password, birthDate });

  return user.dataValues;
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

export async function addRoleToUser({idRole , idUser}){
    const user = await userRepository.getUserById(idUser)
    const role = await roleRepository.getRoleById(idRole)
    if(!user){
        throw new UserError.NotFoundError("l'utilisateur n'existe pas");
    }
    if(!role){
        throw new RoleError.NotFoundError("Le role n'existe pas");  
    }

    return userRoleRepository.addRoleToUser({idRole, idUser}) // à vérifier
}

export async function getUserRoles(id){
    const roleList = await userRoleRepository.getUserRoles(id)
    if (!roleList){
        throw new UserError.NotFoundError("Cet utilisateur n'a aucun role (cela ne devrait pas arriver problème)");   
    }
    return roleList
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

    return userGameRepository.addGameToUser({idUser , idGame}) // meme chose
}

export async function getUserGames(id){
    const gameList = await userGameRepository.getUserGames(id)
    if (!gameList){
        throw new GameError.NotFoundError("Cet utilisateur ne possède aucun jeu dans sa bibliothèque");   
    }
    return gameList
}


