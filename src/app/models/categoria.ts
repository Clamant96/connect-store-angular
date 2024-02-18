import { Console } from "./console";
import { Jogo } from "./jogo";
import { Usuario } from "./usuario"

export class Categoria {
  public id: number;
  public nome: string;
  public uri: string;
  public img: string;
  public consoles: Console[] = [];
  public jogos: Jogo[] = [];
  public usuarios: Usuario[] = [];
  public usuario_id: number;

}
