/// <reference path="./Persona.ts"/>

namespace Model{
    export class Cliente extends Persona {
        constructor(public id:number,public nombre:string,public apellido:string,public edad:number,public sexo:TypeSexEnum) {
            super(id,nombre,apellido);
        }

    }
}