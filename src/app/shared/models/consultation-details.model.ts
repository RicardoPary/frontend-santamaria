export class ConsultationDetails {
  detail: String;
}

export class ConsultationDetailsFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  product: ConsultationDetails = new ConsultationDetails();
}
