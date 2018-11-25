export class Category {
  name: String;
}

export class CategoryFilter {
  size = null;
  page = null;
  sort = ['id,desc'];
  category: Category = new Category();
}
