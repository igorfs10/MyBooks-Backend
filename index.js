//npm install express
const app = require("express")();
const http = require("http").createServer(app);
const bodyParser = require("body-parser");

//para pegar dados via post
app.use(bodyParser.urlencoded({extended:true}));

//{nome: kassiano, email: gmail}
app.use(bodyParser.json());

//nome=kassiano&email=gmail
app.use(bodyParser.urlencoded({
	extended:true
}));

let alunos = [{
		"id": 1,
		"nome": "Francisco",
		"data_nascimento": 20000125,
		"matricula" : 20858300,
		"cpf" : "711.301.300-70",
		"notas": [10.0, 8.2, 7.5]
		},
		{
		"id": 2,
		"nome": "Juliano",
		"data_nascimento": 20000920,
		"matricula" : 20858301,
		"cpf" : "832.407.200-70",
		"notas": [9.0, 5.2, 7.5]
		}];

let ultimoId = 2;

app.get("/", (req, res) => {
	
	const help = `
<pre>
	Welcome to the API of SENAI Jandira =D
</pre>
`;
	res.send(help);
});

app.post("/novo", (req, res) =>{
	ultimoId++;
	const id = ultimoId;
	const nome = req.body.nome;
	const data_nascimento = req.body.data_nascimento;
	const matricula = req.body.matricula;
	const cpf = req.body.cpf;
	const notas = [];
	
	const novoAluno = {id, nome, data_nascimento, matricula, cpf, notas};
	alunos.push(novoAluno);
	
	res.send({ "sucesso": true , "msg" : "Adicionado com sucesso" });
});

app.get("/aluno/:id", (req, res) => {
	const aluno = alunos.filter(a => a.id == req.params.id);
	res.send(aluno);
});

app.get("/alunos", (req, res) => {
	res.send(alunos);
});

app.get("/deletar/:id", (req, res) =>{
	alunos = alunos.filter(a => a.id != req.params.id);
	res.send({ "sucesso": true , "msg" : "Removido com sucesso"});
});

app.post("/avaliar", (req, res) =>{
	const id = req.body.id;
	const nota = parseFloat(req.body.nota);
	
	const index = alunos.findIndex(i => i.id == id);
	alunos[index].notas.push(nota);
		
	res.send({ "sucesso": true , "msg" : "Avaliado com sucesso"});
});

app.get("/media/:id", (req, res) =>{
	const index = alunos.findIndex(i => i.id == req.params.id);
	const aluno = alunos[index];
	//var sum = rockets.reduce( function( prevVal, elem ) {
    //return prevVal + elem.launches;
	//}, 0 );
	res.send({ "id": aluno.id , "media": 8.5 });
});

http.listen(5001, () =>{
	console.log("Servidor escutando na porta 5001");
});