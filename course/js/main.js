
var list = [
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"1.99"},
    {"desc":"meat","amount":"1","value":"15.00"}
];


// Função vai retornar valor total da compra
function getTotal(list){
    var total = 0;
    for(var key in list){ // Percorre até o final
        total += list[key].value * list[key].amount; // total = variável acumulavel.    lista * valor
    }
    document.getElementById("totalValue").innerHTML = formatValue(total); // Alterar de 0 para valor real
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    // Percorrer a lista
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');" >Edit</button>  <button class="btn btn-default" onclick="deleteData('+key+');" >Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list); // Salvando setList em nosso local storage
}

// Formatando letras
function formatDesc(desc){
    var str = desc.toLowerCase(); // Tratando texto para minúsculo
    str = str.charAt(0).toUpperCase() + str.slice(1); // Primeiro caracter da string // Deixa-lo maiúsculo // Concatenar com restante
    return str;
}

function  formatAmount(amount){ // Tratando string, int etc
    return parseInt(amount);
}

function  formatValue(value){
    var str = parseFloat(value).toFixed(2) + ""; // Transformando em float // 2 casas
    str = str.replace(".",","); // Transformando o . em ,
    str = "$ " + str;
    return str;
}

// Adicionando dados
function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc , "amount":amount ,"value":value });
    setList(list);
}

// Atualizando dados
function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

// Resetando dados
function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validation()){ // se der negativo da return senao da update
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount": amount, "value":value };
    resetForm();
    setList(list);
}

// Deletando dados
function deleteData(id){
    if(confirm("Delete this item?")){ // Janela confirmação
        if(id === list.length - 1){ // Se ID for último registro da nossa lista
            list.pop();             // Eu vou excluir / limpar o registro do array
        }else if(id === 0){         // Senão se o ID for o primeiro item
            list.shift();           // Eu vou excluir / limpar o registro do array
        }else{                          // Se eu quiser deletar um ID do meio?          
            var arrAuxIni = list.slice(0,id); // Primeiro ID    
            var arrAuxEnd = list.slice(id + 1); // Vai pegar do index ate o final do array/lista
            list = arrAuxIni.concat(arrAuxEnd); // List vai receber o array inicial e concatenar com a função final
        }
        setList(list);
    }
}

// Validação strings etc
function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";
    if(desc === ""){ // se a descrição for vazia
        errors += '<p>Fill out description</p>'; // imprime
    }
    if(amount === ""){
        errors += '<p>Fill out a quantity</p>';
    }else if(amount != parseInt(amount)){
        errors += '<p>Fill out a valid amount</p>';
    }
    if(value === ""){
        errors += '<p>Fill out a value</p>';
    }else if(value != parseFloat(value)){
        errors += '<p>Fill out a valid value</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block"; // Desaparece quando resetar valor
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)"; // CSS
        document.getElementById("errors").style.color = "white"; 
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }
}

// Deletar lista
function deleteList(){
    if(confirm("Delete this list?")){
        list = []; // array de lista vazio
        setList(list); // setamos a lista com minha lista
    }
}

function saveListStorage(list){
    var jsonStr = JSON.stringify(list); // stringify transforma array em string formato json para que possamos salvar no local storage pois só aceita string
    localStorage.setItem("list",jsonStr); // salvando
}

function initListStorage(){
    var testList = localStorage.getItem("list"); // verificar se nossa lista existe para salvar no local storage, se nao existir ficará como null
    if(testList){ // se for válido
        list = JSON.parse(testList); // transformar de string para objeto/array novamente
    }
    // Atualizar dados
    setList(list); // Clica no botão e acrescenta novos dados na tabela HTML
}


initListStorage();