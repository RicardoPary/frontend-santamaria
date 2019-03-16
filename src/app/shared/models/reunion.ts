export class Reunion {
  name: String;
}

export class ReunionFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  reunion: Reunion = new Reunion();
}
