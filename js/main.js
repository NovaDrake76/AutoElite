import Vehicle from "./Vehicle.js";
import { fetchVehicles, getInitialVehicles } from "./api.js";

class VehicleManager {
  constructor() {
    this.vehicles = [];
    this.loadVehicles();
    this.setupEventListeners();
  }

  async loadVehicles() {
    const storedVehicles = localStorage.getItem("vehicles");
    if (storedVehicles) {
      this.vehicles = JSON.parse(storedVehicles).map((v) =>
        Vehicle.fromJSON(v)
      );
    } else {
      const apiVehicles = await fetchVehicles();
      this.vehicles = (
        apiVehicles.length > 0 ? apiVehicles : getInitialVehicles()
      ).map((v) => Vehicle.fromJSON(v));
      this.saveToLocalStorage();
    }
    this.updateUI();
  }

  saveToLocalStorage() {
    localStorage.setItem("vehicles", JSON.stringify(this.vehicles));
  }

  setupEventListeners() {
    const form = document.getElementById("vehicle-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleVehicleSubmit(e));
    }
  }

  handleVehicleSubmit(e) {
    e.preventDefault();

    const vehicle = new Vehicle(
      document.getElementById("marca").value,
      document.getElementById("modelo").value,
      parseInt(document.getElementById("ano").value),
      document.getElementById("cor").value,
      document.getElementById("tipo").value,
      parseInt(document.getElementById("quilometragem").value),
      parseInt(document.getElementById("portas").value),
      document.getElementById("imagem").value
    );

    this.vehicles.push(vehicle);
    this.saveToLocalStorage();
    alert("Veículo cadastrado com sucesso!");
    e.target.reset();
  }

  deleteVehicle(id) {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
    this.saveToLocalStorage();
    this.updateUI();
  }

  updateUI() {
    const listElement = document.getElementById("vehicle-list");
    const deleteListElement = document.getElementById("vehicle-delete-list");

    if (listElement) {
      listElement.innerHTML = this.vehicles
        .map(
          (vehicle) => `
                <div class="col-md-4">
                    <div class="card vehicle-card">
                        <img src="${vehicle.imagem}" class="card-img-top" alt="${vehicle.modelo}">
                        <div class="card-body">
                            <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
                            <p class="card-text">
                                Ano: ${vehicle.ano}<br>
                                Cor: ${vehicle.cor}<br>
                                Tipo: ${vehicle.tipo}<br>
                                Quilometragem: ${vehicle.quilometragem} km<br>
                                Portas: ${vehicle.portas}
                            </p>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }

    if (deleteListElement) {
      deleteListElement.innerHTML = this.vehicles
        .map(
          (vehicle) => `
                <div class="col-md-4">
                    <div class="card vehicle-card">
                        <img src="${vehicle.imagem}" class="card-img-top" alt="${vehicle.modelo}">
                        <div class="card-body">
                            <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
                            <p class="card-text">
                                Ano: ${vehicle.ano}<br>
                                Cor: ${vehicle.cor}<br>
                                Tipo: ${vehicle.tipo}
                            </p>
                            <button class="btn btn-danger btn-delete" onclick="vehicleManager.deleteVehicle('${vehicle.id}')">
                                Excluir Veículo
                            </button>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }
}

window.vehicleManager = new VehicleManager();
