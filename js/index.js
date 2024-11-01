//API
let date_url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=';
let page = 1; //página dfault

//Ejecutar la función automáticamente
(function() {
    manejoJSON();
})();

//Botones anterior y siguiente página
document.getElementById('siguiente').addEventListener('click', function(){
    page++;
    manejoJSON();
});
document.getElementById('anterior').addEventListener('click', function(){
    page--;
    manejoJSON();
});


//Mostrar resultados
document.getElementById('buscar').addEventListener('click', function(){
    manejoJSON();
}); // solicitud de buscar

function manejoJSON(){
    let input = document.getElementById('input').value;
    let url = date_url + input + '&api_key=AxPtT7brgl3adndEsWDXfNQi0xZhg8xpsLY1osXa&page=' + page;
    //manejo del json
    console.log(url);
    fetch(url)
    .then(rta => rta.json())
    .then(data => mostrarResultados(data.photos));
}

function mostrarResultados(array_data){
    limpiarTabla();
    let tabla = document.getElementById('tbody'); // tabla a la que se le agregan los datos
    for (let i = 0; i < 25; i++){ // Recorre max 25 fotos
        let fila = document.createElement('tr'); // fila
        let id = document.createElement('td')
        id.textContent = array_data[i].id; // id
        let rovers = document.createElement('td')
        rovers.textContent = array_data[i].rover.name; // Rover Name
        let camera = document.createElement('td')
        camera.textContent = array_data[i].camera.name; // Camera
        let datails = document.createElement('button')
        datails.textContent = 'More';  // datails 

        //Mostrar detalles
        if (i == 0){ // Mostrar detalles de la primera foto
            mostrarDetalles(array_data[i].img_src, array_data[i].id, array_data[i].sol, array_data[i].earth_date);
        }
        datails.addEventListener('click', function(){
            mostrarDetalles(array_data[i].img_src, array_data[i].id, array_data[i].sol, array_data[i].earth_date);
        });

        //agregar datos a la tabla
        fila.appendChild(id);
        fila.appendChild(rovers);
        fila.appendChild(camera);
        fila.appendChild(datails);
        tabla.appendChild(fila);
    }
}

function mostrarDetalles(src, id, sol, date){
    document.getElementById('img').src = src;
    document.getElementById('id').textContent =  id;
    document.getElementById('sol').textContent = sol;
    document.getElementById('date').textContent = date;
}

function limpiarTabla(){
    let tabla = document.getElementById('tbody');
    tabla.innerHTML = '';
}


