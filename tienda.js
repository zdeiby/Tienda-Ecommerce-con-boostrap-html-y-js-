const price=document.querySelectorAll(".addToCart");
console.log(price)


const contenedor=document.querySelector(".showP")
const contenedor2=document.querySelector(".showP2")


price.forEach((add) =>{
   add.addEventListener("click",getItems);
   });

const comprarButton= document.querySelector(".comprarButton");
comprarButton.addEventListener("click",comprar);



function getItems(event){
   
    const button=event.target;
    const item = button.closest('.items'); //busca hasta el ultimo elemento del div

    const imagen=item.querySelector(".item-image").src;
    nombre=item.querySelector(".item-title").textContent;
   precio=item.querySelector(".item-price").textContent;
    
    setElements(imagen,nombre,precio);
 
   }
 
   function setElements(imagen,nombre,precio){
    

    const title=contenedor.getElementsByClassName("shoppingCartItemTitle");

   for(let i=0;i<title.length; i++){

        if(title[i].textContent === nombre){
           let cantidad = title[i].parentElement.parentElement.parentElement.querySelector(".shoppingCartItemQuantity");
           cantidad.value++;
          
          actualizarPrecio();
           
           return
        }
      //  console.log(cantidad)
  
   }
   
   
      
       
        
        actualizarPrecio();
       
        

 
   
 

    const div=document.createElement("DIV");
    const infoDiv= `<div class="shoppingCartItem">
    
        <div class="row pb-4">
        <div class="col "> 
        <h6 class=" shoppingCartItemTitle" id="nombres">${nombre}</h6>
        </div>
        <div class="col"> 
                
            <img src=${imagen} class="imagen">
         </div>
         <div class="col pt-2"> 
            <p class="shoppingCartItemPrice">${precio}</p>
        </div>
        <div class="col"> 
            <input class="shoppingCartItemQuantity col-6" type="number" value="1">
        </div>
        <div class="col"> 
            <button class="buttonDelete" type="button">X</button> 
        
        </div>
    </div>
            
        
  
    `;
    div.innerHTML=infoDiv;
    contenedor.appendChild(div)

    div.querySelector(".buttonDelete").addEventListener("click", removeShoppingCartItem);

    div.querySelector(".shoppingCartItemQuantity").addEventListener('change',quantityChanged);
    actualizarPrecio();
   }
   
function actualizarPrecio(){
    let newValue =0;;
    let total=0;
   let shoppingCartItemQuantity ='';
   
    const ShowTotal=document.querySelector(".shoppingCartTotal")
   // console.log(ShowTotal)
    const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");
     shoppingCartItems.forEach((shoppingCartItem)=>{
    const shoppingCartItemPriceELement=shoppingCartItem.querySelector(".shoppingCartItemPrice");
    const shoppingCartItemPrice= shoppingCartItemPriceELement.textContent;
    newValue=parseInt(shoppingCartItemPrice);
  
   const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(".shoppingCartItemQuantity");
   shoppingCartItemQuantity = parseInt(shoppingCartItemQuantityElement.value);
 

    total= total+newValue * shoppingCartItemQuantity;
    //console.log(shoppingCartItemQuantity)
    
   
    
});

        
    
    ShowTotal.innerHTML = `${total}$`;
    return [shoppingCartItemQuantity,total]
}

function removeShoppingCartItem(event){
    const buttonClicked =event.target;
   buttonClicked.closest(".shoppingCartItem").remove();

   for(let i=0; i<200;i++){
    
    borrarObjeto(i)
 

   }
   
   actualizarPrecio();
   


}

function quantityChanged(event){
    const input = event.target;
   
    if (input.value <=0){
        input.value=1;
    }
    actualizarPrecio();

}

function comprar(){

   const cantidad=document.querySelectorAll(".shoppingCartItemQuantity");
   const nombre=document.querySelectorAll(".shoppingCartItemTitle");
   const precio=document.querySelectorAll(".shoppingCartItemPrice");
    let raiz=nombre;
  
console.log(raiz);
  
try {
    console.log("inicio")

    let nombre1=nombre[0].textContent
    let valor1=cantidad[0].value
    let precio1=parseInt(precio[0].textContent)
    console.log(nombre1,valor1,precio1)

    addObjeto({nombre:nombre1},"0")
    addObjeto({cantidad:valor1},"2");
    addObjeto({precioUnitario:precio1},"1");

    let nombre2=nombre[1].textContent
    let valor2=cantidad[1].value
    let precio2=parseInt(precio[1].textContent)

   

    addObjeto({nombre:nombre2},"0")
    addObjeto({cantidad:valor2},"2");
    addObjeto({precioUnitario:precio2},"1");

    console.log("filtro 1")

    let nombre3=nombre[2].textContent
    let valor3=cantidad[2].value
    let precio3=parseInt(precio[2].textContent)

    addObjeto({nombre:nombre3},"0")
    addObjeto({cantidad:valor3},"2");
    addObjeto({precioUnitario:precio3},"1");
    console.log("filtro 2")

    let nombre4=nombre[3].textContent
    let valor4=cantidad[3].value
    let precio4=parseInt(precio[3].textContent)

    addObjeto({nombre:nombre4},"0")
    addObjeto({cantidad:valor4},"2");
    addObjeto({precioUnitario:precio4},"1");
    console.log("filtro 3")

} catch {
    console.log("error")
}




   let total=actualizarPrecio()
  
   if(total[1] !== 0){
    addObjeto({precioTotal:total[1]},"3");
   }
 
   let HTMLsave = contenedor.innerHTML;
   console.log(HTMLsave);

   contenedor.innerHTML=HTMLsave;
   //contenedor2.innerHTML=`<h2>Haz click en comprar<h2><a href="carrito.html"><button class="comprar" >Comprar</button></a>`;
   contenedor.innerHTML=''



  
  actualizarPrecio();


    }





///DATABASE



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

//REVISAR
            const leerObjetosName = ()=>{   //para leer leerObjetos()
                const IDBData = getIDBData("readonly");
                const cursor=IDBData[0].openCursor();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        console.log(cursor.result.value)
                        cursor.result.continue() // para seguir leyendo 
                
                    }else console.log("todos los datos fueron leidos")
                })
            }

            const leerObjetosPrice = ()=>{   //para leer leerObjetos()
                const IDBData = getIDBDataPrice("readonly");
                const cursor=IDBData[0].openCursor();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        console.log(cursor.result.value)
                        cursor.result.continue() // para seguir leyendo 
                
                    }else console.log("todos los datos fueron leidos")
                })
            }

            const leerObjetosCantity = ()=>{   //para leer leerObjetos()
                const IDBData = getIDBDatacantity("readonly");
                const cursor=IDBData[0].openCursor();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        console.log(cursor.result.value)
                        cursor.result.continue() // para seguir leyendo 
                
                    }else console.log("todos los datos fueron leidos")
                })
            }

            const leerObjetosTotal = ()=>{   //para leer leerObjetos()
                const IDBData = getIDBDataTotal("readonly");
                const cursor=IDBData[0].openCursor();
                cursor.addEventListener("success",()=>{
                    if (cursor.result){
                        console.log(cursor.result.value)
                        cursor.result.continue() // para seguir leyendo 
                
                    }else console.log("todos los datos fueron leidos")
                })
            }



            const borrarObjeto = key => {   // eliminar objeto  borrarObjeto() ; 
                const IDBData = getIDBData("readwrite");
                IDBData[0].delete(key)  //objeto que se quiere modificar
                IDBData[1].addEventListener("complete",()=>{
                    console.log("objeto eliminado correctamente")
                })
            }
