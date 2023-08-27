import { Request, Response, NextFunction } from 'express';
import { User } from '../entities';
import { UserRoles } from '../enums/UserRoles';

export const adminRoleValidator = async (req: Request, res: Response, 
    next: NextFunction) => {    
      const { userId } = req.body;
      console.log(userId);

      try {
        const user: User | null = await User.findOneBy({ id: userId });
  
        if(!user) {
            return res.status(404).json({ 
              message: `El usuario con iD ${userId} no existe` 
            });
        }
        console.log(user.role, UserRoles.ADMIN);

        if(user.role == UserRoles.USER) {
          return res.status(403).json({
            message: 'Usuario no autorizado para realizar esta acción'
          });
        }
        next();
      } catch (err) {
          console.error(`Error al validar ROL ${err}`);
          return res.status(500).json({
            message: 'Error en el servidor, comuniquese con un administrador'
          });
      }

  };
