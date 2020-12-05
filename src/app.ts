/// <reference path="./model/Persona.ts"/>
/// <reference path="./core/manejador.ts"/>


const { ManagerEntity } = Core;



window.addEventListener('load', function(){
    localStorage.clear();
    agregarPersona();
    filterListCheckbox();
    rowClick();
    eliminarPersona();
    filterSex();
    calcularProm();
    limpiarLista();
})


function validateNameInput():boolean {
    let m = $("nombre").value;
    if(m == "" && m.length < 6){
        $("nombre").className ="inputError";
        return false;
    }
    $("nombre").className ="inputSinError";
    return true;
}

function validateApellidoInput():boolean {
    let m = $("apellido").value;
    if(m == "" && m.length < 6){
        $("apellido").className ="inputError";
        return false;
    }
    $("apellido").className ="inputSinError";
    return true;
}

function validateEdadInput():boolean {
    let m = Number($("edad").value);
    if(isNaN(m) || $("edad").value==""){
        $("edad").className ="inputError";
        return false;
    }
    $("edad").className ="inputSinError";
    return true;
}

function validateSexoInput():boolean {
    let m = $("sexo").value;
    if(m == ""){
        $("sexo").className ="inputError";
        return false;
    }
    $("sexo").className ="inputSinError";
    return true;
}

function agregarPersona() {
    var btn = document.getElementById('btnSave');
    btn?.addEventListener("click",function () {
        let exitA = validateApellidoInput();
        let exitName = validateNameInput();
        let exitEdad =validateEdadInput();
        let exitSex = validateSexoInput();
        if(exitA&&exitName&&exitEdad&&exitSex){
            ManagerEntity.takeDataDom();
            cleanForm()
        }
    })
}

function eliminarPersona() {
    var btn = document.getElementById('btnDelete');
    btn?.addEventListener("click",function () {
        let id =  Number($("id").value);
        deleteRow(id)
        cleanForm();
    })
}

function limpiarLista() {
    var btn = document.getElementById('btnDeleteList');
    btn?.addEventListener("click",function () {
        localStorage.clear();
        ManagerEntity.cleanTable();
        cleanForm();
    })
}

function filterSex() {
    var btn = document.getElementById('filterSex');
    btn?.addEventListener("change",function () {
        let prom = new Promise((resolve:any,reject:any)=>{
            setTimeout(function () {
                let message = "funciono el filter";
                resolve(message);
            },250);
        });
        prom.then((message:string)=>{
            let valueSelected = $('filterSex').value;
            let selectType:number;
            if("Masculino"=== valueSelected){
                selectType = Model.TypeSexEnum.MASCULINO
            }else{
                selectType = Model.TypeSexEnum.FEMENINO;
            }
            let listCliente = getInfo();
            if(listCliente != null){
                let listFilter=listCliente.filter((cliente:Model.Cliente)=>{
                    if(cliente.sexo != selectType){
                        deleteRow(cliente.id);
                    }else{
                        return cliente;
                    }
                });
                
            }
        });
    })
}

function calcularProm() {
    var btn = document.getElementById('btnProm');
    btn?.addEventListener("click",function () {
        //marca este error y no se como solucionarlo
        let prom = new Promise((resolve:any,reject:any)=>{
            setTimeout(function () {
                let message = "funciono el promedio";
                resolve(message);
            },250);
        });
        prom.then((message:string)=>{
            console.log(message)
            let listCliente = getInfo();
           if(listCliente != null && listCliente.length>0){
               let totalAge=listCliente.reduce((total:number,person:Model.Cliente)=>{
                   return total+=person.edad;
               },0);
               let prom = totalAge / listCliente.length;
               $('prom').value = prom.toString();
           }
        });
    })
}



function filterListCheckbox(){
    let checkId = document.getElementById('checkId');
    let checkNombre = document.getElementById('checkNombre');
    let checkApellido = document.getElementById('checkApellido');
    let checkEdad = document.getElementById('checkEdad');
    let checkSex = document.getElementById('checkSex');
    checkId?.addEventListener('click',function () {
        if($('checkId').checked ){
            var items =<HTMLCollection>document.getElementsByClassName("columnId");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","display:none;");
            }
        }else{
            var items =<HTMLCollection>document.getElementsByClassName("columnId");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","");
            }
           
        }
        
    });
    checkNombre?.addEventListener('click',function () {
        if($('checkNombre').checked){
            var items =<HTMLCollection>document.getElementsByClassName("columnNombre");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","display:none;");
            }
        }else{
            var items =<HTMLCollection>document.getElementsByClassName("columnNombre");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","");
            }
        }
    });
    checkApellido?.addEventListener('click',function () {
        
        if($('checkApellido').checked){
            var items =<HTMLCollection>document.getElementsByClassName("columnApellido");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","display:none;");
            }
        }else{
            var items =<HTMLCollection>document.getElementsByClassName("columnApellido");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","");
            }
        }
    });
    checkEdad?.addEventListener('click',function () {
        if($('checkEdad').checked){
            var items =<HTMLCollection>document.getElementsByClassName("columnEdad");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","display:none;");
            }
        }else{
            var items =<HTMLCollection>document.getElementsByClassName("columnEdad");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","");
            }
        }
    });
    checkSex?.addEventListener('click',function () {
        if($('checkSex').checked){
            var items =<HTMLCollection>document.getElementsByClassName("columnSexo");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","display:none;");
            }
        }else{
            var items =<HTMLCollection>document.getElementsByClassName("columnSexo");
            for (var i=0; i <= items.length; i++) {
              items[i].setAttribute("style","");
            }
        }
    });

}

function rowClick() {
    var table = <HTMLTableElement>document.getElementById("tCuerpo");
    table.addEventListener("click",function(item:any) {
        var row = item.path[1]; 
        var cliente = [];
        for (var j = 0; j < row.cells.length; j++) { 
            console.log( row.cells[j].innerHTML)
            cliente.push(row.cells[j].innerHTML);
        } 
        console.log(cliente);

        setDataForm(cliente);
    });
}

function setDataForm(cliente:Array<any>){
    (<HTMLInputElement>document.getElementById('id')).value = cliente[0];
    (<HTMLInputElement>document.getElementById('nombre')).value = cliente[1];
    (<HTMLInputElement>document.getElementById('apellido')).value = cliente[2];
    (<HTMLInputElement>document.getElementById('edad')).value= cliente[3];
     (<HTMLInputElement>document.getElementById('sexo')).value= cliente[4];
}

function $(id:any){
    return <HTMLInputElement>document.getElementById(id);
}



function saveInfo(listaClientes:Array<Model.Cliente>){
    localStorage.setItem("listaClientes",JSON.stringify(listaClientes));
}

function getInfo() {
    let stringJson = localStorage.getItem("listaClientes");
    if(stringJson != null){
        return JSON.parse(stringJson);
    }
    return [];
}


function cleanForm(){
    (<HTMLInputElement>document.getElementById('id')).value = '';
    (<HTMLInputElement>document.getElementById('nombre')).value = '';
    (<HTMLInputElement>document.getElementById('apellido')).value = '';
    (<HTMLInputElement>document.getElementById('edad')).value= '';
     (<HTMLInputElement>document.getElementById('sexo')).value= '';
}


function deleteRow(id :number){ 
    var table =<HTMLTableElement>document.getElementById("tCuerpo");
    let index = id -1;
    table.deleteRow(index);
    let listClient:Array<Model.Cliente> = getInfo();
    saveInfo(listClient.filter(person => person.id != id));

}

