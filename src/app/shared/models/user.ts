export class User {
  createdBy: String;
  createdDate: String;
  email: String;
  firstName: String;
  id: number;
  imageUrl: String;
  langKey: String;
  lastModifiedBy: String;
  lastModifiedDate: String;
  lastName: String;
  login: String;
}

export class UserFilter {
  size = 10;
  page = 0;
  sort = ['id,asc'];
  user: User = new User();
}
