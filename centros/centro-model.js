const mongoose = require("mongoose");

const { Schema } = mongoose;

const centroSchema = new Schema({
  NOME_CENTRO: {
    type: String,
    require: true,
  },
  NOME_CURTO: {
    type: String,
    require: true,
  },
  CNPJ_CENTRO: {
    type: String,
    require: true,
  },
  DATA_FUNDACAO: {
    type: String,
    require: true,
  },
  REGIONAL: {
    type: Schema.Types.ObjectId,
    ref: "regional",
  },
  ENDERECO: {
    type: String,
    require: true,
  },
  NUMERO_ENDERECO: {
    type: String,
    require: true,
  },
  COMPLEMENTO: {
    type: String,
    require: true,
  },
  CEP: {
    type: String,
    require: true,
  },
  BAIRRO: {
    type: String,
    require: true,
  },
  CIDADE: {
    type: String,
    require: true,
  },
  ESTADO: {
    type: String,
    require: true,
  },
  PAIS: {
    type: String,
    require: true,
  },
  PRESIDENTE_ID: {
    type: String,
    require: false,
  },
  ASSISTIDOS: {
    type: Number,
    required: false,
  },
  VOLUNTARIOS: {
    type: Number,
    required: false,
  },
  PRELETORES: {
    type: Number,
    required: false,
  },
  ENTREVISTADORES: {
    type: Number,
    required: false,
  },
  FUNCIONAMENTO: {
    SEGUNDA: [Number],
    TERCA: [Number],
    QUARTA: [Number],
    QUINTA: [Number],
    SEXTA: [Number],
    SABADO: [Number],
    DOMINGO: [Number],
  },
});

module.exports = {
  model: mongoose.model("centro", centroSchema),
  populate: ["REGIONAL"],
};
