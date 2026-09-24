import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let colecoes = [
    { id: 1, nome: 'Quero Evoluir', icone: 'raio',    cor: 'azul',     descricao: 'Esperando candy' },
  { id: 2, nome: 'Transferir',    icone: 'lixeira', cor: 'vermelho', descricao: 'CP baixo' },
];

let proximoId = 3;

//lista as colecoes
app.get('/colecoes', (req, res) => {
  res.status(200).json(colecoes)
})

// Busca uma colecao pelo id
app.get('/colecoes/:id', (req, res) => {
  const id = Number(req.params.id);
  const colecao = colecoes.find((c) => c.id === id);

  if (!colecao) {
    return res.status(404).json({erro: 'Coleção não encontrada' });
  }

  res.status(200).json(colecao);
});

//criação de uma colecao nova
app.post('/colecoes', (req, res) => {
  const { nome, icone, cor , descricao } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome é obrigatório' })
  }
  const novaColecao = {id: proximoId++, nome, icone, cor, descricao };
  colecoes.push(novaColecao)

  res.status(201).json(novaColecao)
})

//atualização da coleção com put
app.put('/colecoes/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = colecoes.findIndex((c) => c.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Coleção não encontrada' })
  }

  const { nome, icone, cor , descricao } = req.body;

  if (!nome) {
    return res.status(400).json({erro: 'O campo nome é obrigatório'})
  }

  colecoes[indice] = {id, nome, icone, cor, descricao}

  return res.status(200).json(colecoes[indice])
});

//deletar colecao
app.delete('/colecoes/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = colecoes.findIndex((c) => c.id === id);

  if(indice === -1){
    return res.status(404).json({ erro: 'colecao não encontrada'});
  }

  colecoes.splice(indice, 1);

  res.status(204).end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});