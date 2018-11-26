export class ConsultationDetails {
  detail: string;
  id: number;
  idConsultation: number;
  name: string;
  quantity: 0;
  staff: Staff = new Staff();
  supply: Supply = new Supply();
}

export class Staff {
  address: string;
  birthdate: string;
  ci: number;
  email: string;
  firstName: string;
  gender: string;
  id: 0;
  lastName: string;
  nationality: string;
  phone: number;
  profession: string;
  speciality: string;
}

export class Category {
  description: string;
  id: 0;
  imageCache: string;
  imageName: string;
  imageUrl: string;
  name: string;
  type: string;
}

export class Supply {
  barcode: string;
  category: Category = new Category();
  description: string;
  discount: number;
  id: number;
  imageCache: string;
  imageName: string;
  inventory: true;
  marke: string;
  name: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  type: string;
  urlImage: string;
  wholesalePrice: number;
}


export class Invoice {
  date: string;
  detail: string;
  diagnosis: string;
  id: number;
  patient: Patient = new Patient();
  staff: Staff = new Staff();
  typeAttention: TypeAttention = new TypeAttention();
  consultationDetails: ConsultationDetails [] = [];
}

export class Patient {
  address: string;
  birthdate: string;
  ci: number;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  nationality: string;
  phone: number;
}

export class TypeAttention {
  description: string;
  id: number;
  name: string;
}
