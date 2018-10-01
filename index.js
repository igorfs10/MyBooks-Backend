const app = require('express')();
const http = require('http').createServer(app);
const config = require('./config')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


const books = [{"id":1, "titulo": "O pequeno principe",
                "descricao": "Significado do Livro O Pequeno Príncipe O Pequeno Príncipe é uma obra literária do escritor francês Antoine de Saint-Exupéry, que conta a história..."},
               {"id":2,"titulo": "50 tons de cinza",
               "descricao": "É a partir do encontro desses dois personagens que se constrói a trama central de Cinquenta Tons de Cinza. Dois arquétipos (no caso, clichês mesmo)"},
               {"id":3,"titulo": "Kotlin com Android", "descricao": "Neste livro, Kassiano Resende apresenta a linguagem Kotlin tanto para quem já conhece Java ou não, com uma didática prática e divertida."},
              ]


app.get("/" , function(req, res){
  const help = `
   <pre>
     Bem vindo a API de Livros
     Aqui você encontra os seguintes EndPoints:
     GET /books -> get all books
     GET /book/:id -> get one book by Id
   </pre>
   `

   res.send(help)
});

app.get("/books", (req, res) => {
  res.send(books)
});

app.get("/book/:id", (req, res) => {

  const book = books.filter( u => u.id == req.params.id  );

  if(book.length > 0)
      res.send(book[0])
  else
      res.send({})

});


http.listen( config.port, function(){
  console.log(`Servidor rodando na porta ${config.port}`);
});
