function validarFormulario() {
            
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const checkbox = document.getElementById("checkbox").checked;
            const numeroInput = document.getElementById("numero");
            const resultadoFecha = document.getElementById("resultado-fecha");
  
            
            if (username === "" || username.length < 5 || username.length > 30) {
                alert("El mensaje no puede estar vacío y debe tener entre 5 a 30 caracteres.");
                return false; 
            }

            
            if (password.length <= 5) {
                alert("La contraseña debe tener más de 5 caracteres.");
                return false;
            }

            
            if (!checkbox) {
                alert("Debes aceptar los términos y condiciones.");
                return false;
            }

   
            if (checkbox && numeroInput) {
                const numeroValue = parseInt(numeroInput.value);
                if (isNaN(numeroValue) || numeroValue < 30 || numeroValue > 50) {
                    alert("El número debe estar entre 30 y 50.");
                    return false;
                }
            }
             resultadoFecha.textContent = "";
           if (checkbox && numeroInput) {
                const numeroValue = parseInt(numeroInput.value);
                if (isNaN(numeroValue) || numeroValue < 30 || numeroValue > 50) {
                    resultadoFecha.textContent = "El número debe estar entre 30 y 50.";
                    event.preventDefault(); // Evitar que se envíe el formulario
                    return false;
                }
            }
  
  
            return true;

        }


function mostrarInputsDinamicos() {
            const checkbox = document.getElementById("checkbox");
            const inputContainer = document.getElementById("input-container");

          
            inputContainer.innerHTML = "";

            if (checkbox.checked) {
               
                if (!document.getElementById("numero")) {
                    const nuevoInput = document.createElement("input");
                    nuevoInput.type = "number";
                    nuevoInput.id = "numero";
                    nuevoInput.name = "numero";
                    nuevoInput.min = "30";
                    nuevoInput.max = "50";
                    nuevoInput.placeholder = "Introduce un número entre 30 y 50";

                    const nuevoLabel = document.createElement("label");
                    nuevoLabel.htmlFor = "numero";
                    nuevoLabel.textContent = "Introduce un número entre 30 y 50:";

                    inputContainer.appendChild(nuevoLabel);
                    inputContainer.appendChild(document.createElement("br")); 
                    inputContainer.appendChild(nuevoInput);
                    inputContainer.appendChild(document.createElement("br")); 
                }

                
                if (!document.getElementById("fecha")) {
                    const nuevoInputFecha = document.createElement("input");
                    nuevoInputFecha.type = "date";
                    nuevoInputFecha.id = "fecha";
                    nuevoInputFecha.name = "fecha";

                    const nuevoLabelFecha = document.createElement("label");
                    nuevoLabelFecha.htmlFor = "fecha";
                    nuevoLabelFecha.textContent = "Selecciona una fecha:";

                    inputContainer.appendChild(nuevoLabelFecha);
                    inputContainer.appendChild(document.createElement("br"));
                    inputContainer.appendChild(nuevoInputFecha);
                    inputContainer.appendChild(document.createElement("br"));
                }

                // Crear el botón para validar la fecha
                const botonValidarFecha = document.createElement("button");
                botonValidarFecha.type = "button";
                botonValidarFecha.id = "boton-validar-fecha";
                botonValidarFecha.textContent = "Validar Fecha";
                botonValidarFecha.onclick = validarFecha;

                inputContainer.appendChild(botonValidarFecha);
            }
        }


 // Función para validar la fecha
        function validarFecha() {
            const fechaInput = document.getElementById("fecha");
            const resultadoFecha = document.getElementById("resultado-fecha");

           
            resultadoFecha.textContent = "";

            if (fechaInput) {
                const fechaSeleccionada = fechaInput.value;
                const fechaActual = new Date();
                const fechaIngresada = new Date(fechaSeleccionada);

                // Comparar solo la parte de la fecha, sin considerar la hora
                fechaActual.setHours(0, 0, 0, 0);
                fechaIngresada.setHours(0, 0, 0, 0);

                if (fechaIngresada < fechaActual) {
                    resultadoFecha.textContent = "La fecha seleccionada ya pasó.";
                   
                } else if (fechaIngresada > fechaActual) {
                    resultadoFecha.textContent = "La fecha seleccionada es futura.";
                } else {
                    resultadoFecha.textContent = "¡La fecha seleccionada es hoy!";
                }
            } else {
                resultadoFecha.textContent = "No se ha seleccionado una fecha.";
            }
        }

 window.onload=function(){
   var container=document.getElementById('loader-container');
   
   container.style.visibility='hidden';
   container.style.opacity= '0';
   
 }

 fetch('header.html') 
