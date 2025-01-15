let vehicles = [];

async function loadVehicles() {
  const storedVehicles = localStorage.getItem("vehicles");
  if (storedVehicles) {
    vehicles = JSON.parse(storedVehicles);
  } else {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/NovaDrake76/AutoElite/db"
      );
      const data = await response.json();
      vehicles = data.vehicles;
      console.log("Veículos carregados com sucesso:", vehicles);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  }
  updateVehicleList();
  updateDeleteList();
}
function saveVehicles() {
  localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function createVehicleCard(vehicle, isDeletePage = false) {
  const card = document.createElement("div");
  card.className = "col-md-4 mb-4";

  const deleteButton = isDeletePage
    ? `<button class="btn btn-danger mt-2 w-100" onclick="deleteVehicle('${vehicle.id}')">
            Excluir Veículo
         </button>`
    : "";

  card.innerHTML = `
        <div class="card h-100">
            <img src="${vehicle.imagem}" class="card-img-top" alt="${vehicle.modelo}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
                <p class="card-text">
                    <strong>Ano:</strong> ${vehicle.ano}<br>
                    <strong>Cor:</strong> ${vehicle.cor}<br>
                    <strong>Tipo:</strong> ${vehicle.tipo}<br>
                    <strong>Quilometragem:</strong> ${vehicle.quilometragem} km<br>
                    <strong>Portas:</strong> ${vehicle.portas}
                </p>
                ${deleteButton}
            </div>
        </div>
    `;
  return card;
}

function updateVehicleList() {
  const vehicleList = document.getElementById("vehicle-list");
  if (vehicleList) {
    vehicleList.innerHTML = "";
    vehicles.forEach((vehicle) => {
      vehicleList.appendChild(createVehicleCard(vehicle));
    });
  }
}

function updateDeleteList() {
  const deleteList = document.getElementById("vehicle-delete-list");
  if (deleteList) {
    deleteList.innerHTML = "";
    vehicles.forEach((vehicle) => {
      deleteList.appendChild(createVehicleCard(vehicle, true));
    });
  }
}

class Vehicle {
  constructor(marca, modelo, ano, cor, tipo, quilometragem, portas, imagem) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;
    this.tipo = tipo;
    this.quilometragem = quilometragem;
    this.portas = portas;
    this.imagem = imagem;
  }
}

function registerVehicle(event) {
  event.preventDefault();

  const newVehicle = new Vehicle(
    document.getElementById("marca").value,
    document.getElementById("modelo").value,
    parseInt(document.getElementById("ano").value),
    document.getElementById("cor").value,
    document.getElementById("tipo").value,
    parseInt(document.getElementById("quilometragem").value),
    parseInt(document.getElementById("portas").value),
    document.getElementById("imagem").value
  );

  if (!validateVehicle(newVehicle)) {
    return;
  }

  vehicles.push(newVehicle);
  saveVehicles();

  event.target.reset();

  showAlert("Veículo cadastrado com sucesso!", "success");
}

function validateVehicle(vehicle) {
  if (
    !vehicle.marca ||
    !vehicle.modelo ||
    !vehicle.ano ||
    !vehicle.cor ||
    !vehicle.tipo ||
    !vehicle.quilometragem ||
    !vehicle.portas ||
    !vehicle.imagem
  ) {
    showAlert("Por favor, preencha todos os campos", "danger");
    return false;
  }

  if (vehicle.ano < 1900 || vehicle.ano > new Date().getFullYear() + 1) {
    showAlert("Ano inválido", "danger");
    return false;
  }

  if (vehicle.quilometragem < 0) {
    showAlert("Quilometragem inválida", "danger");
    return false;
  }

  if (vehicle.portas < 2 || vehicle.portas > 5) {
    showAlert("Número de portas inválido", "danger");
    return false;
  }

  return true;
}

function deleteVehicle(id) {
  if (confirm("Tem certeza que deseja excluir este veículo?")) {
    vehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    saveVehicles();
    updateDeleteList();
    showAlert("Veículo excluído com sucesso!", "success");
  }
}

function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`;
  alertDiv.style.zIndex = "1000";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  loadVehicles();

  const registrationForm = document.getElementById("vehicle-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", registerVehicle);
  }
});
