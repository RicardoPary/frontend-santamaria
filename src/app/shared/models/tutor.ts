export class Tutor {
  name: String;
}

export class TutorFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  tutor: Tutor = new Tutor();
}
