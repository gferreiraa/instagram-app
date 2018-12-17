import { Usuario } from './acesso/usuario,model';
import * as firebase from 'firebase';

export class Autenticacao {
  // Metodo para receber user model
  public cadastrarUsuario(usuario: Usuario): void {
    console.log('Chegamos até aqui', usuario);

    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.senha)
      .then( (response: any) => {
        console.log('Usuário Cadastrado', response);
      })
      .catch( (error: Error) => {
        console.log(error);
      });

  }
}
