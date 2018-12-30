import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Bd {
  constructor (private progresso: Progresso) { }


  public publicar(publicacao: any): void {

    console.log(publicacao);

    // tslint:disable-next-line:prefer-const
    let nomeImagem = Date.now();

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push( { titulo: publicacao.titulo } )
      .then( (resposta: any) => {
        let nomeImagem = resposta.key;
            firebase.storage().ref()
              .child(`imagens/${nomeImagem}`)
              .put(publicacao.imagem)
              .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // Upload Progress
                (snapshot: any) => {
                  this.progresso.status = 'andamento';
                  this.progresso.estado = snapshot;
                  // console.log('Snapshot capturado com sucesso', snapshot);
                },
                (error) => {
                  this.progresso.status = 'erro';
                 // console.log(error);
                },
                () => {
                  this.progresso.status = 'concluido';
                 // console.log('Upload Completo');
                }
               );
      });
}
  public consultaPublicacoes(emailUsuario: string): any {
    firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
      .once('value')
      .then((snapshot: any) => {
        console.log(snapshot.val());
      });
  }


}
