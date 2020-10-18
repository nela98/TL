function abrir(event){
    let archivo = event.target.files[0];
    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            var lines = contenido.split('\n');
            for (i = 0; i<lines.length; i++){
              comprobar(lines[i].split(" "));
            }
            document.getElementById('contenido').innerText = contenido;
            document.getElementById('resultado').innerText = "Todo malo :D";
        }
        reader.readAsText(archivo);
    }else{
        document.getElementById("mensaje").innerText = "No ha seleccionado archivo"
    } 
}

window.addEventListener("load",()=>{
    document.getElementById("loader").addEventListener("change",abrir)    
})

/***************************************************************************************************
 * CONVERTIR LINEA DE TEXTO EN LIGA
 */
function convertirLiga(r){
  var tipo = ["char", "int", "float", "bit", "boolean"];
  var separador = [",", ";", '"'];
  var operador = ["=", "-", "+", "*", "/", ">", "<", "&&", "||"];

  r.array.forEach(element => {
    
  });
}

/***************************************************************************************************************** 
 * COMPROBAR QUE LA LINEA ESTÉ BIEN ESCRITA
*/
function comprobar(r){
  convertirLiga(r);
}

//console.log(convertirLiga(r));

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
  //const linkedlist = new LinkedList();

 
  /********************************************************************************************************************* */