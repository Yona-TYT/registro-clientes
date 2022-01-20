var gl_servicio = new reg_servicio();
var gl_opt_moneda = 0;

function cuentas_main(){

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
	var monto = document.getElementById("inputrs12");
	var mask = document.getElementById("text_maskrs12");

	var mont_dol = null;
	var mont_bs = null;

	mont_dol = parseFloat(monto.value)?parseFloat(monto.value):0;

	gl_general.temp_monto_dol_cc = mont_dol;					//Guarda el monto en dolares

	mask.value = get_mask(mont_dol,"$");
	
	gl_general.temp_selec = gl_opt_moneda;
	//console.log(""+mont_dol+" "+mont_bs+" "+gl_general.temp_monto_dol_cc+" "+gl_general.temp_monto_bs_cc);
}

function guardar_cuenta(){
	var nombre = document.getElementById("inputrs10");
	var desc = document.getElementById("inputrs11");
	var monto = document.getElementById("inputrs12");
	var mask = document.getElementById("text_maskrs12");

	var monto_a = gl_general.temp_monto_dol_cc;


	var gen_bs = gl_general.gen_bs;

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
	for (var j = 0; j<gl_general.cu_save_id; j++) {
		var save_tx = gl_general.cuentlist[j];
		if (save_tx!="") save_tx = save_tx.toLowerCase();
		else continue;
		result = save_tx.includes(titulo.toLowerCase());

		if(result){
			break;
		}
	}
	if(result) return alert("El Nombre de la Cuenta ya Existe!.");
	//if(gen_bs == 0) return alert("El Valor de Precio Dolar no Puede ser Cero!.");

	if(monto_a != "" && nombre.value != "" && desc.value != ""){

		var hoy = new Date();
		var curr_hora =  hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
		var curr_fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();

		gl_servicio.nombre = nombre.value;
		gl_servicio.desc = desc.value;

		gl_servicio.monto_dol = monto_a.toFixed(2);

		gl_servicio.monto_pagado = parseFloat(0).toFixed(2);								

		gl_servicio.fecha = curr_fecha;
		gl_servicio.hora = curr_hora;
		gl_servicio.estado = "Pagos Pendientes";

		gl_servicio.clave = gl_general.cu_save_id;
		agregar_cuenta(gl_servicio, gl_general.cu_save_id);				//Se guardan la informacion de Cuenta

		gl_general.cuentlist[gl_general.cu_save_id] = titulo;			//Titulo para la cuenta
		gl_general.etdtlist[gl_general.cu_save_id] = true;				//Estado de las cuentas
		gl_general.cu_save_id++;										//Se incrementa para la siguiente cuenta
		agregar_gene_datos(gl_general);									//Se guardan los datos Generales

		crear_datalist_cc();

		nombre.value = "";
		desc.value = "";
		monto.value = "";
		mask.value = "";

	}
	else alert("No se permiten valores Vacios!.");
}

function crear_datalist_cc() {
	var data_lista = document.getElementById("list_datacc");
	data_lista.innerHTML = "";
	//console.log("Finished:"+gl_general.cu_save_id)
	for (var j = 0; j <gl_general.cu_save_id; j++) {
		//console.log("Nr: "+j+" Name: "+gl_general.cuentlist[j]+" Estd: "+gl_general.etdtlist[j] );
		if(gl_general.etdtlist[j])
			data_lista.innerHTML += "<option value='"+gl_general.cuentlist[j]+"'>";
	}
}

