export class Patient {
  name: String;
}

export class PatientFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  patient: Patient = new Patient();
}
