function abrir(event){
  let archivo = event.target.files[0];
  if(archivo){
      let reader = new FileReader();
      reader.onload = function(e){
          let contenido = e.target.result;
          var lines = contenido.split('\n');
          document.getElementById('contenido').innerText = contenido;
          document.getElementById('resultado').innerText = "Revisa la consola";
          for (i = 0; i<lines.length; i++){
            linea = lines[i].split(" ")
            console.log(linea)
            comprobar(linea)
          }
      }
      reader.readAsText(archivo);
  }else{
      document.getElementById("mensaje").innerText = "No ha seleccionado archivo"
  } 
}

window.addEventListener("load",()=>{
  document.getElementById("loader").addEventListener("change",abrir)    
})


/********************************************************************************************************* */
// LISTAS

function Node (clase, value) {
  this.clase = clase
  this.value = value
  this.next = null
}

function LinkedList() {
  this.head = null
}

Node.prototype.getValue = function(){
  return this.value;
}

Node.prototype.getClass = function(){
  return this.clase;
}

Node.prototype.getNext = function(){
    return this.next;
}

LinkedList.prototype.append = function(clase,value, current = this.head){
  if(this.head === null){
    return this.head = new Node(clase,value)
  }
  if(current.next === null){
    return current.next = new Node(clase,value)
  }
  this.append(clase,value, current.next)
}

LinkedList.prototype.prepend = function(clase,value){
  if(this.head === null){
    return this.head = new Node(clase,value)
  }
  let newNode = new Node(clase,value)
  newNode.next = this.head
  this.head = newNode
}

LinkedList.prototype.removeNode = function (value, current = this.head) {
  if(this.head === null){ // no head
    return false
  }

  if (this.head.value === value){
    return this.head = this.head.next
  }

  if(current.next !== null){
    if(current.next.value === value){
      return current.next = current.next.next
    }
    this.removeNode(value, current.next)
  }
  return false // no match found
}

LinkedList.prototype.findNode = function (value, current = this.head){
  if(this.head === null) {
    return false
  }

  if (current !== null) {
    if (current.value === value){
      return true
    } else {
      return this.findNode(value, current.next)
    }
  }
  return false
}

LinkedList.prototype.peekNode = function (value) {
  if(this.head === null) {
    return false
  }
  return this.head
}

LinkedList.prototype.length = function (current = this.head, acum = 1) {
  if(this.head === null){
    return 0
  }
  if (current.next !== null){
    return this.length(current.next, acum = acum + 1)
  }
  return acum
}

LinkedList.prototype.convertirEnArray = function(node){
  let listaNueva
  while(node=!null){
    listaNueva.push(node.getValue())
    node = node.getNext();
  }
  return listaNueva
}

/*********************************************************************************************
* CREACIÓN DE PILAS
*/

class Stack {
constructor(){
  this.stack = [];
}

push(element){
  this.stack.push(element);
  return this.stack;
}

pop(){
  return this.stack.pop();
}

peek(){
  return this.stack[this.stack.length - 1];
}

size(){
  return this.stack.length;
}
isEmpty(){
  if(this.stack.length == 0){
    return true;
  }
}
print(){
  console.log(this.stack);
}
}

/**********************************************************************************************
* COMPROBAR SI ES UN INT O UN FLOAT
*/

function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}


/***************************************************************************************************
* CONVERTIR LINEA DE TEXTO EN LISTA
*/

var r = ["int", "b",",", "c",";","a"];

var tipo = ["char", "int", "float", "bit", "boolean"];
var variable = new RegExp("^[0-9a-zA-Z]+$");
var separador = [",", ";", '"'];
var cadena = new RegExp("[A-Za-z0-9]");
var operador = ["=", "-", "+", "*", "/", ">", "<", "&&", "||"];

function convertirLista(r){
  var lista = new LinkedList();
  for(i = 0; i < r.length; i++){
    if(tipo.includes(r[i])){
      lista.append("Tipo", r[i]);
      console.log(Object.values(lista));
    }
    else if(variable.test(r[i])){
      lista.append("Variable", r[i]);
    }
    else if(separador.includes(r[i])){
      lista.append("Separador", r[i]);
    }
    else if(cadena.test(r[i])){
      lista.append("Cadena", r[i]);
    }
    else if(r[i].isInt || r[i].isFloat){
      lista.append("Constante", r[i]);
    }
    else if(operador.includes(r[i])){
      lista.append("Operador", r[i])
    }
  }
  return lista;
}
//let nueva = (convertirLista(r));
//console.log(nueva);

/******************************************************************************************************************
* VERIFICAR PARENTESIS
*/

function verificarParentesis(r){
  const pila = new Stack();
  let balanceados = true;
  var i = 0;
  while(i < r.length && balanceados){
    let simbolo = r[i];
    if (simbolo == "("){
      pila.push(simbolo);
    }
    else{
      if(pila.isEmpty()){
        balanceados = false;
      }
      else{
        pila.pop();
      }
    }
    i++;
  }
  if(balanceados && pila.isEmpty()){
    return true;
  }
  else{
    return false;
  }
}

