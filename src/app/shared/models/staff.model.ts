export class Staff {
  name: String;
}

export class StaffFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  staff: Staff = new Staff();
}
