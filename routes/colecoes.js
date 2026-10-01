import express from "express";
import Colecao from "../models/Colecao.js";
import Pokemon from "../models/Pokemon.js";

const router = express.Router();

//lista as colecoes
router.get("/", async (req, res) => {
  const colecoes = await Colecao.find().sort({createdAt: -1}).lean();

  const comContagem = await Promise.all(
    colecoes.map(async (colecao) => {
      const total = await Pokemon.countDocuments({ colecao: colecao._id});
      return { ...colecao, totalPokemons: total }
    })
  )
  res.status(200).json(comContagem);
});

// Busca uma colecao pelo id
router.get("/:id", async (req, res) => {
  const colecao = await Colecao.findById(req.params.id);

  if (!colecao) {
    return res.status(404).json({ erro: "Coleção não encontrada" });
  }

  res.status(200).json(colecao);
});

//lista os pokemons
router.get("/:id/pokemons", async (req, res) => {
  const pokemons = await Pokemon.find({ colecao: req.params.id }).sort({createdAt: -1});
  res.status(200).json(pokemons);
});

//criação de uma colecao nova
router.post("/", async (req, res) => {
  const novaColecao = await Colecao.create(req.body)
  res.status(201).json(novaColecao);
});

//atualização da coleção com put
router.put("/:id", async (req, res) => {
  const colecao = await Colecao.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

  if (!colecao) {
    return res.status(404).json({ erro: "Coleção não encontrada" });
  }

  res.status(200).json(colecao);
});

//deletar colecao
router.delete("/:id", async (req, res) => {
  const colecao = await Colecao.findByIdAndDelete(req.params.id);

  if (!colecao) {
    return res.status(404).json({ erro: "colecao não encontrada" });
  }

  res.status(204).end();
});

export default router