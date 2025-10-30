// Obtenemos los elementos del HTML por su ID
const form = document.querySelector("#formClima");   // Formulario de búsqueda
const resultado = document.querySelector("#resultado"); // Contenedor de resultados
const botonLimpiar = document.querySelector("#limpiar"); // Botón de limpiar resultados

// Evento que se ejecuta cuando se envía el formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que se recargue la página al enviar el formulario

  const ciudad = document.querySelector("#ciudad").value.trim(); // Toma el nombre de la ciudad
  const apiKey = "4915180a692a275ea07186284e1c6060"; // 🔑 Reemplaza con tu clave de OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  // Si el campo está vacío, muestra un mensaje y detiene el código
  if (ciudad === "") {
    alert("Por favor ingresa una ciudad.");
    return;
  }

  try {
    // Hace la consulta a la API del clima
    const res = await fetch(url);

    // Si la API no encuentra la ciudad, lanza un error
    if (!res.ok) throw new Error("Ciudad no encontrada");

    // Convierte la respuesta en formato JSON
    const data = await res.json();

    // Crea un nuevo bloque para mostrar los datos de esa ciudad
    const nuevoResultado = document.createElement("div");
    nuevoResultado.classList.add("ciudad");

    // Inserta la información del clima en HTML
    nuevoResultado.innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡️ Temperatura: ${data.main.temp}°C</p>
      <p>🌥️ Clima: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Icono del clima">
    `;

    // Agrega la nueva ciudad al final de la lista
    resultado.appendChild(nuevoResultado);

    // Limpia el campo de texto después de cada búsqueda
    form.reset();

  } catch (error) {
    // Si ocurre algún error, muestra el mensaje
    const mensaje = document.createElement("p");
    mensaje.textContent = `Error: ${error.message}`;
    resultado.appendChild(mensaje);
  }
});

// Evento para el botón "Limpiar resultados"
botonLimpiar.addEventListener("click", () => {
  resultado.innerHTML = ""; // Borra todo el contenido de resultados
});

