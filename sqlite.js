// Importa o módulo 'express', que é um framework web para Node.js.
// JANAINA CORREIA - ATV 2
//Importa o módulo "express", que é um framework web para Node.js
const express = require('express');

//Cria uma aplicação Express.
const app = express();

//Define a porta na qual o servidor vai escutar as requisições.
const port = 3000;

//Cria uma nova instância de banco de dados SQLite na memória.
// ':memory:' significa que o banco de dados será armazenado na RAM  e será perdido quando o processo terminar.
const db = new sqlite3.Database(':memory:');

//Consfigura o banco de dados e insere alguns dados de exemplo.
db.serialize(() => {
    //Cria uma nova tabeka chamada 'user' com duas colunas: 'id' e 'name'.
    db.run("CREATE TABLE user(id INT, name TEXT)");

    //Insere alguns registros de exemplo na tabela 'user'.
    const stmt = db.prepare('INSERT INTO user(id, name) VALUES(?,?)');
    stmt.run(1, 'Silvio Monte');
    stmt.run(2, 'Maria José');
    stmt.finalize();
});

//Define uma rota GET para '/users'que retorna todos os registros da tabela 'user' como JSON.
app.get('/users', (req, res) => {
    //Execeuta uma consulta SQL para selecionar todos os registros da tabela 'user'.
    db.all("SELECT * FROM user", [], (err, rows) => {
        if (err) {
            //Se ocorrer um erro, lança uma exceção.
            throw err;
        }
        //Envia a resposta como JSON com os dados obtidos.
        res.json(rows);
    });
});

//Inicia o servidor e faz com que ele escute na porta especificada.
app.listen(port, () => {
    console.log('Servidor rodando em http:/localhost:${port}');
});