import express from "express";
import colecoesRouter from "./routes/colecoes.js"
import pokemonsRouter from "./routes/pokemons.js"; 
import cors from "cors"
import "./db.js"

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json());

app.use("/colecoes", colecoesRouter);
app.use("/pokemons", pokemonsRouter); 

// console.log(process.env.MONGO_URI)
// ── TRATAMENTO CENTRAL DE ERROS ───────────────────────────
// 4 parâmetros = middleware de erro. Precisa vir DEPOIS das rotas.
app.use((err, req, res, next) => {
  // Dado reprovado pelo Schema (required, enum, maxlength)
  if (err.name === "ValidationError") {
    const menssagens = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ erro: "Dados inválidos", detalhes: menssagens})
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
