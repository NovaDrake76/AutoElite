class Vehicle {
  constructor(marca, modelo, ano, cor, tipo, quilometragem, portas, imagem) {
    this.id = Date.now().toString();
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;
    this.tipo = tipo;
    this.quilometragem = quilometragem;
    this.portas = portas;
    this.imagem = imagem;
  }

  toJSON() {
    return {
      id: this.id,
      marca: this.marca,
      modelo: this.modelo,
      ano: this.ano,
      cor: this.cor,
      tipo: this.tipo,
      quilometragem: this.quilometragem,
      portas: this.portas,
      imagem: this.imagem,
    };
  }

  static fromJSON(json) {
    const vehicle = new Vehicle(
      json.marca,
      json.modelo,
      json.ano,
      json.cor,
      json.tipo,
      json.quilometragem,
      json.portas,
      json.imagem
    );
    vehicle.id = json.id;
    return vehicle;
  }
}

export default Vehicle;
