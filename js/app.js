//Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Prototype que realiza la cotizacion del seguro con los datos
Seguro.prototype.cotizarSeguro = function () {
   
    /*
     1 = Americano incrementa el  valor en 1.15
     2 = Asiatico incremente el  valor en 1.05
     3 = Europeo incremente el  valor en 1.35
    */ 
    
    let cantidad;
    const base = 2000;
    


    switch(this.marca) {
           case '1':
           cantidad = base * 1.15;
           break;        


           case '2':
            cantidad = base * 1.05;
            break;



          case '3':
            cantidad = base * 1.35;
            break;


          default:
              break;

    }
     
    // Calcular por año
    const diferencia = new Date().getFullYear() - this.year;
   
    // Cada año que la diferencia es mayor, el costo va a reducirse un 3% 

   //cantidad -= (cantidad *(diferencia * .03));

   for(let i = 0; i <= diferencia; i++){
       if(i === diferencia){
        cantidad = cantidad;
       } else {
           
          cantidad = cantidad - (cantidad *.03);
       }
   }
  

    /*
    Si el seguro es basico se multiplica por un 30% mas
    Si el seguro es completo se multiplica por un 50% mas
    */

    if(this.tipo === 'basico'){
        //cantidad = cantidad + cantidad *.30;
        cantidad *= 1.30;
    }else{
        //cantidad = cantidad + cantidad * .50;
        cantidad*=1.50;
    }
    return cantidad;
};


///////////////////////////   UI PROTOTYPE    //////////////////////////////////////////////
function UI(){

}

// Prototype para llenar las opciones de los años
UI.prototype.llenarOpciones = () => {
      const max = new Date().getFullYear();
            min = max - 20;
       
      const selectYear = document.querySelector('#year');

      for(let i = max; i > min; i--){
          let option = document.createElement('option');
          option.value = i;
          option.textContent = i;
          selectYear.appendChild(option);
      } 

};


//Prototype mensaje de error
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');
    if(tipo  === 'error'){
        div.classList.add('error');
    }else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro'); 
    formulario.insertBefore(div, document.querySelector('#resultado')); // el primer parammetro en este cado 'div' es el nuevo nodo, 
    setTimeout(() =>{
       div.remove()
    },3000);                                                                    //la otra parte es el nodo donde se quiere insertar
    
}


UI.prototype.mostrarResultado = (total, seguro) => {

    const { marca, year, tipo } = seguro;
    let textoMarca;
    switch(marca) {
        case '1':
        textoMarca = 'Americano';
        break;

        case '2':
        textoMarca = 'Asiatico';
        break;
        case '3':
        textoMarca = 'Europeo';
        break;

        default:
            break;
    }
    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
// textContent cuando el elemento no tienen HTML. innerHTML cuando queremos agregar
    div.innerHTML = ` 
    <p class="header">Tu Resumen:</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca}</span></p>
    <p class="font-bold">Modelo: <span class="font-normal"> ${year}</span></p>
    <p class="font-bold">Cobertura: <span class="font-normal capitalize"> ${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal"> $ ${total}</span></p>
    `;
    
    const resultadoDiv = document.querySelector('#resultado');
    
    //Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none'; //Se esconde el spinner pero se muestra el resultado
      resultadoDiv.appendChild(div);
    },3000);
};

// Instanciar UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
      ui.llenarOpciones(); // Llena el SELECT con los años...
});

eventListener();
function eventListener() {
   const formulario = document.querySelector('#cotizar-seguro');
   formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e){
    e.preventDefault();

    //Leer la marca seleccionada
   const marca = document.querySelector('#marca').value;
   
    // Leer el modelo seleccionado
    const year = document.querySelector('#year').value;


    // Leer el tipo de cobertura
  
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === '' ){
         ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
          return;
        }

       
        ui.mostrarMensaje('Cotizando...', 'exito');

        //Ocultar las cotizaciones previas
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        //Instanciar el seguro
         const seguro = new Seguro(marca,year,tipo);
         const total = seguro.cotizarSeguro().toFixed(2);

        //Utilizara el prototype que va a cotizar

         ui.mostrarResultado(total, seguro);

   
}