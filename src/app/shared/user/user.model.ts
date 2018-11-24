import {Role} from '../model/role.model';

export class User {
  public id?: any;
  public login?: string;
  public firstName?: string;
  public lastName?: string;
  public nit?: string;
  public email?: string;
  public activated?: Boolean;
  public langKey?: string;
  public authorities?: any[];
  public createdBy?: string;
  public createdDate?: Date;
  public lastModifiedBy?: string;
  public lastModifiedDate?: Date;
  public password?: string;
  public nameToBill?: string;
  public imageUrl?: string;
  public companyImageUrl?: string;
  public companyName?: string;
  public passwordNotEncrypted: string;
  public role?: Role;

  constructor(id?: any,
              login?: string,
              firstName?: string,
              lastName?: string,
              nit?: string,
              email?: string,
              activated?: Boolean,
              langKey?: string,
              authorities?: any[],
              createdBy?: string,
              createdDate?: Date,
              lastModifiedBy?: string,
              lastModifiedDate?: Date,
              password?: string,
              nameToBill?: string,
              imageUrl?: string,
              companyImageUrl?: string,
              companyName?: string,
              passwordNotEncrypted?: string,
              role?: Role) {
    this.id = id ? id : null;
    this.login = login ? login : null;
    this.firstName = firstName ? firstName : null;
    this.lastName = lastName ? lastName : null;
    this.nit = nit ? nit : null;
    this.email = email ? email : null;
    this.activated = activated ? activated : false;
    this.langKey = langKey ? langKey : null;
    this.authorities = authorities ? authorities : null;
    this.createdBy = createdBy ? createdBy : null;
    this.createdDate = createdDate ? createdDate : null;
    this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
    this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
    this.password = password ? password : null;
    this.nameToBill = nameToBill ? nameToBill : null;
    this.imageUrl = imageUrl ? imageUrl : null;
    this.companyImageUrl = companyImageUrl ? companyImageUrl : null;
    this.companyName = companyName ? companyName : null;
    this.passwordNotEncrypted = passwordNotEncrypted ? passwordNotEncrypted : null;
    this.role = role ? role : new Role;
  }
}
