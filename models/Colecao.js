import mongoose from "mongoose";

const {Schema} = mongoose;

const ICONES = ["raio", "estrela", "lixeira", "coracao", "escudo", "folha", "chama", "gota"];
const CORES = ["azul", "rosa", "verde", "roxo", "laranja", "ciano"];

const colecaoSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório"],
      trim: true,
      maxlength: [30, "O nome deve ter no máximo 30 caracteres"],
    },

    icone: {
      type: String,
      required: [true, "O ícone é obrigatório"],
      enum: { values: ICONES, message: "Ícone inválido: {VALUE}" },
    },

    cor: {
      type: String,
      required: [true, "A cor é obrigatória"],
      enum: { values: CORES, message: "Cor inválida: {VALUE}" },
    },

    descricao: {
      type: String,
      trim: true,
      maxlength: [120, "A descrição deve ter no máximo 120 caracteres"],
      default: "",
    },
  },

  { timestamps: true }
);

const Colecao = mongoose.model("Colecao", colecaoSchema);

export { ICONES, CORES };
export default Colecao;