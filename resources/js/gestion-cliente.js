

function clientes_main(sw = true){
	var secc_gcl = document.getElementById("gestioncl");
	if(sw) secc_gcl.innerHTML = "";

	var data_lista = document.getElementById("listcliente");
	data_lista.innerHTML = "";

	var data_list_cell = document.getElementById("listclcell");
	data_list_cell.innerHTML = "";

	//console.log(" Test: "+gl_cliente.cell.length + " :: " );
	for (var j = 0; j<gl_cliente.cell.length; j++) {
		if (sw) mostrar_gcl(j);
		data_lista.innerHTML += "<option value='"+gl_cliente.nombre[j]+"'>";
		data_list_cell.innerHTML += "<option value='"+get_mask_cell(gl_cliente.cell[j])+" - "+gl_cliente.nombre[j]+"'>";
	}
}


// Se obtienen los valores para registrar clientes desde la tabla
function get_input_value_cl(){

	var cell = document.getElementById("inputcl11");
	//var mask = document.getElementById("text_maskcl11");

	//mask.value = get_mask_int_a(cell.value);
}


// Se guardan los valores de clientes desde la tabla
function guardar_cl(){
	var nombre = document.getElementById("inputcl10");
	var cell = document.getElementById("inputcl11");
	var mail = document.getElementById("inputcl12");
	//var mask = document.getElementById("text_maskcl11");

	if (!check_text_resv(nombre.value)){
		nombre.value = "";
		return null;
	}

	if (!check_text_resv(cell.value)){
		cell.value = "";
		return null;
	}
		console.log(" Test:  :: " + gl_cliente.cell.length );
	var result = false;
	var cell_val = remover_all_simb(cell.value);
	cell_val = parseInt(cell.value)?  parseInt(cell.value) : 0 ;
	for (var j = 0; j<gl_cliente.cell.length && cell_val != ""; j++) {
		var save_nr = gl_cliente.cell[j];
		if (save_nr!="") save_nr = parseInt(save_nr);
		else continue;
		//console.log(" Test: "+cell_val + " :: " + save_nr );
		if(cell_val == save_nr){
			result = true;
			break;
		}
	}

	if (result) return alert("El numero de identidad ya existe!.");
	if(nombre.value != "" && cell_val != ""){

		gl_cliente.nombre.push(nombre.value);
		gl_cliente.cell.push(cell_val);
		gl_cliente.mail.push(mail.value?mail.value:"Sin Correo Electronico");
 		agregar_cliente(gl_cliente, 0);				//Se guardan la informacion de Clientes

		nombre.value = "";
		cell.value = "";
		mail.value = "";

		clientes_main();							//Se crean las listas de clientes
	}
	else alert("No se permiten valores Vacios!.");
}

function mostrar_gcl(index){
	var secc_gcl = document.getElementById("gestioncl");
	var cliente = gl_cliente.nombre[index];
	var cell = gl_cliente.cell[index];
	var mail = gl_cliente.mail[index];

	var input_name = set_input_edit_tx("chg_name_vle_cl", index);
	input_name.setAttribute("value",cliente);
	input_name.setAttribute("id", "input_name_cl"+index);

	var input_cell = set_input_edit_tx("chg_cell_vle_cl", index);
	input_cell.setAttribute("value",cell);
	input_cell.setAttribute("id", "input_cell_cl"+index);

	var input_mail = set_input_edit_tx("chg_mail_vle_cl", index);
	input_mail.setAttribute("value",mail);
	input_mail.setAttribute("id", "input_mail_cl"+index);

	var check = "<input class='' type='checkbox' id='check_gclx"+index+"' onchange='ocultar_gclx("+index+")'/>";
	var buttq = "<button type='button' id='butt_gclx"+index+"' class='element_style_hidden' onclick='button_quit_gcl("+index+");'>X</button>";

	var monto_total = gl_cliente.monto_totl[index];

	secc_gcl.innerHTML += "<div class='div_list_style' id='divgcl"+index+"'><div> Nombre:&nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp "+ input_name.outerHTML + "</div> <div>Tlf.: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp"+input_cell.outerHTML+" </div> <div> Email:&nbsp&nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp"+input_mail.outerHTML+" </div> <div class='total_style'>"+buttq+"&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp Quitar:"+check+"</div> </div>";

}

function chg_name_vle_cl(index){
	var input = document.getElementById("input_name_cl"+index);
	gl_cliente.nombre[index] = input.value;
 	agregar_cliente(gl_cliente, 0);								//Se guardan la informacion de Clientes
	clientes_main(false);										//Se crean las listas de clientes
}

