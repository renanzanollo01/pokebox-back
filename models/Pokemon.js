import mongoose from "mongoose";

const {Schema} = mongoose;


const pokemonSchema = new Schema(
  {
    especieId: {
      type: Number,
      required: [true, "A espécie é obrigatória"],
      min: [1, "Espécie inválida"],
    },

    especieNome: {
      type: String,
      required: [true, "O nome da espécie é obrigatório"],
      trim: true,
    },

    tipos: {
      type: [String],
      default: [],
    },

    apelido: {
      type: String,
      trim: true,
      maxlength: [20, "O apelido deve ter no máximo 20 caracteres"],
      default: "",
    },

    cp: {
      type: Number,
      required: [true, "O cp é obrigatório"],
      min: [10, "Força minima do pokemon tem que se maior que 1"],
      max: [10000, "Ta forte demais, baixa aí"],
    },

    ivAtaque: {
      type: Number,
      required: [true, "O IV de ataque é obrigatório"],
      min: [0, "O IV vai de 0 a 15"],
      max: [15, "O IV vai de 0 a 15"],
    },

    ivDefesa: {
      type: Number,
      required: [true, "O IV de defesa é obrigatório"],
      min: [0, "O IV vai de 0 a 15"],
      max: [15, "O IV vai de 0 a 15"],
    },

    ivResistencia: {
      type: Number,
      required: [true, "O IV de resistência é obrigatório"],
      min: [0, "O IV vai de 0 a 15"],
      max: [15, "O IV vai de 0 a 15"],
    },

    shiny: {
      type: Boolean,
      default: false,
    },

    dataCaptura: {
      type: Date,
      default: Date.now,
    },

    observacao: {
      type: String,
      trim: true,
      maxlength: [200, "A observação deve ter no máximo 200 caracteres"],
      default: "",
    },

    colecao: {
      type: Schema.Types.ObjectId,
      ref: "Colecao",
      required: [true, "O Pokémon precisa pertencer a uma coleção"],
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

pokemonSchema.virtual("ivPorcentagem").get(function () {
  const soma = this.ivAtaque + this.ivDefesa + this.ivResistencia;
  return Math.round((soma / 45) * 100);
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

export default Pokemon;