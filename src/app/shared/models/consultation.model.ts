export class Consultation {
  detail: String;
}

export class ConsultationFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  product: Consultation = new Consultation();
}
