const express = require('express');
const bodyparser = require('body-parser');
const cors =  require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyparser.json());




// conexão com o banco de dados;

const db = mysql.createConnection({
    host: '169.254.17.12',
    user: 'godeve62_node',
    password:'matheus123',
    database: 'godeve62_node',
    port: 3306
});

db.connect(err =>{
    if(err){console.log(err, 'erro');}
    console.log('banco conectado ...');
});


// fim da conexão com o banco de dados;

// começo da tela de usuarios



// login
app.post('/login', (req, res)=>{
    let email = req.body.email;
    let senha = req.body.senha;
    
    console.log(email)
    let login = `select * from usuarios where(email = '${email}' and senha = '${senha}')`;
    db.query(login,(err, result)=>{
        if(err){
            console.log(err, 'erro');
        }

        if(result.length > 0){
            res.send({
                message: 'Usuario logado com sucesso.',
                data: result
            });
        }else{
            res.send({
                message: 'Email ou senha incorreta.',
                data: result
            });
        }
    });
});

// fim do login


app.get('/user', (req, res)=>{
    let users = `select * from usuarios`;
    db.query(users,(err, result)=>{
        if(err){
            console.log(err, 'erro');
        }

        if(result.length > 0){
            res.send({
                message: 'mostrando todos os dados do usuarios',
                data: result
            });
        }
    });
});

// fim do buscar



// buscar usuario pelo id

app.get('/user/:id', (req, res)=>{

    let id = req.params.id;

    let user = `select * from usuarios where id = ${id}`;


    db.query(user,(err, result)=>{
        if(err){
            console.log(err, 'erro');
        }

        if(result.length > 0){
            res.send({
                message: 'mostrando usuarios especifico',
                data: result
            });
        }

        if(result.length == 0){
            res.send({
                message: 'não encontramos esse usuario'
            })
        }
    });
});

// fim do busca pelo id





// cadastrar usuarios

app.post('/user', (req, res)=>{

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let telefone = req.body.telefone;

    let user = `select * from usuarios where (nome = '${nome}' or email = '${email}')`;


    db.query(user,(err, result)=>{
        if(err){
            console.log(err, 'erro');
        }

        if(result.length > 0){
            res.send({
                message: 'nome ou email já existe.',
            });
        }

        if(result.length == 0){

            let inserindo = `insert into usuarios(nome, email, senha, telefone) values ('${nome}', '${email}', '${senha}', '${telefone}')`;


            db.query(inserindo,(err, result)=>{
                if(err){
                    console.log(err, 'erro');
                }
        
                if(result){
                    res.send({
                        message: ' usuario cadastrado com sucesso!!',
                    });
                }
            });

        }
    });

    
});

// fim de cadastro de usuarios







// update de usuario

app.put('/user/:id', (req, res)=>{

    let id = req.params.id;

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let telefone = req.body.telefone;

    let editando = `update usuarios set nome = '${nome}', email = '${email}', senha = '${senha}', telefone = '${telefone}' where id = '${id}'`;


    db.query(editando,(err, result)=>{
        if(err){
            console.log(err, 'erro');
           
        }
            
        if(result.affectedRows == 1){
            res.send({
                message: 'usuario editado com sucesso!!',
            });
        }else{
            res.send({
                message: 'usuario não encontrado',
            });
        }
   

    });
});

// update de usuario



// delete usuario

app.delete('/user/:id', (req, res)=>{

    let id = req.params.id;
    let deletando = `delete from usuarios where id = ${id}`;


    db.query(deletando,(err, result)=>{
            if(err){
            console.log(err, 'erro');
          
            }

            if(result.affectedRows == 1){
                res.send({
                    message: ' usuario deletado com sucesso!!'
                });
            }else{
                res.send({
                    message: 'usuario não encontrado',
                });
            }
    });
});

// delete usuario


// fim da tela de usuarios



// começo da tela de jobs


// buscar todos os jobs

app.get('/jobs', (req, res)=>{
    let jobs = `select * from jobs`;
    db.query(jobs,(err, result)=>{
        if(err){
            console.log(err, 'erro');
        }

        if(result.length > 0){
            res.send({
                message: 'mostrando todos os dados do jobs',
                data: result
            });
        }
    });
});

// fim do buscar dos jobs



// buscar jobs especifico

app.get('/jobs/:id', (req, res)=>{

    let id = req.params.id;
    let job = `select * from jobs where id = ${id}`;
    db.query(job,(err, result)=>{
        if(err){
            console.log(err, 'erro');
        }

        if(result.length > 0){
            res.send({
                message: `mostrando job ${id}.`,
                data: result
            });
        }

        if(result.length == 0){
            res.send({
                message: `job com id ${id}, não encontrado.`,
            });
        }
    });
});

// fim da busca especifico




// criar jobs

app.post('/jobs', (req, res)=>{


    let nome = req.body.nome;
    let usuario = req.body.usuario;
    let status =  req.body.status;
    let tipoRecorrencia =  req.body.recorrencia;
    let valor = req.body.valor;
    let caso = req.body.caso;



    let add = `insert into jobs(nome, usuario, status, tipo_recorrencia, valor_recorrencia, caso) values('${nome}', '${usuario}', '${status}', '${tipoRecorrencia}', '${valor}', '${caso}')`;
    db.query(add,(err, result)=>{
        if(err){
            console.log(err, 'erro');
        }
            res.send({
                message: `${nome}, cadastrado com sucesso!!!`,
            });
    });
});

// fim de criar jobs





// update de jobs

app.put('/jobs/:id', (req, res)=>{

    let id = req.params.id;

    let nome = req.body.nome;
    let usuario = req.body.usuario;
    let status = req.body.status;
    let recorrencia = req.body.recorrencia;
    let valor = req.body.valor;
    let caso = req.body.caso;


    let editando = `update jobs set nome = '${nome}', usuario = '${usuario}', status = '${status}', tipo_recorrencia = '${recorrencia}', valor_recorrencia = '${valor}', caso = '${caso}' where id = '${id}'`;


    db.query(editando,(err, result)=>{
        if(err){
            console.log(err, 'erro');
          
        }

        if(result.affectedRows == 1){
            res.send({
                message: 'job editado com sucesso!!',
            });
        }else{
            res.send({
                message: 'job não encontrado',
            });
        }
            
   

    });
});

// update de jobs fim


// delete jobs

    app.delete('/jobs/:id', (req, res)=>{
        let id = req.params.id;

        let deletetando = `delete from jobs where id = ${id}`;

        db.query(deletetando,(error, result)=>{
            if(error){
                console.log(error)
            }

            if(result.affectedRows == 1){
                res.send({
                    menssage: `job deletado com sucesso.`
                })
            }else{
                res.send({
                    menssage: `job não encontrado.`
                })
            }
            
        })
    })


// fim de delete jobs


// fim da tela de jobs





app.listen(PORT, ()=>{
    console.log('server conectado')
})
