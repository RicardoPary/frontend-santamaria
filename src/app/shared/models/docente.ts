export class Docente {
  name: String;
}

export class DocenteFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  docente: Docente = new Docente();
}
