/**
 * 従業員情報を表すクラス.
 *
 * @remarks
 * 従業員情報を表します。
 */
export class Employee {
  constructor(
    // ID
    private _id: number,
    // 名前
    private _name: string,
    // 画像
    private _image: string,
    // 性別
    private _gender: string,
    // 入社日
    private _hireDate: Date,
    // メールアドレス
    private _mailAddress: string,
    // 郵便番号
    private _zipCode: string,
    // 住所
    private _address: string,
    // 電話番号
    private _telephone: string,
    // 給料
    private _salary: number,
    // 特性
    private _characteristics: string,
    // 扶養人数
    private _dependentsCount: number
  ) {}
  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get image(): string {
    return this._image;
  }

  public set image(image: string) {
    this._image = image;
  }

  public get gender(): string {
    return this._gender;
  }

  public set gender(gender: string) {
    this._gender = gender;
  }

  public get hireDate(): Date {
    return this._hireDate;
  }

  public set hireDate(hireDate: Date) {
    this._hireDate = hireDate;
  }

  public get mailAddress(): string {
    return this._mailAddress;
  }

  public set mailAddress(mailAddress: string) {
    this._mailAddress = mailAddress;
  }

  public get zipCode(): string {
    return this._zipCode;
  }

  public set zipCode(zipCode: string) {
    this._zipCode = zipCode;
  }

  public get address(): string {
    return this._address;
  }

  public set address(address: string) {
    this._address = address;
  }

  public get telephone(): string {
    return this._telephone;
  }

  public set telephone(telephone: string) {
    this._telephone = telephone;
  }

  public get salary(): number {
    return this._salary;
  }

  public set salary(salary: number) {
    this._salary = salary;
  }

  public get characteristics(): string {
    return this._characteristics;
  }

  public set characteristics(characteristics: string) {
    this._characteristics = characteristics;
  }

  public get dependentsCount(): number {
    return this._dependentsCount;
  }

  public set dependentsCount(dependentsCount: number) {
    this._dependentsCount = dependentsCount;
  }
}