.then(response => response.text()) 
.then(data => { 
    document.getElementById('header').innerHTML = data; 
});
     

fetch('footer.html') 
.then(response => response.text()) 
.then(data => { 
    document.getElementById('footer').innerHTML = data; 
});
     
 // Mostrar el popup después de 10 segundos
    setTimeout(function() {
      document.getElementById("popup").style.display = "flex";
    }, 10000); // 10 segundos = 10000 milisegundos

    // Función para cerrar el popup
    function cerrarPopup() {
      document.getElementById("popup").style.display = "none";
    }

    let cookiesAceptadas = false;

    // Evento de scroll
    window.addEventListener('scroll', function() {
      if (!cookiesAceptadas) {
        
        const alturaPagina = document.documentElement.scrollHeight;
        const mitadPagina = alturaPagina / 2;

        if (window.scrollY > mitadPagina) {
          mostrarPopup();
        }
      }
    });

    // Función para mostrar el popup de cookies


    function mostrarPopup() {
      document.getElementById('cookie-popup').style.display = 'flex';
      bloquearScroll(); // Bloquear scroll cuando aparece el popup
    }

    // Función para bloquear el scroll
    function bloquearScroll() {
      document.body.classList.add('scroll-blocked');
    }

    
    function aceptarCookies() {
      cookiesAceptadas = true;
      document.getElementById('cookie-popup').style.display = 'none';
      document.body.classList.remove('scroll-blocked'); // Quitar el bloqueo de scroll
    }

//Productos

document.addEventListener('DOMContentLoaded', function() {
    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(productos => {
            const contenedor = document.getElementById('productosContainer');

            
            productos.forEach(producto => {
                // Solo mostrar productos con stock mayor a 0
                if (producto.stock > 0) {
                    
                    const card = document.createElement('div');
                    card.className = 'card';

                    
                    if (producto.imagen) {
                        const imagen = document.createElement('img');
                        imagen.src = producto.imagen;
                        imagen.alt = producto.nombre;
                        card.appendChild(imagen);
                    }

                   
                    const nombre = document.createElement('h3');
                    nombre.textContent = producto.nombre;
                    card.appendChild(nombre);

                    
                    const descripcion = document.createElement('p');
                    descripcion.textContent = producto.descripcion;
                    card.appendChild(descripcion);

                    
                    const precio = document.createElement('p');
                    precio.className = 'precio';
                    precio.textContent = `$${producto.precio}`;
                    card.appendChild(precio);

                    
                    const stock = document.createElement('p');
                    stock.className = 'stock';
                    stock.textContent = `Stock: ${producto.stock}`;
                    card.appendChild(stock);

                    
                    contenedor.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la petición Fetch:', error);
        });
});


//Letras de Canciones

function cargaLetra(event) {
    event.preventDefault();
    const cancionName= document.getElementById('cancionName').value;
    
    fetch(`https://api.lyrics.ovh/v1/Los Auténticos Decadentes/${cancionName}`)
      .then(response => response.json())
      .then(data => {
        if(data.cod == 404){
          document.getElementById('cancion').innerHTML = `<h2>No se encontró la cancion</h2>`;
          return;
        }
        const cancionDiv = document.getElementById('cancion');
        const { lyrics } = data;
        console.log(data);
        cancionDiv.innerHTML = `${lyrics}`;
    })
      .catch(error => console.error('Error:', error));
  }


