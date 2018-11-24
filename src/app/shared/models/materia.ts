export class Materia {
  name: String;
}

export class MateriaFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  materia: Materia = new Materia();
}
