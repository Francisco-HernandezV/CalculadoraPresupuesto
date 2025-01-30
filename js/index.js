"use strict";
class GestorFinanzas {
    constructor() {
        this.transacciones = [];
        this.balance = 0;
    }
    agregarTransaccion(cantidad, descripcion, tipo) {
        if (cantidad <= 0 || descripcion.trim() === "" || isNaN(cantidad)) {
            alert("La cantidad debe ser un número positivo y la descripción no puede estar vacía.");
            return;
        }
        const nuevaTransaccion = {
            id: Date.now(),
            cantidad,
            descripcion,
            tipo
        };
        this.transacciones.push(nuevaTransaccion);
        this.actualizarBalance();
        this.mostrarTransacciones();
    }
    actualizarBalance() {
        const ingresos = this.transacciones.filter(t => t.tipo === "ingreso").reduce((acc, t) => acc + t.cantidad, 0);
        const gastos = this.transacciones.filter(t => t.tipo === "gasto").reduce((acc, t) => acc + t.cantidad, 0);
        this.balance = ingresos - gastos;
        document.getElementById("balance").innerText = `Balance: $${this.balance}`;
    }
    mostrarTransacciones() {
        const lista = document.getElementById("lista-transacciones");
        lista.innerHTML = "";
        this.transacciones.forEach(t => {
            const item = document.createElement("li");
            item.innerHTML = `<span class="descripcion">Descripción: ${t.descripcion}</span>
                        <span class="cantidad">Cantidad: $${t.cantidad}</span>
                        <span class="tipo">Tipo: ${t.tipo === "ingreso" ? "Ingreso" : "Gasto"}</span>`;
            item.className = t.tipo === "ingreso" ? "ingreso" : "gasto";
            lista.appendChild(item);
        });
    }
}
const gestor = new GestorFinanzas();
document.getElementById("btn-ingreso").addEventListener("click", () => {
    const cantidad = parseFloat(document.getElementById("monto").value);
    const descripcion = document.getElementById("descripcion").value;
    gestor.agregarTransaccion(cantidad, descripcion, "ingreso");
});
document.getElementById("btn-gasto").addEventListener("click", () => {
    const cantidad = parseFloat(document.getElementById("monto").value);
    const descripcion = document.getElementById("descripcion").value;
    gestor.agregarTransaccion(cantidad, descripcion, "gasto");
});
