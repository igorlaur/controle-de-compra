var list = [
    // Lista
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
    return total;
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    // Percorrer a lista
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ list[key].amount +'</td><td>'+ formatValue(list[key].value) +'</td><td>Edit | Delete</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

function formatDesc(desc){
    var str = desc.toLowerCase(); // Tratando texto para minúsculo
    str = str.charArt(0).toUpperCase() + str.slice(1); // Primeiro caracter da string // Deixa-lo maiúsculo // Concatenar com restante
    return str;
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2) + ""; // Transformando em float // 2 casas
    str = str.replace(".", ","); // Transformando o . em ,
    str = "$ " + str; 
    return str;
}

function addData(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc , "amount":amount , "value":value});
    setList(list); // clica botão e acrescenta novos dados na tabela no html
}

setList(list);
console.log(getTotal(list));