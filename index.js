import express from "express";
import Colecao from "./models/Colecao.js";
import Pokemon from "./models/Pokemon.js";
import cors from "cors"
import "./db.js"

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json());

// console.log(process.env.MONGO_URI)
//lista as colecoes
app.get("/colecoes", async (req, res) => {
  const colecoes = await Colecao.find().sort({createdAt: -1}).lean();

  const comContagem = await Promise.all(
    colecoes.map(async (colecao) => {
      const total = await Pokemon.countDocuments({ colecao: colecao._id});
      return { ...colecao, totalPokemon: total }
    })
  )
  res.status(200).json(comContagem);
});

// Busca uma colecao pelo id
app.get("/colecoes/:id", async (req, res) => {
  const colecao = await Colecao.findById(req.params.id);

  if (!colecao) {
    return res.status(404).json({ erro: "Coleção não encontrada" });
  }

  res.status(200).json(colecao);
});

//criação de uma colecao nova
app.post("/colecoes", async (req, res) => {
  const novaColecao = await Colecao.create(req.body)
  res.status(201).json(novaColecao);
});

//atualização da coleção com put
app.put("/colecoes/:id", async (req, res) => {
  const colecao = await Colecao.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

  if (!colecao) {
    return res.status(404).json({ erro: "Coleção não encontrada" });
  }

  res.status(200).json(colecao);
});

//deletar colecao
app.delete("/colecoes/:id", async (req, res) => {
  const colecao = await Colecao.findByIdAndDelete(req.params.id);

  if (!colecao) {
    return res.status(404).json({ erro: "colecao não encontrada" });
  }

  res.status(204).end();
});

//lista os pokemons
app.get("/colecoes/:id/pokemons", async (req, res) => {
  const pokemons = await Pokemon.find({ colecao: req.params.id }).sort({createdAt: -1});
  res.status(200).json(pokemons);
});

// Busca um pokemon pelo id
app.get("/pokemons/:id", async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id);

  if (!pokemon) {
    return res.status(404).json({ erro: "Pokemon não encontrado" });
  }

  res.status(200).json(pokemon);
});

//criação de uma colecao nova
app.post("/pokemons", async (req, res) => {
  const novoPokemon = await Pokemon.create(req.body)
  res.status(201).json(novoPokemon);
});

//atualização do pokemon com put
app.put("/pokemons/:id", async (req, res) => {
  const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

  if (!pokemon) {
    return res.status(404).json({ erro: "Pokemon não encontrado" });
  }

  res.status(200).json(pokemon);
});

//deletar pokemon
app.delete("/pokemons/:id", async (req, res) => {
  const pokemon = await Pokemon.findByIdAndDelete(req.params.id);

  if (!pokemon) {
    return res.status(404).json({ erro: "Pokemon não encontrado" });
  }

  res.status(204).end();
});

// ── TRATAMENTO CENTRAL DE ERROS ───────────────────────────
// 4 parâmetros = middleware de erro. Precisa vir DEPOIS das rotas.
app.use((err, req, res, next) => {
  // Dado reprovado pelo Schema (required, enum, maxlength)
  if (err.name === "ValidationError") {
    const messagens = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ erro: "Dados inválidos", detalhes: messagens})
  }

  if (err.name === "CastError") {
    return res.status(400).json({erro: "ID invalido"})
  }

  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