/******************************************************************************************************************
* ESTADOS
*/

function estadoS0(lista){
  let listaAux = new LinkedList();
  let aux = new Node();
  let valor, clase;
  aux = lista.peekNode();
  let long = lista.length();
  for(let i=0; i<long; i++){
    clase = aux.getClass();
    switch (clase){
      //ESTADO S0
      case "Tipo": 
        aux = aux.getNext();
        if(aux != null && aux.getClass() == "Variable"){
          aux = aux.getNext();
          if(aux != null && (aux.getClass() == "Separador") && aux.getValue()==";"){
            if(aux.next==null){
              break;
            }else{
              console.log("Error, luego de ; no deben haber caracteres")
              break;
            }
          }else if(aux != null && (aux.getClass() == "Separador") && aux.getValue()==","){
            while(aux != null){
              listaAux.append(aux.getClass(),aux.getValue());
              aux = aux.getNext();
            }
            estadoS0(listaAux);
            break;
          }else if(aux != null && aux.getClass() == "Operador"){
            if(aux.getValue() == "+" || aux.getValue() == "-"){
              while(aux != null){
                listaAux.append(aux.getClass(), aux.getValue());
                aux = aux.getNext();
              }
              estadoS0(listaAux); 
              break;
            }else{
              console.log("Error, el separador no se encuentra en la posición correcta.")
              break;
            }
          }else if(aux.next == null){
            console.log("Error, falta ;");
            break;
          }
        } break;
      //ESTADO S1 Y ESTADO S3  
      case "Separador":
        //ESTADO S1
        if (aux != null && aux.getValue() == ","){
          console.log(aux);
          aux = aux.getNext();
          console.log(aux.getValue());
          if(aux != null && aux.getClass() == "Variable" ){
            console.log(aux.getValue());
            aux = aux.getNext();
            console.log(aux);
            if(aux != null && aux.getValue() == ","){
              console.log(aux.getValue());
              while(aux != null){
                listaAux.append(aux.getClass(), aux.getValue());
                aux = aux.getNext();
              }
              console.log(listaAux);
              estadoS0(listaAux); 
              console.log(listaAux);
              break;
            }
            else if(aux.getValue() == ";"){
              if(aux.getNext() == null){
                console.log("Todo correcto")
                break;
              }else{
                console.log("Error, luego de ; no pueden haber caracteres");
                break;
              }
            }else if(aux != null && aux.getClass() == "Operador"){
              if(aux.getValue() == "+" || aux.getValue() == "-"){
                while(aux != null){
                  listaAux.append(aux.getClass(), aux.getValue());
                  aux = aux.getNext();
                }
                estadoS0(listaAux); 
                break;
              }else{
                console.log("Error, el separador no se encuentra en la posición correcta.");
                break;
              }
            }else if(aux != null && aux.getClass() == "Tipo"){
              console.log(`Error, no puede haber un tipo ${aux.getValue()} después de una variable`);
              break;
            }else if(aux != null && aux.getClass() == "Cadena"){
              console.log("Error, no puede haber una cadena después de una variable.");
              break;
            }else{
              console.log("Error, falta ;");
              break;
            }
          }else if(aux == null){
            console.log(`Error, debe ir el nombre de la variable.`);
            break;
          }
        }
        //ESTADO S3
        else if(aux != null && aux.getValue() == '"'){
          aux = aux.getNext();
          if(aux != null && aux.getClass() == "Cadena"){
            aux = aux.getNext();
            if(aux != null && aux.getValue() == '"'){
              aux = aux.getNext();
              if(aux != null && aux.getClass() == "Operador"){
                aux = aux.getNext();
                if(aux.getValue() == "true" || aux.getValue() == "false"){
                  while(aux != null){
                    listaAux.append(aux.getClass(), aux.getValue());
                    aux = aux.getNext();
                  }
                  estadoS0(listaAux);
                  break;
                }else if(aux != null && aux.getClass() == "Cadena"){ //Puede que tengamos que crear un array de numeros.
                  while(aux != null){
                    listaAux.append(aux.getClass(), aux.getValue());
                    aux = aux.getNext();
                  }
                  estadoS0(listaAux);
                  break;
                }else if(aux != null && aux.getValue() == ";"){
                  if(aux.next == null){
                    break;
                  }else{
                    console.log("Error, despues del ';' no pueden haber más caracteres");
                    break;
                  }
                }else{
                  console.log(`Error, no puede haber un/a ${aux.getClass()} después de un operador`);
                  break;
                }
              }else{
                console.log(`Error, no puede haber un/a ${aux.getClass()} después de " `);
                break;
              }
            }else{
              console.log('Error, falta una "');
              break;
            }
          }
        }break;
      
      case "Operador":
        //ESTADO S2
        if(aux.getValue() != "+" || aux.getValue() != "-" || aux.getValue() != "="){
          console.log("Error, el operador no está permitido en esta posición.");
          break;
        }
        aux = aux.getNext();
        if(aux.getValue() == "+" || aux.getValue() == "-"){
          aux = aux.getNext();
          if(aux.getValue() == "="){
            aux = aux.getNext();
            if(aux.getValue() == '"'){
              while(aux != null){
                listaAux.append(aux.getClass(), aux.getValue());
                aux = aux.getNext();
              }
              estadoS0(listaAux); 
              break;
            }else if(aux.getValue() == "true" || aux.getValue() == "false"){ //¿SOBRA?
              while(aux != null){
                listaAux.append(aux.getClass(), aux.getValue());
                aux = aux.getNext();
              }
              estadoS0(listaAux);
              break;
            }else if(aux.getClass() == "Cadena"){ // I think we should change this for a variable.
              while(aux != null){
                listaAux.append(aux.getClass(), aux.getValue());
                aux = aux.getNext();
              }
              estadoS0(listaAux);
              break;
            }else{
              console.log(`Error, ${aux.getValue()} no está permitido después de un =`);
              break;
            }
          }
          else{
            console.log(`Error, no puede haber un/a ${aux.getClass()} después de un + `);
            break;
          }
        }else if(aux.getValue() == "="){
          aux = aux.getNext();
          if(aux.getValue() == '"'){
            while(aux != null){
              listaAux.append(aux.getClass(), aux.getValue());
              aux = aux.getNext();
            }
            estadoS0(listaAux); 
            break;
          }else if(aux.getValue() == "true" || aux.getValue() == "false"){ // innecesario
            while(aux != null){
              listaAux.append(aux.getClass(), aux.getValue());
              aux = aux.getNext();
            }
            estadoS0(listaAux);
            break;
          }else if(aux.getClass() == "Cadena"){ //Variable
            while(aux != null){
              listaAux.append(aux.getClass(), aux.getValue());
              aux = aux.getNext();
            }
            estadoS0(listaAux);
            break;
          }
        }else{
          console.log(`Error, ${aux.getValue()} no está permitido despuése de un =`);
          break;
        }break;

      case "Cadena":
        //ESTADO S4
        if(aux.getValue() == "true" || aux.getValue() == "false"){
          aux = aux.getNext();
          if(aux.getValue() == ";"){
            if(aux.next == null){
              break;
            }else{
              console.log("Error, despues del ';' no pueden haber más caracteres");
              break;
            }
          }//Falta considerar otros estados
          else{
            console.log(`Error,${aux.getClass()} no está permitida en esa posición.`);
            break;
          }
        }
        //ESTADO S5 may be wrong, acá solo se aceptan números.
        //Buscar expresión regular que acepte números.
        aux = aux.getNext();
        if(aux.getValue() == ";"){
          if(aux.next == null){
            break;
          }else{
            console.log("Error, despues del ';' no pueden haber más caracteres");
            break;
          }
        }
      //ESTADO S5
      case "Variable":
        aux = aux.getNext();
        if(aux.getClass() == "Operador"){
          aux = aux.getNext();
          if(aux.getClass() == "Variable"){
            while(aux != null){
              listaAux.append(aux.getClass(), aux.getValue());
              aux = aux.getNext();
            }
            estadoS0(listaAux);
            break;
          }else if(aux.getClass()  == "Cadena"){
            while(aux != null){
              listaAux.append(aux.getClass(), aux.getValue());
              aux = aux.getNext();
            }
            estadoS0(listaAux);
            break;
          }else if(aux.getValue() == '"'){
            while(aux != null){
              listaAux.append(aux.getClass(), aux.getValue());
              aux = aux.getNext();
            }
            estadoS0(listaAux);
            break;
          }else{
            console.log(`Error, ${aux.getValue()} no es permitido después de un operador.`);
            break;
          }
        }else if(aux.getValue() == ";"){
          if(aux.next == null){
            break;
          }else{
            console.log("Error, despues del ';' no pueden haber más caracteres");
            break;
          }
        }else{
          console.log(`Error, ${Aux.getClass()} no está permitido después de una variable`);
          break;
        }
        


    }       
    
  }
}
//console.log(estadoS0(nueva));
/*

function estadoS0(lista){
  let aux = new Node();
  let valor;
  aux = lista.peekNode();
  let long = lista.length();
  for(i=0; i<long; i++){
    valor = aux.getValue();
    aux = aux.getNext(); 
  }
  return valor
}


/***************************************************************************************************************** 
* COMPROBAR QUE LA LINEA ESTÉ BIEN ESCRITA
*/

function comprobar(listaC){
  var listaComp = new LinkedList();
  listaComp = convertirLista(listaC);
  //return estadoS0(listaComp); 
  //console.log(listaComp)
  console.log(estadoS0(listaComp));
}
