import express from "express";
import Pokemon from "../models/Pokemon.js";

const router = express.Router();

// Busca um pokemon pelo id
router.get("/:id", async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id);

  if (!pokemon) {
    return res.status(404).json({ erro: "Pokemon não encontrado" });
  }

  res.status(200).json(pokemon);
});

//criação de uma colecao nova
router.post("/", async (req, res) => {
  const novoPokemon = await Pokemon.create(req.body)
  res.status(201).json(novoPokemon);
});

//atualização do pokemon com put
router.put("/:id", async (req, res) => {
  const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

  if (!pokemon) {
    return res.status(404).json({ erro: "Pokemon não encontrado" });
  }

  res.status(200).json(pokemon);
});

//deletar pokemon
router.delete("/:id", async (req, res) => {
  const pokemon = await Pokemon.findByIdAndDelete(req.params.id);

  if (!pokemon) {
    return res.status(404).json({ erro: "Pokemon não encontrado" });
  }

  res.status(204).end();
});

export default router