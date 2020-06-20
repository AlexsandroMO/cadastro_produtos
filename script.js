

//Criar validações


//document.getElementById("option1").style.display = "block";

function limpaAll(){

  //console.log("Hello");
  //setTimeout(() => { console.log("World!"); }, 2000);
  //console.log("Goodbye!");

}

var recarregou = sessionStorage.getItem("recarregou");

// verifica que a página foi atualizada
if (recarregou) {
    sessionStorage.removeItem("recarregou"); // remove a variável
    mostrarr(); // executa sua função
    console.log('Foi')
}


function mostrar(){

  recarregarPagina();

}


function recarregarPagina() {
  sessionStorage.setItem("recarregou", "true"); // antes de atualizar, você seta uma variável no sessionStorage como true
  window.location.reload(); // atualiza a página
}


function mostrarr(){

  //limpaAll()
  
  var tabela = document.createElement("table");
  var titulo = document.querySelector("h3#alinha-h3");

  //tabela.innerHTML = clear.innerHTML

  titulo.innerHTML = 'Estoque de Produtos'

  tabela.appendChild(montatHead());
  tabela.appendChild(montatBody());

  tabela.classList.add('table');

  document.getElementById("new-table").appendChild(tabela);

}


function montatHead(){
    var cabecalho = document.createElement("thead");

    dado = '<th scope="col">Editar</th>\
            <th scope="col">Nome</th>\
            <th scope="col">Fornecedor</th>\
            <th scope="col">Quantidade</th>\
            <th scope="col">Categoria</th>\
            <th scope="col">Preço</th>'

    cabecalho.innerHTML = dado;
    cabecalho.classList.add('thead-dark');
    return cabecalho;
}

function montatBody(){

  var db = openDatabase("myDB", "2.0", "Mybase", 2 * 4048 * 4048);

  var corpo = document.createElement("tbody");

  db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado) {
          var rows = resultado.rows;
          var tr = '';
          for(var i = 0; i < rows.length; i++){
                  tr += '<tr>';
                  tr += '<td onclick="chamaId('+ rows[i].id  +')"><i class="fas fa-edit"></i></td>';
                  tr += '<td>' + rows[i].nome + ' </td>';
                  tr += '<td>' + rows[i].fornecedor + ' </td>';
                  tr += '<td>' + rows[i].qt + ' </td>';
                  tr += '<td>' + rows[i].cat + ' </td>';
                  tr += '<td>' + rows[i].pre + ' </td>';
                  tr += '</tr>'; 

          }
          corpo.innerHTML = tr;
          
      }, null);
  });

  corpo.classList.add('tbody-class');
  return corpo;
  
}
 



//=============================


var db = openDatabase("myDB", "2.0", "Mybase", 2 * 4048 * 4048);

// document.getElementById('bt2').addEventListener('click', salvar);

function salvar(){

  status = decidir()

  console.log(status)

  if (status){

    db.transaction(function(tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS myTable (id INTEGER PRIMARY KEY,nome TEXT,fornecedor TEXT, qt INTEGER, cat TEXT, pre INTEGER)");
    });

    cadastro()
    
  }
  
}

function cadastro(){

  var nome = document.getElementById("nome").value;
  var fornecedor = document.getElementById("fornecedor").value;
  var qt = document.getElementById("qt").value;
  var cat = document.getElementById("cat").value;
  var pre = document.getElementById("pre").value;

  result = `${nome} | ${fornecedor} | ${qt} | ${cat} | ${pre}`
  console.log('foi: ', result)
  
  db.transaction(function(tx) {
    console.log('ta difícil')
    tx.executeSql('INSERT INTO myTable (nome,fornecedor,qt,cat,pre) VALUES (?, ?, ?, ?, ?)', [nome,fornecedor,qt,cat,pre]);
  });

  //location.reload()
  mostrarr();

}

function chamaId(id){

  console.log('ID: ', id)

  var id_filed = document.getElementById("field-id")
  var nome = document.getElementById("nome")
  var fornecedor = document.getElementById("fornecedor")
  var qt = document.getElementById("qt")
  var cat = document.getElementById("cat")
  var pre = document.getElementById("pre")

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado) {
        var rows = resultado.rows;

        id_filed.value = rows[id-1].id;
        nome.value = rows[id-1].nome;
        fornecedor.value = rows[id-1].fornecedor;
        qt.value = rows[id-1].qt;
        cat.value = rows[id-1].cat;
        pre.value = rows[id-1].pre;
        
    }, null);
});
 
}

function altera(){

  var id_filed = document.getElementById("field-id").value
  var nome = document.getElementById("nome").value
  var fornecedor = document.getElementById("fornecedor").value
  var qt = document.getElementById("qt").value
  var cat = document.getElementById("cat").value
  var pre = document.getElementById("pre").value

  console.log(id_filed)

  db.transaction(function(tx) {
    tx.executeSql('UPDATE myTable SET nome=?, fornecedor=?, qt=?, cat=?, pre=? WHERE id=?', [nome,fornecedor,qt,cat,pre,id_filed],null);
  });


}


function deletar(){
    
  var id = document.getElementById('field-id').value;
  
  db.transaction(function(tx) {
      tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
  });
  
  location.reload()

}



