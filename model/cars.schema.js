const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carsSchema = new Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    renter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    company_name: {
      type: String,
      required: true,
    },
    modal_name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    bookedStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const carsModel = mongoose.model("cars", carsSchema);

module.exports = carsModel;
