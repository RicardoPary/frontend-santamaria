export class Curso {
  name: String;
}

export class CursoFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  curso: Curso = new Curso();
}
