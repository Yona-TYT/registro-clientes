var gl_servicio = new reg_servicio();
var gl_opt_moneda = 0;

function servicios_main(sw = true){
	var secc_gs = document.getElementById("gestionrs");
	if(sw) secc_gs.innerHTML = "";

	var data_lista = document.getElementById("listserv");
	data_lista.innerHTML = "";

	console.log(" Test: "+gl_servicio.nombre.length + " :: " );
	for (var j = 0; j<gl_servicio.nombre.length; j++) {
		if (sw) mostrar_gsr(j);
		data_lista.innerHTML += "<option value='"+gl_servicio.nombre[j]+"'>";
	}

}
function save_inputs_cuentas(){
	var gen_bs = document.getElementById("input_gnbs_cc");
	var mask = document.getElementById("text_mask_gnbs_cc");

	var genbs_rp = document.getElementById("input_gnbs");
	var mask_rp = document.getElementById("text_mask_gnbs");

	var vl_bs = gen_bs.value;
	genbs_rp.value = vl_bs;

	gl_general.gen_bs = parseFloat(vl_bs)? parseFloat(vl_bs).toFixed(2) : parseFloat(0).toFixed(2);
	agregar_gene_datos(gl_general);								//Se guardan los datos Generales

	var vl_mask = get_mask(vl_bs,"Bs");
	mask.value = vl_mask;
	mask_rp.value = vl_mask;

	get_input_value_rc()
}

function get_input_value_rc(){
	var gen_bs = gl_general.gen_bs;
	var costo = document.getElementById("inputrs12");
	var mask = document.getElementById("text_maskrs12");

	mask.value = get_mask(costo.value,"$");
	
	//console.log(""+mont_dol+" "+mont_bs+" "+gl_general.temp_monto_dol_cc+" "+gl_general.temp_monto_bs_cc);
}

function guardar_servicio(){
	var nombre = document.getElementById("inputrs10");
	var desc = document.getElementById("inputrs11");
	var costo = document.getElementById("inputrs12");
	var mask = document.getElementById("text_maskrs12");

	if (!check_text_resv(nombre.value)){
		nombre.value = "";
		return null;
	}

	if (!check_text_resv(desc.value)){
		desc.value = "";
		return null;
	}

	var titulo = nombre.value + " " + desc.value;	//Titulo para la cuenta
	var result = false;
	for (var j = 0; j<gl_servicio.nombre.length; j++) {
		var save_tx = gl_servicio.nombre[j] + " " + gl_servicio.desc[j] ;
		if (save_tx!="") save_tx = save_tx.toLowerCase();
		else continue;
		result = save_tx.includes(titulo.toLowerCase());

		if(result){
			break;
		}
	}
	if(result) return alert("El Nombre del Servicio ya existe!.");


	if(costo.value != "" && nombre.value != "" && desc.value != ""){

		gl_servicio.nombre.push(nombre.value);
		gl_servicio.desc.push(desc.value);
		gl_servicio.costo.push(costo.value);


		gl_servicio.clave = 0;
		agregar_cuenta(gl_servicio, 0);				//Se guardan la informacion de servicios

		crear_datalist_cc();

		nombre.value = "";
		desc.value = "";
		costo.value = "";
		mask.value = "";

		servicios_main();							//Se crean las listas de servicios
	}
	else alert("No se permiten valores Vacios!.");
}

function crear_datalist_cc() {
	var data_lista = document.getElementById("listserv");
	data_lista.innerHTML = "";
	//console.log("Finished:"+gl_general.cu_save_id)
	for (var j = 0; j <gl_servicio.nombre.length; j++) {
		data_lista.innerHTML += "<option value='"+gl_servicio.nombre[j]+"'>";
	}
}

function mostrar_gsr(index){
	var gen_bs = gl_general.gen_bs;
	var secc_gsr = document.getElementById("gestionrs");
	var servicio = gl_servicio.nombre[index];

	var input_rs =	set_input_edit("chg_name_vle_sr", index);
	input_rs.setAttribute("value",servicio);
	input_rs.setAttribute("id", "input_grsx"+index);


	var check = "<input class='' type='checkbox' id='check_gclx"+index+"' onchange='ocultar_gclx("+index+")'/>";
	var buttq = "<button type='button' id='butt_gclx"+index+"' class='element_style_hidden' onclick='button_quit_gsr("+index+");'>X</button>";

	var costo = gl_servicio.costo[index];

	secc_gsr.innerHTML += "<div class='div_list_style' id='divgcl"+index+"'>"+buttq+" Nombre: "+ input_rs.outerHTML + " <div class='total_style'>Costo: "+get_mask(costo,"$")+"&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp Quitar:"+check+"</div> </div>";
}



function chg_name_vle_sr(index){
	var input = document.getElementById("input_grsx"+index);

	gl_servicio.nombre[index] = input.value;

	agregar_cuenta(gl_servicio, 0);					//Se guardan la informacion de servicios
	servicios_main(false);							//Se crean las listas de servicios
}


function ocultar_gsrx(index) {
	var check = document.getElementById("check_gsrx"+index).checked;
	var name = check?"butt_style_x":"element_style_hidden";

	var buttq = document.getElementById("butt_gsrx"+index);
	buttq.setAttribute("class", name);	
}

function button_quit_gsr(index) {
	var butt = document.activeElement;
	butt.setAttribute("class","element_style_hidden");
	
	gl_general.list_nombre.splice(index, 1);
	gl_general.list_costo.splice(index, 1);
	gl_general.list_nr.splice(index, 1);

	servicios_main();							//Se crean las listas de servicios
}



