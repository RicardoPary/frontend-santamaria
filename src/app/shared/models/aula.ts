export class Aula {
  name: String;
}

export class AulaFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  aula: Aula = new Aula();
}
