import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Bd {
  constructor (private progresso: Progresso) { }


  public publicar(publicacao: any): void {

    console.log(publicacao);

    const nomeImagem = Date.now();

    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        // Upload Progress
        (snapshot: any) => {
          this.progresso.status = 'andamento';
          this.progresso.estado = snapshot;
          console.log('Snapshot capturado com sucesso', snapshot);
        },
        (error) => {
          this.progresso.status = 'erro';
         // console.log(error);
        },
        () => {
          this.progresso.status = 'concluído';
         // console.log('Upload Completo');
        }

       );
/*     firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push( { titulo: publicacao.titulo } ); */
    // console.log('Chegamos até o serviço responsável pelo controle de dados')
}
}
