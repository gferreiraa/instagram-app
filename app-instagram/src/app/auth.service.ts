import { Usuario } from './acesso/usuario,model';
import * as firebase from 'firebase';

export class Autenticacao {
  // Metodo para receber user model
  public cadastrarUsuario(usuario: Usuario): void {
    console.log('Chegamos até aqui', usuario);

    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.senha)
      .then( (response: any) => {
        // Remover a senha do atributo do objeto usuário
        delete usuario.senha;

        // Registrando dados complementares no path
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set( usuario );
        console.log('Usuário Cadastrado', response);
      })
      .catch( (error: Error) => {
        console.log(error);
      });
  }
  public autenticar(email, senha): void {
    console.log('Dados Recebidos por parametro', email, senha);
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then( (resposta: any) => console.log(resposta))
      .catch( (error: Error) => console.log(error));
  }
}
