const API_URL =
  "https://my-json-server.typicode.com/your-username/your-repo/vehicles";

export async function fetchVehicles() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Falha ao buscar veículos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    return [];
  }
}

export function getInitialVehicles() {
  return [
    {
      id: "1",
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2023,
      cor: "Prata",
      tipo: "Sedan",
      quilometragem: 0,
      portas: 4,
      imagem: "https://example.com/corolla.jpg",
    },
    {
      id: "2",
      marca: "Honda",
      modelo: "HR-V",
      ano: 2023,
      cor: "Preto",
      tipo: "SUV",
      quilometragem: 5000,
      portas: 4,
      imagem: "https://example.com/hrv.jpg",
    },
  ];
}
