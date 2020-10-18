function abrir(event){
    let archivo = event.target.files[0];
    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            var lines = contenido.split('\n');
            document.getElementById('contenido').innerText = contenido;
            document.getElementById('resultado').innerText = "Todo malo :D";
            for (i = 0; i<lines.length; i++){
              comprobar(lines[i].split(" "));
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
// Creación de listas

function Node (clase, value) {
    this.clase = clase
    this.value = value
    this.next = null
  }
  
  function LinkedList() {
    this.head = null
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
 * CONVERTIR LINEA DE TEXTO EN LIGA
 */

 var r = ["int", "agua", "=", '"', "a", '"', ";"];

 function convertirLista(r){
   var tipo = ["char", "int", "float", "bit", "boolean"];
   var variable = new RegExp("^[a-z]")
   var separador = [",", ";", '"'];
   var operador = ["=", "-", "+", "*", "/", ">", "<", "&&", "||"];
 
   var lista = new LinkedList();
 
   for(i = 0; i < r.length; i++){
     if(tipo.includes(r[i])){
       lista.append("Tipo", r[i]);
     }
     else if(variable.test(r[i])){
       lista.append("Variable", r[i]);
     }
     else if(separador.includes(r[i])){
       lista.append("Separador", r[i]);
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
 console.log(convertirLista(r));


 /***************************************************************************************************************** 
 * COMPROBAR QUE LA LINEA ESTÉ BIEN ESCRITA
*/
function comprobar(r){
  convertirLista(r);
}