
const contenedor=document.querySelector(".showName")
const contenedor2=document.querySelector(".showPrice")
const contenedor3=document.querySelector(".showCantity")
const contenedor4=document.querySelector(".showTotal")


const boton2=document.querySelector(".borrar2")
boton2.addEventListener("click",()=>{
    alert("gracias por su compra")
    for(let i=0;i<100;i++){
        borrarObjetoName(i);
        borrarObjetoPrice(i);
        borrarObjetoCantity(i);
        borrarObjetoTotal(i);
        location.reload();
    }
})

const IDBRequest= indexedDB.open("Database",1);  // Solicitud ,base de datos si existe la abre si no la crea

            IDBRequest.addEventListener("upgradeneeded",()=>{  // en caso que no esté creada la crea 
                const db = IDBRequest.result; //base de datos
                db.createObjectStore("nombres",{     //almacen de objetos 
                    autoIncrement: true  //autoincremente la base de datos es como un ID 
                })
                  db.createObjectStore("cantidad",{     //almacen de objetos 
                    autoIncrement: true  //autoincremente la base de datos es como un ID 
                })
                db.createObjectStore("precios",{     //almacen de objetos 
                    autoIncrement: true  //autoincremente la base de datos es como un ID 
                })
                db.createObjectStore("total",{     //almacen de objetos 
                    autoIncrement: true  //autoincremente la base de datos es como un ID 
                })
            })

            IDBRequest.addEventListener("success",()=>{ // si todo salio bien
                console.log("todo salio bien")

                mostrarResultado(); // cuando el proceso finalice 
               

            })

            IDBRequest.addEventListener("error",()=>{ // si depronto sale un error
                console.log("todo salio mal")
            })


            function addObjeto(objeto,a){
                const IDBData = getIDBData("readwrite");
                const IDBData2 = getIDBDataPrice("readwrite");
                const IDBData3 = getIDBDatacantity("readwrite");
                const IDBData4 = getIDBDataTotal("readwrite");
                if(a==="0"){
                    IDBData[0].add(objeto)  //objeto que se quiere agregar
                    console.log(IDBData)
                }
                if(a==="1"){
                    IDBData2[0].add(objeto) 
                    console.log(IDBData2)
                }
               if(a==="2"){
                IDBData3[0].add(objeto) 
                console.log(IDBData3)
               }
               if(a==="3"){
                IDBData4[0].add(objeto) 
                console.log(IDBData4)
               }
                else{
               }
                
               
               // IDBData[1].addEventListener("complete",()=>{
              //      console.log("objeto agregado correctamente")
              //  })
            }


            const getIDBData = mode=>{
                const db=IDBRequest.result;
                const IDBtransaction=db.transaction("nombres",mode) //readwrite para escribir, modificar, eliminarlos , readonly para leer
                const objectStore=IDBtransaction.objectStore("nombres")
               // console.log(objectStore)
                return [objectStore,IDBtransaction];
                
            }
            const getIDBDataPrice = mode=>{
                const db=IDBRequest.result;
                const IDBtransaction=db.transaction("precios",mode)
                const objectStore=IDBtransaction.objectStore("precios")
                return [objectStore,IDBtransaction];
            }
            const getIDBDatacantity = mode=>{
                const db=IDBRequest.result;
                const IDBtransaction=db.transaction("cantidad",mode)
                const objectStore=IDBtransaction.objectStore("cantidad")
                return [objectStore,IDBtransaction];
            }
            const getIDBDataTotal = mode=>{
                const db=IDBRequest.result;
                const IDBtransaction=db.transaction("total",mode)
                const objectStore=IDBtransaction.objectStore("total")
                return [objectStore,IDBtransaction];
            }



            const leerObjetosName = ()=>{   //para leer leerObjetos()

               
                const IDBData = getIDBData("readonly");
                const cursor=IDBData[0].openCursor();
                const fragment = document.createDocumentFragment();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        const nombres = document.createElement('P')
                       nombres.textContent = cursor.result.value.nombre;
                     
                        fragment.appendChild(nombres);
                       // console.log(nombres)
                    
                        cursor.result.continue() // para seguir leyendo 
                   
                
                    }else {
                        console.log("todos los datos fueron leidos")
                        contenedor.appendChild(fragment)
                        
                        
                    }
                } )

              
                return fragment
            }

            const leerObjetosPrice = ()=>{   //para leer leerObjetos()
                const IDBData = getIDBDataPrice("readonly");
                const cursor=IDBData[0].openCursor();
                const fragment=document.createDocumentFragment();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        const nombres=document.createElement('P')
                        let numeroToString=cursor.result.value.precioUnitario;
                        let string = String(numeroToString);
                    
                        nombres.textContent=string;
                        fragment.appendChild(nombres);
                       
                      
                       
                        cursor.result.continue() // para seguir leyendo 
                
                    }else{

                         console.log("todos los datos fueron leidos")
                         contenedor2.appendChild(fragment)
                    }

                })
            }

            const leerObjetosCantity = ()=>{   //para leer leerObjetos()
                const IDBData = getIDBDatacantity("readonly");
                const cursor=IDBData[0].openCursor();
                const fragment=document.createDocumentFragment();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        const nombres=document.createElement('P')
                        
                        nombres.textContent=cursor.result.value.cantidad
                        fragment.appendChild(nombres);
                        cursor.result.continue() // para seguir leyendo 
                
                    }else{

                        contenedor3.appendChild(fragment)
                        console.log("todos los datos fueron leidos")
                    } 
                })

               
            }

            const leerObjetosTotal = ()=>{   //para leer leerObjetos()
                const IDBData = getIDBDataTotal("readonly");
                const cursor=IDBData[0].openCursor();
                const fragment=document.createDocumentFragment();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        const nombres=document.createElement('P')
                        nombres.textContent=cursor.result.value.precioTotal
                        fragment.appendChild(nombres);
                        cursor.result.continue() // para seguir leyendo 
                
                    }else {
                        contenedor4.appendChild(fragment)
                        console.log("todos los datos fueron leidos")}
                })
            }


            const borrarObjetoName = key => {   // eliminar objeto  borrarObjeto() ; 
                const IDBData = getIDBData("readwrite");
                IDBData[0].delete(key)  //objeto que se quiere modificar
                IDBData[1].addEventListener("complete",()=>{
                    console.log("objeto eliminado correctamente")
                })
            }

            const borrarObjetoPrice = key => {   // eliminar objeto  borrarObjeto() ; 
                const IDBData = getIDBDataPrice("readwrite");
                IDBData[0].delete(key)  //objeto que se quiere modificar
                IDBData[1].addEventListener("complete",()=>{
                    console.log("objeto eliminado correctamente")
                })
            }
            const borrarObjetoCantity = key => {   // eliminar objeto  borrarObjeto() ; 
                const IDBData = getIDBDatacantity("readwrite");
                IDBData[0].delete(key)  //objeto que se quiere modificar
                IDBData[1].addEventListener("complete",()=>{
                    console.log("objeto eliminado correctamente")
                })
            }
            const borrarObjetoTotal = key => {   // eliminar objeto  borrarObjeto() ; 
                const IDBData = getIDBDataTotal("readwrite");
                IDBData[0].delete(key)  //objeto que se quiere modificar
                IDBData[1].addEventListener("complete",()=>{
                    console.log("objeto eliminado correctamente")
                })
            }



const container=document.querySelector(".showP");

 function mostrarResultado (){
  leerObjetosName()
  leerObjetosPrice()
  leerObjetosCantity()
  leerObjetosTotal()

  const boton=document.querySelector(".borrar") 
  boton.addEventListener("click",()=>{
    for(let i=0;i<100;i++){
        borrarObjetoName(i);
        borrarObjetoPrice(i);
        borrarObjetoCantity(i);
        borrarObjetoTotal(i);
        location.reload();
    }
  

  })

}

addEventListener("load",dataenviar)

function dataenviar(){
    let datos = document.querySelector(".cuadro");
    //console.log(datos)
    return datos
}