function decidir(){
  var status;
  var nota;
  var teste = confirm("Deseja Realemente Adicionar Itens?");

  console.log('treste: ', teste)

  if (teste == true){
    nota ="itens Serão Adicionados";
    status = true

  }else{
    nota ="ok, Não Vou Salvar!";
    status = false
  }

  alert(innerHTML = nota);

  return status

}





//=========================





/*
//console.log('funcionou')
//alert('funcionou')

var recarregou = sessionStorage.getItem("recarregou");

// verifica que a página foi atualizada
if (recarregou) {
    sessionStorage.removeItem("recarregou"); // remove a variável
    showAll(); // executa sua função
    console.log('Foi!')
}

function recarregarPagina() {
  sessionStorage.setItem("recarregou", "true"); // antes de atualizar, você seta uma variável no sessionStorage como true
  window.location.reload(); // atualiza a página
}

function mostrar(){

  recarregarPagina();

}


var db = openDatabase('myDB', '2.0', 'Mybase', 1024);

function salvar(){

  let status = decidir()

  console.log('ESTATUS: ',status)

  if (status == true){

    db.transaction(function(tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS myTable (id INTEGER PRIMARY KEY,nome TEXT,fornecedor TEXT, qt INTEGER, cat TEXT, pre INTEGER)");
    });

    console.log('Entrou')
    var nome = document.getElementById('nome').value
    var fornecedor = document.getElementById("fornecedor").value;
    var qt = document.getElementById("qt").value;
    var cat = document.getElementById("cat").value;
    var pre = document.getElementById("pre").value;

    result = `${nome} | ${fornecedor} | ${qt} | ${cat} | ${pre}`

    console.log(result)

    db.transaction(function (tx){
      tx.executeSql('INSERT INTO myTable (nome,fornecedor,qt,cat,pre) VALUES (?, ?, ?, ?, ?)', [nome,fornecedor,qt,cat,pre])
    })

    mostrar()

  }

}

function showAll(){
    recarregarPagina();
  //new-table

  var tabela = document.createElement('table')
  var titulo = document.getElementById('alinha-h3')
  var cabecalho = document.createElement('thead')

  var dados = '<th scope="col">Codigo</th>\
              <th scope="col">Nome</th>\
              <th scope="col">Fornecedor</th>\
              <th scope="col">Quantidade</th>\
              <th scope="col">Categoria</th>\
              <th scope="col">Preço</th>'

  titulo.innerHTML = 'Estoque de Produtos'

  cabecalho.innerHTML = dados
  cabecalho.classList.add('thead-dark')
  tabela.classList.add('table')

  tabela.appendChild(cabecalho)
  tabela.appendChild(montaBody())

  document.getElementById('new-table').appendChild(tabela)

}

function montaBody(){
  var corpo = document.createElement('tbody')

  db.transaction(function (tx){
    tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado){
      var rows = resultado.rows
      var tr = ''

      for (let i=0;i<rows.length;i++){
        tr += '<tr>';
          tr += '<td onclick="chamaId('+ rows[i].id  +')">' + rows[i].id + '</td>';
          tr += '<td>' + rows[i].nome + ' </td>';
          tr += '<td>' + rows[i].fornecedor + ' </td>';
          tr += '<td>' + rows[i].qt + ' </td>';
          tr += '<td>' + rows[i].cat + ' </td>';
          tr += '<td>' + rows[i].pre + ' </td>';
          tr += '</tr>'; 
      }
      corpo.innerHTML = tr

  }, null);

  });

  return corpo;

}

function chamaId(id){
  console.log('ID: ', id)

  var id_filed = document.getElementById("field-id")
  var nome = document.getElementById("nome")
  var fornecedor = document.getElementById("fornecedor")
  var qt = document.getElementById("qt")
  var cat = document.getElementById("cat")
  var pre = document.getElementById("pre")

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado) {
        var rows = resultado.rows;

        id_filed.value = rows[id-1].id;
        nome.value = rows[id-1].nome;
        fornecedor.value = rows[id-1].fornecedor;
        qt.value = rows[id-1].qt;
        cat.value = rows[id-1].cat;
        pre.value = rows[id-1].pre;
        
    }, null);
  });

}

function alterar(){
  var id_filed = document.getElementById("field-id").value
  var nome = document.getElementById("nome").value
  var fornecedor = document.getElementById("fornecedor").value
  var qt = document.getElementById("qt").value
  var cat = document.getElementById("cat").value
  var pre = document.getElementById("pre").value

  db.transaction(function(tx) {
    tx.executeSql('UPDATE myTable SET nome=?, fornecedor=?, qt=?, cat=?, pre=? WHERE id=?', [nome,fornecedor,qt,cat,pre,id_filed],null);
  });

}

function deletar(){
    
  var id_lido = document.getElementById('field-id').value;
  
  db.transaction(function(tx) {
      tx.executeSql("DELETE FROM myTable WHERE id=?", [id_lido]);
  });
  
  location.reload()

}

function decidir(){
  var status;
  var nota;
  var teste = confirm('Deseja Realmnte Adicionar Itens?')

  if (teste == true){
    nota = 'Itens Serão Adicionados'
    status = true
  }else{
    nota = 'Ok, Não vou Salvar'
    status = false
  }

  alert(innerHTML = nota)

  return status
}

*/
