import * as firebase from 'firebase';
export class Bd {
  public publicar(publicacao: any): void {

    console.log(publicacao);

    const nomeImagem = Date.now();

    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        // Upload Progress
        (snapshot: any) => {
           console.log('teste');
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('Upload Completo');
        }

       );
/*     firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push( { titulo: publicacao.titulo } ); */
    // console.log('Chegamos até o serviço responsável pelo controle de dados')
}
}
