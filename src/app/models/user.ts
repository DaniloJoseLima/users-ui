import { Location } from "./location";

export class User {
  public id?: string;
  public firstName!: string;
  public lastName!: string;
  public title?: string;
  public email!: string;
  public picture?: string;
  public gender!: string;
  public dateOfBirth?: any;
  public phone?: string;
  public location?: Location;
}
