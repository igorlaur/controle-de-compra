var list = [
    // Lista
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"1.99"},
    {"desc":"meat","amount":"1","value":"15.00"}
];

// Função vai retornar valor total da compra
function getTotal(list){
    var total = 0;
    for(var key in list){ // percorre a lista até o final
        total += list[key].value * list[key].amount; // total = variável acumulavel.    lista * valor
    }
    return total;
}
console.log(getTotal(list));