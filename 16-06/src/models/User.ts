// models: representa os dados inseridos no banco de dados. para cada tabela, teremos uma classe
export class User {
  private id?: number;
  private email: string;
  private password: string;
  constructor(email: string, password: string, id?: number) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
  public getId(): number | undefined {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
}