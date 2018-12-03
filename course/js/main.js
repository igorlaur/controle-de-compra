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
        table += '<tr><td>'+ list[key].desc +'</td><td>'+ list[key].amount +'</td><td>'+ list[key].value +'</td><td>Edit | Delete</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

setList(list);
console.log(getTotal(list));