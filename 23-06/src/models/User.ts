export class User {
  private id?: number;
  private nome: string;
  private email: string;
  private senha: string;

  constructor(nome: string, email: string, senha: string, id?: number) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
  public getId(): number | undefined {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public getNome(): string {
    return this.nome;
  }
  public setNome(nome: string): void {
    this.nome = nome;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public getSenha(): string {
    return this.email;
  }
  public setSenha(senha: string): void {
    this.senha = senha;
  }
}