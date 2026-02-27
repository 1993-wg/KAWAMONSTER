import { supabase } from "./supabase.js";

console.log("🔥 main.js cargado");

document.addEventListener("DOMContentLoaded", async () => {
  alert("JS funcionando");
  const contenedor = document.getElementById("productos");

  if (!contenedor) {
    console.error("❌ Contenedor #productos no encontrado");
    return;
  }

  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true);

  if (error) {
    console.error("❌ Error Supabase:", error);
    return;
  }

  console.log("✅ Productos desde Supabase:", data);

  contenedor.innerHTML = "";

  if (data.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles</p>";
    return;
  }

  data.forEach(producto => {
    contenedor.innerHTML += `
      <div class="product">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="price">$${producto.precio.toLocaleString("es-CO")}</p>
        <a 
          class="btn"
          target="_blank"
          href="https://wa.me/573008310294?text=Hola,%20me%20interesa%20el%20producto:%20${producto.nombre}%20Precio:%20$${producto.precio}"
        >
          Comprar por WhatsApp
        </a>
      </div>
    `;
  });

});