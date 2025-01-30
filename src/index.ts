type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
  id: number;
  cantidad: number;
  descripcion: string;
  tipo: TipoTransaccion;
}

class GestorFinanzas {
  private transacciones: Transaccion[] = [];
  private balance: number = 0;

  agregarTransaccion(cantidad: number, descripcion: string, tipo: TipoTransaccion) {
    if (cantidad <= 0 || descripcion.trim() === "" || isNaN(cantidad)) {
      alert("La cantidad debe ser un número positivo y la descripción no puede estar vacía.");
      return;
    }
    
    const nuevaTransaccion: Transaccion = {
      id: Date.now(),
      cantidad,
      descripcion,
      tipo
    };
    
    this.transacciones.push(nuevaTransaccion);
    this.actualizarBalance();
    this.mostrarTransacciones();
  }

  private actualizarBalance() {
    const ingresos = this.transacciones.filter(t => t.tipo === "ingreso").reduce((acc, t) => acc + t.cantidad, 0);
    const gastos = this.transacciones.filter(t => t.tipo === "gasto").reduce((acc, t) => acc + t.cantidad, 0);
    this.balance = ingresos - gastos;
    document.getElementById("balance")!.innerText = `Balance: $${this.balance}`;
  }

  private mostrarTransacciones() {
    const lista = document.getElementById("lista-transacciones")!;
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

document.getElementById("btn-ingreso")!.addEventListener("click", () => {
  const cantidad = parseFloat((document.getElementById("monto") as HTMLInputElement).value);
  const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
  gestor.agregarTransaccion(cantidad, descripcion, "ingreso");
});

document.getElementById("btn-gasto")!.addEventListener("click", () => {
  const cantidad = parseFloat((document.getElementById("monto") as HTMLInputElement).value);
  const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
  gestor.agregarTransaccion(cantidad, descripcion, "gasto");
});
