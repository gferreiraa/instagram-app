import { Usuario } from './acesso/usuario,model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { Routes } from '@angular/router';
import { Router } from '@angular/router';
@Injectable()
export class Autenticacao {
  token_id: string;

  constructor(private router: Router) { }
  // Metodo para receber user model
  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    console.log('Chegamos até aqui', usuario);

    return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.senha)
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
  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resposta: any) => {
            firebase.auth().currentUser.getIdToken()
                .then((idToken: string) => {
                    this.token_id = idToken;
                    localStorage.setItem('idToken', idToken);
                    // Persistindo informação no browser
                    localStorage.setItem('idToken', idToken);
                    this.router.navigate(['/home']);
                });
        })
        .catch((error: Error) => console.log(error));
}
  public autenticado(): boolean {
    if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken')
    }
    return this.token_id !== undefined;
  }
}
