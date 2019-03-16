export class Role {
  id: any;
  name: string;
  description: string;
  accesses: any;

  constructor(id?: any,
              name?: string,
              description?: string,
              accesses?: any) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.description = description ? description : null;
    this.accesses = accesses ? accesses : null;
  }
}
