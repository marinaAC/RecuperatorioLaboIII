"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Model;
(function (Model) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        return Persona;
    }());
    Model.Persona = Persona;
})(Model || (Model = {}));
/// <reference path="./Persona.ts"/>
var Model;
(function (Model) {
    var Cliente = /** @class */ (function (_super) {
        __extends(Cliente, _super);
        function Cliente(id, nombre, apellido, edad, sexo) {
            var _this = _super.call(this, id, nombre, apellido) || this;
            _this.id = id;
            _this.nombre = nombre;
            _this.apellido = apellido;
            _this.edad = edad;
            _this.sexo = sexo;
            return _this;
        }
        return Cliente;
    }(Model.Persona));
    Model.Cliente = Cliente;
})(Model || (Model = {}));
/// <reference path="../model/Cliente.ts"/>
var Core;
(function (Core) {
    var ManagerEntity = /** @class */ (function () {
        function ManagerEntity() {
        }
        ManagerEntity.cargarLista = function (cliente) {
            var table = document.getElementById('tCuerpo');
            if (cliente != null && cliente != undefined) {
                var tr = document.createElement("tr");
                var tdId = document.createElement("td");
                var tdNombre = document.createElement("td");
                var tdApellido = document.createElement("td");
                var tdEdad = document.createElement("td");
                var tdSexo = document.createElement("td");
                var tdTypeObj = document.createElement("td");
                tdId.textContent = cliente.id.toString();
                tdId.className = "columnId";
                tdNombre.className = "columnNombre";
                tdApellido.className = "columnApellido";
                tdEdad.className = "columnEdad";
                tdSexo.className = "columnSexo";
                //tdId.className = "invisibilitTd";
                tdNombre.textContent = cliente.nombre;
                tdApellido.textContent = cliente.apellido;
                tdEdad.textContent = cliente.edad.toString();
                if (cliente.sexo === Model.TypeSexEnum.MASCULINO) {
                    tdSexo.textContent = "Masculino";
                }
                else {
                    tdSexo.textContent = "Femenino";
                }
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdApellido);
                tr.appendChild(tdEdad);
                tr.appendChild(tdSexo);
                tr.appendChild(tdTypeObj);
                tr.setAttribute("id", cliente.id.toString());
                table === null || table === void 0 ? void 0 : table.appendChild(tr);
            }
        };
        ManagerEntity.agregarVehiculo = function (nombre, apellido, edad, sexo) {
            var listPersonas = getInfo();
            var id = listPersonas.reduce(function (idInicial, persona) {
                if (persona.id >= idInicial) {
                    idInicial = persona.id + 1;
                }
                return idInicial;
            }, 1);
            console.log("entre cliente");
            var sexTyp;
            if ("masculino" === sexo) {
                sexTyp = Model.TypeSexEnum.MASCULINO;
            }
            else {
                sexTyp = Model.TypeSexEnum.FEMENINO;
            }
            var cliente = new Model.Cliente(id, nombre, apellido, edad, sexTyp);
            ManagerEntity.cargarLista(cliente);
            listPersonas.push(cliente);
            saveInfo(listPersonas);
        };
        ManagerEntity.takeDataDom = function () {
            var _a, _b, _c, _d;
            var nombre = (_a = document.getElementById('nombre')) === null || _a === void 0 ? void 0 : _a.value;
            var apellido = (_b = document.getElementById('apellido')) === null || _b === void 0 ? void 0 : _b.value;
            var edad = (_c = document.getElementById('edad')) === null || _c === void 0 ? void 0 : _c.value;
            var sexo = (_d = document.getElementById('sexo')) === null || _d === void 0 ? void 0 : _d.value;
            if (nombre != '' && apellido != '' &&
                edad != '' && sexo != '') {
                this.agregarVehiculo(nombre, apellido, Number(edad), sexo);
            }
        };
        ManagerEntity.cleanTable = function () {
            var table = document.getElementById('tCuerpo');
            for (var i = 0; i < table.rows.length; i++) {
                table.deleteRow(i);
            }
        };
        return ManagerEntity;
    }());
    Core.ManagerEntity = ManagerEntity;
})(Core || (Core = {}));
/// <reference path="./model/Persona.ts"/>
/// <reference path="./core/manejador.ts"/>
var ManagerEntity = Core.ManagerEntity;
window.addEventListener('load', function () {
    localStorage.clear();
    agregarPersona();
    filterListCheckbox();
    rowClick();
    eliminarPersona();
    filterSex();
    calcularProm();
    limpiarLista();
});
function validateNameInput() {
    var m = $("nombre").value;
    if (m == "" && m.length < 6) {
        $("nombre").className = "inputError";
        return false;
    }
    $("nombre").className = "inputSinError";
    return true;
}
function validateApellidoInput() {
    var m = $("apellido").value;
    if (m == "" && m.length < 6) {
        $("apellido").className = "inputError";
        return false;
    }
    $("apellido").className = "inputSinError";
    return true;
}
function validateEdadInput() {
    var m = Number($("edad").value);
    if (isNaN(m) || $("edad").value == "") {
        $("edad").className = "inputError";
        return false;
    }
    $("edad").className = "inputSinError";
    return true;
}
function validateSexoInput() {
    var m = $("sexo").value;
    if (m == "") {
        $("sexo").className = "inputError";
        return false;
    }
    $("sexo").className = "inputSinError";
    return true;
}
function agregarPersona() {
    var btn = document.getElementById('btnSave');
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
        var exitA = validateApellidoInput();
        var exitName = validateNameInput();
        var exitEdad = validateEdadInput();
        var exitSex = validateSexoInput();
        if (exitA && exitName && exitEdad && exitSex) {
            ManagerEntity.takeDataDom();
            cleanForm();
        }
    });
}
function eliminarPersona() {
    var btn = document.getElementById('btnDelete');
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
        var id = Number($("id").value);
        deleteRow(id);
        cleanForm();
    });
}
function limpiarLista() {
    var btn = document.getElementById('btnDeleteList');
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
        localStorage.clear();
        ManagerEntity.cleanTable();
        cleanForm();
    });
}
function filterSex() {
    var btn = document.getElementById('filterSex');
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("change", function () {
        var prom = new Promise(function (resolve, reject) {
            setTimeout(function () {
                var message = "funciono el filter";
                resolve(message);
            }, 250);
        });
        prom.then(function (message) {
            var valueSelected = $('filterSex').value;
            var selectType;
            if ("Masculino" === valueSelected) {
                selectType = Model.TypeSexEnum.MASCULINO;
            }
            else {
                selectType = Model.TypeSexEnum.FEMENINO;
            }
            var listCliente = getInfo();
            if (listCliente != null) {
                var listFilter = listCliente.filter(function (cliente) {
                    if (cliente.sexo != selectType) {
                        deleteRow(cliente.id);
                    }
                    else {
                        return cliente;
                    }
                });
            }
        });
    });
}
function calcularProm() {
    var btn = document.getElementById('btnProm');
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
        //marca este error y no se como solucionarlo
        var prom = new Promise(function (resolve, reject) {
            setTimeout(function () {
                var message = "funciono el promedio";
                resolve(message);
            }, 250);
        });
        prom.then(function (message) {
            console.log(message);
            var listCliente = getInfo();
            if (listCliente != null && listCliente.length > 0) {
                var totalAge = listCliente.reduce(function (total, person) {
                    return total += person.edad;
                }, 0);
                var prom_1 = totalAge / listCliente.length;
                $('prom').value = prom_1.toString();
            }
        });
    });
}
function filterListCheckbox() {
    var checkId = document.getElementById('checkId');
    var checkNombre = document.getElementById('checkNombre');
    var checkApellido = document.getElementById('checkApellido');
    var checkEdad = document.getElementById('checkEdad');
    var checkSex = document.getElementById('checkSex');
    checkId === null || checkId === void 0 ? void 0 : checkId.addEventListener('click', function () {
        if ($('checkId').checked) {
            var items = document.getElementsByClassName("columnId");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "display:none;");
            }
        }
        else {
            var items = document.getElementsByClassName("columnId");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "");
            }
        }
    });
    checkNombre === null || checkNombre === void 0 ? void 0 : checkNombre.addEventListener('click', function () {
        if ($('checkNombre').checked) {
            var items = document.getElementsByClassName("columnNombre");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "display:none;");
            }
        }
        else {
            var items = document.getElementsByClassName("columnNombre");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "");
            }
        }
    });
    checkApellido === null || checkApellido === void 0 ? void 0 : checkApellido.addEventListener('click', function () {
        if ($('checkApellido').checked) {
            var items = document.getElementsByClassName("columnApellido");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "display:none;");
            }
        }
        else {
            var items = document.getElementsByClassName("columnApellido");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "");
            }
        }
    });
    checkEdad === null || checkEdad === void 0 ? void 0 : checkEdad.addEventListener('click', function () {
        if ($('checkEdad').checked) {
            var items = document.getElementsByClassName("columnEdad");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "display:none;");
            }
        }
        else {
            var items = document.getElementsByClassName("columnEdad");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "");
            }
        }
    });
    checkSex === null || checkSex === void 0 ? void 0 : checkSex.addEventListener('click', function () {
        if ($('checkSex').checked) {
            var items = document.getElementsByClassName("columnSexo");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "display:none;");
            }
        }
        else {
            var items = document.getElementsByClassName("columnSexo");
            for (var i = 0; i <= items.length; i++) {
                items[i].setAttribute("style", "");
            }
        }
    });
}
function rowClick() {
    var table = document.getElementById("tCuerpo");
    table.addEventListener("click", function (item) {
        var row = item.path[1];
        var cliente = [];
        for (var j = 0; j < row.cells.length; j++) {
            console.log(row.cells[j].innerHTML);
            cliente.push(row.cells[j].innerHTML);
        }
        console.log(cliente);
        setDataForm(cliente);
    });
}
function setDataForm(cliente) {
    document.getElementById('id').value = cliente[0];
    document.getElementById('nombre').value = cliente[1];
    document.getElementById('apellido').value = cliente[2];
    document.getElementById('edad').value = cliente[3];
    document.getElementById('sexo').value = cliente[4];
}
function $(id) {
    return document.getElementById(id);
}
function saveInfo(listaClientes) {
    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
}
function getInfo() {
    var stringJson = localStorage.getItem("listaClientes");
    if (stringJson != null) {
        return JSON.parse(stringJson);
    }
    return [];
}
function cleanForm() {
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('sexo').value = '';
}
function deleteRow(id) {
    var table = document.getElementById("tCuerpo");
    var index = id - 1;
    table.deleteRow(index);
    var listClient = getInfo();
    saveInfo(listClient.filter(function (person) { return person.id != id; }));
}
var Model;
(function (Model) {
    var TypeSexEnum;
    (function (TypeSexEnum) {
        TypeSexEnum[TypeSexEnum["FEMENINO"] = 0] = "FEMENINO";
        TypeSexEnum[TypeSexEnum["MASCULINO"] = 1] = "MASCULINO";
    })(TypeSexEnum = Model.TypeSexEnum || (Model.TypeSexEnum = {}));
})(Model || (Model = {}));
