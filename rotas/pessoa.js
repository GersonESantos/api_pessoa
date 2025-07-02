// Importar o Express
const express = require('express');

// Criar o objeto router, responsável por gerenciar nossas rotas
const router = express.Router(); 

// VETOR, ÍNDICE PARA CADASTRO E ROTAS
// Vetor de pessoas com código, nome, idade e cidade
let pessoas = [
  { "codigo": 1, "nome": "Ana Souza", "idade": 28, "cidade": "São Paulo" },
  { "codigo": 2, "nome": "Bruno Oliveira", "idade": 34, "cidade": "Rio de Janeiro" },
  { "codigo": 3, "nome": "Carla Mendes", "idade": 22, "cidade": "Belo Horizonte" },
  { "codigo": 4, "nome": "Diego Lima", "idade": 40, "cidade": "Curitiba" },
  { "codigo": 5, "nome": "Eduarda Costa", "idade": 30, "cidade": "Porto Alegre" },
  { "codigo": 6, "nome": "Felipe Rocha", "idade": 26, "cidade": "Brasília" },
  { "codigo": 7, "nome": "Gabriela Martins", "idade": 31, "cidade": "Recife" },
  { "codigo": 8, "nome": "Henrique Silva", "idade": 29, "cidade": "Fortaleza" },
  { "codigo": 9, "nome": "Isabela Ferreira", "idade": 25, "cidade": "Salvador" },
  { "codigo": 10, "nome": "João Pedro Ramos", "idade": 33, "cidade": "Natal" }
];
let indiceCadastro = 11

// Define uma rota GET para o caminho raiz ("/") 
router.get('/', (req, res) => {
    
    res.status(200).json(pessoas);
        
});

// Rota para exibir uma pessoa específica através do código
router.get('/:codigo', (req, res) => {
  // Obter o código
  const codigo = parseInt(req.params.codigo);

  // Localizar o objeto
  const pessoa = pessoas.find(obj => obj.codigo == codigo);

  // Exibir pessoa
  if(pessoa){
    res.status(200).json(pessoa);
  }else{
    res.status(404).json({mensagem:'Pessoa não encontrada.'});
  }
});
// Rota para cadastrar pessoas   
router.post('/', (req, res) => {
  // Extrair as características do objeto
  const { nome, idade, cidade } = req.body;

  // Caso o nome, idade ou cidade não sejam informados, retorna um status 400
  if (!nome || !idade || !cidade) {
    return res.status(400).json({ mensagem: "Nome, idade e cidade são obrigatórios." });
  }

  // Criar nova pessoa
  const novaPessoa = {
    codigo: indiceCadastro,
    nome,
    idade,
    cidade
  };

  // Incrementar variável indiceCadastro
  indiceCadastro++;

  // Adicionar ao vetor
  pessoas.push(novaPessoa);

  // Retornar a nova pessoa
  res.status(201).json(novaPessoa);
});

// Rota para atualizar todas as informações de uma pessoa
router.put('/:codigo', (req, res) => {
  // Extrair o código enviado via parâmetro
  const codigo = parseInt(req.params.codigo);

  // Localizar o indice da pessoa com o código recebido via parâmetro
  const indicePessoa = pessoas.findIndex(p => p.codigo === codigo);

  // Caso não encontrar a pessoa
  if (indicePessoa == -1) {
    return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
  }

  // Extrair as características do objeto enviado
  const { nome, idade, cidade } = req.body;

  // Caso o nome, idade ou cidade não sejam informados, retorna um status 400
  if (!nome || !idade || !cidade) {
    return res.status(400).json({ mensagem: 'Nome, idade e cidade são obrigatórios para PUT.' });
  }

  // Criar nova pessoa
  pessoas[indicePessoa] = {
    codigo,
    nome,
    idade,
    cidade
  };

  // Retorna a pessoa com todas as características atualizadas
  res.status(200).json(pessoas[indicePessoa]);
});

// Rota para atualizar pacialmente as informações de uma pessoa
router.patch('/:codigo', (req, res) => {
  // Extrair o código enviado via parâmetro
  const codigo = parseInt(req.params.codigo);

  // Localizar a pessoa através do código
  const pessoa = pessoas.find(p => p.codigo === codigo);

  // Caso não encontrar a pessoa
  if (!pessoa) {
    return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
  }

  // Extrair as características do objeto enviado
  const { nome, idade, cidade } = req.body;

  // As características que não forem informadas, manteremos as atuais
  if (nome !== undefined)   pessoa.nome = nome;
  if (idade !== undefined)  pessoa.idade = idade;
  if (cidade !== undefined) pessoa.cidade = cidade;

  // Retorna um objeto do tipo pessoa
  res.status(200).json(pessoa);
});


 // - Remover pessoa pelo código
router.delete('/:codigo', (req, res) => {
  // Extrair o código enviado via parâmetro
  const codigo = parseInt(req.params.codigo);

  // Localizar o indice da pessoa com o código recebido via parâmetro
  const indicePessoa = pessoas.findIndex(p => p.codigo === codigo);

  // Caso não encontrar a pessoa
  if (indicePessoa == -1) {
    return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
  }

  // Remover pessoa
  pessoas.splice(indicePessoa, 1);

  // Retornar mensagem, informando que a pessoa foi removida
  res.status(200).json({ mensagem: 'Pessoa removida com sucesso.'});
});

// Exportar rotas
module.exports = router;