function chg_cell_vle_cl(index){
	var input = document.getElementById("input_cell_cl"+index);
	gl_cliente.cell[index] = input.value;
 	agregar_cliente(gl_cliente, 0);								//Se guardan la informacion de Clientes
	clientes_main(false);										//Se crean las listas de clientes
}

function chg_mail_vle_cl(index){
	var input = document.getElementById("input_mail_cl"+index);
	gl_cliente.mail[index] = input.value;
 	agregar_cliente(gl_cliente, 0);								//Se guardan la informacion de Clientes
	clientes_main(false);										//Se crean las listas de clientes
}


function ocultar_gclx(index) {
	var check = document.getElementById("check_gclx"+index).checked;
	var name = check?"butt_style_x":"element_style_hidden";

	var buttq = document.getElementById("butt_gclx"+index);
	buttq.setAttribute("class", name);	
}

function button_quit_gcl(index) {
	var butt = document.activeElement;
	butt.setAttribute("class","element_style_hidden");
	
	if (gcl_j != null) return alert("Procesando datos...");

	var temp_cliente = new reg_cliente();

	gl_servicio.monto_pagado -= gl_cliente.monto_totl[index];

	temp_cliente.indx_a = gl_cliente.indx_a;

	temp_cliente.start = gl_cliente.start;					//Para saber si ha sido guardada o no en el almacen
	temp_cliente.clave = gl_cliente.clave;	

	var des = 0;
	for (var j = 0; j < gl_cliente.cell.length; j++) {

		if(j == index) {
			des = 1;
			continue;
		}
		temp_cliente.indx_b[j-des] = gl_cliente.indx_b[j];
		temp_cliente.monto_totl[j-des] = gl_cliente.monto_totl[j];
		temp_cliente.nombre[j-des] = gl_cliente.nombre[j];
		temp_cliente.cell[j-des] = gl_cliente.cell[j];

		//Array dobles -------------------------
		temp_cliente.desc[j-des] = gl_cliente.desc[j];
		temp_cliente.actual_bs[j-des] = gl_cliente.actual_bs[j];
		temp_cliente.monto_dol[j-des] = gl_cliente.monto_dol[j];
		temp_cliente.monto_bs[j-des] = gl_cliente.monto_bs[j];
		temp_cliente.hora[j-des] = gl_cliente.hora[j];
		temp_cliente.fecha[j-des] = gl_cliente.fecha[j];
		//---------------------------------------
	}

	temp_cliente.indx_a--;
 	agregar_cliente(temp_cliente, 0);				//Se guardan la informacion de Clientes
	gl_servicio.hash = null;
 	agregar_cuenta(gl_servicio, gl_servicio.clave);					//Se guardan la informacion de Cuenta

	gcl_j = index;
	//console.log(" Test index: "+index );
	cont_gcl = setInterval(retardo_capt_gc, 10);

	clientes_main();							//Se crean las listas de clientes
}

//cont_gcl = setInterval(retardo_capt_gc, 1000);

//contador para esperar mientras los valores se cargan
var seg_gcl = 0;
var cont_gcl;		// = setInterval(cambio_valor, 1000);
var gcl_j = null;
var gcl_i = 0;
function retardo_capt_gc(start = false){
	if(seg_gcl>0 || start){ 
		if(gcl_j < gl_cliente.indx_a){
			if (gcl_i < gl_cliente.indx_b[gcl_j+1]+1){
				seg_gcl=0;
				mostrar_capt_gcl(""+gl_servicio.clave+""+(gcl_j+1)+""+gcl_i+"", ""+gl_servicio.clave+""+(gcl_j)+""+gcl_i+"");
				gcl_i++;
			}
			else {
				gcl_i = 0;
				gcl_j++;
			}
		}
		else{
			clearInterval(cont_gcl);
			buscar_lista_cuenta();
			alert("El cliente ha sido borrado!.");

			//Se reinician los valores
			seg_gcl=0;
			gcl_i = 0;
			gcl_j = null;
		}
	}
	seg_gcl++;
}

//Manejo de Captures de pago -----------------------------------------
function mostrar_capt_gcl(clave,clave_nuev) {
	//console.log(""+clave+"");
	var transaccion = bd.transaction(["capture_clientes"]);
	var almacen = transaccion.objectStore("capture_clientes");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", function(){obtener_capt_gcl(event, clave_nuev);});
}

function obtener_capt_gcl(evento, clave_nuev) {
	var resultado = evento.target.result;
	if(resultado){
		var index =	resultado.id;
		var capt = resultado.rg_capture;

		//console.log(" Test gcl "+index +" New ID: "+clave_nuev );
		agregar_capture(capt,clave_nuev);

	}
}
//----------------------------------------------------------------------



