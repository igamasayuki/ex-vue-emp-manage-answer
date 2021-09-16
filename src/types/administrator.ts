/**
 * 管理者情報を表すクラス.
 *
 * @remarks
 * 管理者情報を表します。
 */
export class Administrator {
  constructor(
    // ID
    private _id: number,
    // 名前
    private _name: string,
    // メールアドレス
    private _mailAddress: string,
    // パスワード
    private _password: string
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

  public get mailAddress(): string {
    return this._mailAddress;
  }

  public set mailAddress(mailAddress: string) {
    this._mailAddress = mailAddress;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }
}
