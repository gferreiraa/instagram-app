import * as firebase from 'firebase';
export class Bd {
  public publicar(publicacao: any): void {

    console.log(publicacao);

    const nomeImagem = Date.now();

    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem);
/*     firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push( { titulo: publicacao.titulo } ); */
    // console.log('Chegamos até o serviço responsável pelo controle de dados')
}
}
