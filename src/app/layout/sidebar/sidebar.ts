export class Sidebar {
  id: number;
  name: string;
  icon: string;
  sequence: number;
  url: string;
  collapse: boolean;
  subMenu: SubMenu[];

  constructor(id: number, name: string, icon: string, sequence: number, url: string, collapse: boolean, subMenu: SubMenu[]) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.sequence = sequence;
    this.url = url;
    this.collapse = collapse;
    this.subMenu = subMenu;
  }

  verifyObject(menus: Sidebar[]): boolean {
    let status = false;
    menus.map(
      item => {
        if (this.id === item.id &&
          this.name === item.name &&
          this.icon === item.icon &&
          this.sequence === item.sequence &&
          this.url === item.url) {
          status = true;
        }
      }
    );
    return status;
  }
}

export class SubMenu {
  id: number;
  name: string;
  icon: string;
  sequence: number;
  url: string;

  constructor(id: number, name: string, icon: string, sequence: number, url: string) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.sequence = sequence;
    this.url = url;
  }
}
