import { Categoria } from "./categoria";
import { Console } from "./console";
import { Usuario } from "./usuario";

export class Jogo {
  public id: number;
  public nome: string;
  public img: string;
  public preco: string;
  public desconto: number;
  public categorias: Categoria;
  public consoles: Console[] = [];
  public usuarios: Usuario;
  public usuario_id: number;

}
