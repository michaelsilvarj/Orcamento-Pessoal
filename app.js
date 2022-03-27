//recuperação dados
class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano;
		this.mes = mes;
		this.dia = dia;
		this.tipo = tipo;
		this.descricao = descricao;
		this.valor = valor;

	}
	// Validação de dados
	validarDados(){
		for(let i in this){
			console.log(i  , this[i]) /* "i" Retorna os indices do Array ou atributos de 
											um determinado objeto, já o this[i] recupera 
											os atribuutos (equivalente a this.atributo) */

			if(this[i]== undefined || this[i]== '' || this[i] == null){
				return false;
			}
		} 
		return true;
	}
}



class BD{
	constructor(){
		let id = localStorage.getItem('id');

		// se for null, o id inicial será setado realiado no momento da construção do objeto BD
		if (id === null) {
			localStorage.setItem('id', 0);
		}
	}
	// verifica aonde inserir proximo valores
	getProximoId(){
		// recupera valores dentro do local storage contida na chave id
		let proximoId = localStorage.getItem('id');// null
		//Retorno da função para o getProximoId
		return parseInt(proximoId)+1;
	}
	// Armazenamento despesa (* cuidado o comando set sobrepõe)
	 gravar(d){
		//
		let id = this.getProximoId();
		localStorage.setItem(id , JSON.stringify(d));
		localStorage.setItem('id', id);
	}

	recuperarTodosRegistros(){

		// Array de despesa 

		let despesas = Array ();

		let id = localStorage.getItem('id');

		// recupera todas despesas cadastradas
		for(let i = 1; i <= id; i++){


				//Recupera a despesa
				let despesa = JSON.parse(localStorage.getItem(i));

				// Verifica se há indices que foram pulados / Excluídos
				if ( id === null) {	
					continue;//pula para interação seguinte
				}		
				despesas.push(despesa);//Array recebe elementos de despesa			
		}

		return despesas;
	}

	pesquisar(despesa){

		let despesasFiltradas = Array ();
		despesasFiltradas = this.recuperarTodosRegistros() // this

		console.log(despesa)

		console.log(despesasFiltradas)

		// Filtra as despesas

		if (despesa.ano != '') {
		despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano) /* despesa.ano - parametro despesa 
																	com let ano */
		}
		if (despesa.ano != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes) 
		}
		if (despesa.dia != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia) 
		}
		if (despesa.tipo != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo) 
		}
		if (despesa.descricao != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao) 
		}
		if (despesa.valor != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor) 
		}

		return despesasFiltradas
   }
}

bd = new BD ();

	
// Função de chamada de elementos
function cadastrarDespesa(){
	let ano = document.getElementById('ano');
	let mes = document.getElementById('mes');
	let dia = document.getElementById('dia');
	let tipo = document.getElementById('tipo');
	let descricao = document.getElementById('descricao');
	let valor = document.getElementById('valor');

		
	//  Definição da atribuição da instancia objeto despesa
	let despesa = new Despesa (
		ano.value, 
		mes.value, 
		dia.value, 
	    tipo.value,
	    descricao.value, 
	    valor.value
	);

	if(despesa.validarDados()){
		/*  dialog de sucesso */	

		//console.log('Dados validos');

		// chamada função local storage
		bd.gravar(despesa);
		// inner html insere texto nas tags html
		document.getElementById('modal_titulo').innerHTML = 'Registro efetuado com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML= 'Voltar';
		document.getElementById('modal_btn').className = 'btn btn-success';
		 
		ano.value = ""
		mes.value = ""
		dia.value = ""
		tipo.value = ""
		descricao.value = ""
		valor.value = ""
		
		$('#registraDespesa').modal('show'); // exibe modal

		}else{
		// dialog de erro	

		//console.log('Dados invalidos');
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os dados foram preenchidos corretamente'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
		document.getElementById('modal_btn').className = 'btn btn-danger';	
		$('#registraDespesa').modal('show'); // exibe modal
		
	}	
}

 function carregaListaDespesa( despesas = Array() , filtro = false){

 	 if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros() 
		//despesas.sort();
	}
 	
 	

 	// seleciona elemento <tbody> da tabela
 	let listaDespesas = document.getElementById('listaDespesas');
 	listaDespesas.innerHTML = '' 	
 	despesas.forEach(function(d){ // pecorre o array despesa listando-o de forma dinamica

 	// cria linhas <tr>
 	var linha = listaDespesas.insertRow();

 	// cria colunas <td>
 	linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

 	// ajuste quanto ao tipo
 	switch(parseInt(d.tipo)){

 		case 1: d.tipo = "Alimentação"
 				break;

 		case 2: d.tipo = "Educação"
 				break;		

 		case 3: d.tipo = "Saúde"
 				break;

 		case 4: d.tipo = "Lazer"
 				break;

 		case 5:	d.tipo = "Transporte"
 				break;

 	}
 	linha.insertCell(1).innerHTML = d.tipo;
 	linha.insertCell(2).innerHTML =d.descricao;
 	linha.insertCell(3).innerHTML =d.valor;
 	console.log(d)

 	});
 }


 function pesquisarDespesa(){
 	let ano = document.getElementById('ano').value;
	let mes = document.getElementById('mes').value;
	let dia = document.getElementById('dia').value;
	let tipo = document.getElementById('tipo').value;
	let descricao = document.getElementById('descricao').value;
	let valor = document.getElementById('valor').value;

	let despesa = new Despesa (ano, mes, dia, tipo, descricao, valor);

	let despesas = bd.pesquisar(despesa)  // recupera bd e aplica o metodo pesquisar

	


	this.carregaListaDespesas(despesas, true)

 }


