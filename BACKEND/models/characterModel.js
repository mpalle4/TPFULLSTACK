const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const characterSchema = new Schema(
  {
    characterId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    faceImage: {
      type: String,
      required: true,
    },
    upperBody: {
      type: String,
      required: true,
    },
    lowerBody: {
      type: String,
      required: true,
    },
    shoes: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usr", //
      required: true,
    },
  },
  { timestamps: true }
).set("toJSON", {
  transform: (document, object) => {
    object.id = document.id;
    delete object._id;
    delete object.characterID;
  },
});

const Character = mongoose.model("character", characterSchema);
module.exports = Character;
