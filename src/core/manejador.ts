/// <reference path="../model/Cliente.ts"/>

namespace Core {
    export class ManagerEntity {
        

        static cargarLista(cliente:Model.Cliente) {
            let table = <HTMLTableElement>document.getElementById('tCuerpo');
            if(cliente != null &&cliente != undefined){
                    let tr = document.createElement("tr");
                    let tdId = document.createElement("td");
                    let tdNombre = document.createElement("td");
                    let tdApellido = document.createElement("td");
                    let tdEdad = document.createElement("td");
                    let tdSexo = document.createElement("td");
                    let tdTypeObj = document.createElement("td");
                    tdId.textContent =cliente.id.toString();
                    tdId.className = "columnId";
                    tdNombre.className = "columnNombre";
                    tdApellido.className = "columnApellido";
                    tdEdad.className = "columnEdad";
                    tdSexo.className = "columnSexo";
                    //tdId.className = "invisibilitTd";
                    tdNombre.textContent=cliente.nombre;
                    tdApellido.textContent =cliente.apellido;
                    tdEdad.textContent =cliente.edad.toString();
                    if(cliente.sexo === Model.TypeSexEnum.MASCULINO){
                        tdSexo.textContent="Masculino";
                    }else{
                        tdSexo.textContent ="Femenino";
                    }
                    tr.appendChild(tdId);
                    tr.appendChild(tdNombre);
                    tr.appendChild(tdApellido);
                    tr.appendChild(tdEdad);
                    tr.appendChild(tdSexo);
                    tr.appendChild(tdTypeObj);
                    tr.setAttribute("id",cliente.id.toString());
                    table?.appendChild(tr);
            }
        }

        static agregarVehiculo(nombre:string, apellido:string,edad:number,sexo:string){
            let listPersonas:Array<Model.Cliente> = getInfo();
            let id = listPersonas.reduce((idInicial,persona)=>{
                if(persona.id>=idInicial){
                    idInicial = persona.id +1;
                }
                return idInicial;
            },1);
            console.log("entre cliente");
            let sexTyp;
            if("masculino"===sexo){
                sexTyp = Model.TypeSexEnum.MASCULINO
            }else{
                sexTyp = Model.TypeSexEnum.FEMENINO;
            }
            let cliente = new Model.Cliente(id,nombre,apellido,edad,sexTyp);
            ManagerEntity.cargarLista(cliente);
            listPersonas.push(cliente);
            saveInfo(listPersonas);
        }

        static takeDataDom(){
            let nombre = (<HTMLInputElement>document.getElementById('nombre'))?.value;
            let apellido = (<HTMLInputElement>document.getElementById('apellido'))?.value;
            let edad = (<HTMLInputElement>document.getElementById('edad'))?.value;
            let sexo = (<HTMLInputElement>document.getElementById('sexo'))?.value;
            if(nombre != '' && apellido!= '' &&
                edad != '' && sexo != ''){
                    this.agregarVehiculo(nombre,apellido,Number(edad),sexo);
            }
        }

        private static cleanTable(){
            let table = <HTMLTableElement>document.getElementById('tCuerpo');
            for(var i = 0; i < table.rows.length; i++) {
                table.deleteRow(i);
            }
        }

      

    }
}