import { Usuario } from './acesso/usuario,model';

export class Autenticacao {
  // Metodo para receber user model
  public cadastrarUsuario(usuario: Usuario): void {
    console.log('Chegamos até aqui', usuario);
  }
}
