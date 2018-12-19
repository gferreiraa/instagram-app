import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Autenticacao } from './../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro');
    console.log('Feitoooo');
  }

  public autenticar(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    );
  }

}
