import { Progresso } from './../../progresso.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Bd } from './../../bd.service';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  private imagem: any;

  public progressoPublicacao = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo':  new FormControl(null)
  });

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    const acompanhamentoUpload = Observable.interval(1500);

    const continua = new Subject();

    continua.next(true);

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe(() => {
        // console.log(this.progresso.status)
        // console.log(this.progresso.estado)
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100);

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido';
          // emitir evento do componente parent (home)
          this.atualizarTimeLine.emit();
          continua.next(false);
        }
      });
  }

  public preparaImagemUpload( evento: Event ): void {
    this.imagem = (<HTMLInputElement>evento.target).files;
  }

}
