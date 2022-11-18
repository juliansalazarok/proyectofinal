
let arreglo_estadia = [];
let estadia_ls = "estadia"; // variable definida para evitar errores de sintaxis 

function calcular_estadia(){
    // Función por la cual se aloja la información, ingresada por el usuario, en el Local Storage
    let cant_noches = document.getElementById("noches");
    let alojamientos = document.getElementById("alojamientos");
    let cant_huespedes = document.getElementById("huespedes");

    let estadia = { noches:cant_noches.value , alojamiento:alojamientos.value , huespedes:cant_huespedes.value};

    arreglo_estadia.push(estadia);

    let arreglo_JSON = JSON.stringify(arreglo_estadia);
    localStorage.setItem(estadia_ls , arreglo_JSON);

    getEstadia();

}

function getEstadia(){
    // Función para recuperar correctamente los datos del Local Storage
    let recuperando = JSON.parse(localStorage.getItem(estadia_ls));
    
    if(recuperando){
        mostrar_estadia(recuperando[recuperando.length-1])

    }

}


function mostrar_estadia(recuperando){
    // Función para insertar en HTML, en forma de tabla, información recuperada
    if(recuperando.noches == 0 || recuperando.alojamiento == "Elija del menú" || recuperando.huespedes == 0){
        /// Uso de librería sweetalert, para el caso en que no se hayan ingresado todos los campos correctamente
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "FALTAN DATOS O NO SON VÁLIDOS!",
        color: "#dddae2",
        confirmButtonColor: "#dc3545",
        background: '#fff url(https://picsum.photos/id/210//520/420/?blur',
        footer: '<b>Revise y vuelva a enviar su consulta</b>',
        });

    }
    else{
        //Uso de librería Toastify, se aplica cuando los campos fueron bien completados
        Toastify({

            text:"Consulta ingresada",
            gravity:"bottom",
            style:{
                background:"linear-gradient(#dc3545,#b02a37)",
            }
        
        }).showToast();
        
        let fila = document.createElement("tr");
        fila.innerHTML = `<td>${recuperando.noches}</td>
                        <td>${recuperando.alojamiento}</td>
                        <td>${recuperando.huespedes}</td>`;
        
        let tbody = document.getElementById("tbody");
        tbody.append(fila);
    }

}


let btn_buscar = document.getElementById("btn_buscar");

btn_buscar.addEventListener("click" , calcular_estadia );


// Fetch
let api_key = "18c45a2145657d25a34b755d0a609782";


navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        
    
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&lang=es&units=metric&appid="+api_key)
    .then(response=>response.json())
    .then(data =>{

        let contenedor = document.getElementById("contenedor");
        let clima = document.createElement("div");
        let icon = data.weather[0].icon;
        clima.innerHTML = ` <p>País: ${data.sys.country}</p>
                            <p>Ciudad: ${data.name}</p>
                            <p>Temp: ${data.main.temp}</p>
                            <p>Estado: ${data.weather[0].description}</p>
                            <img src="icons/${icon}.png" width="40" heigth="20">
                            `;

        contenedor.append(clima);
    })
} 



