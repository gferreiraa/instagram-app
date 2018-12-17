import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro');
    console.log('Feitoooo');
  }

  public autenticar(): void {
    console.log('Dados recuperados', this.formulario);
  }

}
