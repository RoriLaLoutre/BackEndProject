import { GameError , RoleError , UserError , ConfigError } from "../errors/index.error.js";

export async function errorHandler(error , req , res , next){
    if ((error instanceof GameError.ApiError) || (error instanceof RoleError.ApiError) || (error instanceof UserError.ApiError) || (error instanceof ConfigError.ApiError))  {
      res.status(error.statusCode).json({ error: error.message });
    } 
    else {
        res.status(500).json({ error: error.message });
    }

}