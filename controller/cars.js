const carsModel = require("../model/cars.schema");

const addCarsByOwner = (req, res) => {
  const { owner_id, company_name, modal_name, price, bookedStatus } = req.body;
  const carsObj = {
    owner_id: owner_id,
    company_name: company_name,
    modal_name: modal_name,
    price: price,
    bookedStatus: bookedStatus,
  };
  console.log(carsObj);
  carsModel(carsObj)
    .save()
    .then((data) => {
      res.send({ message: "cars info inserted successfully", data });
    })
    .catch((err) => {
      res.send({ message: "cars details not added", err });
    });
};

const bookCarsByRenters = async (req, res) => {
  const { id, renter_id, bookedStatus } = req.body;
  const updateRenterObj = {
    id: id,
    renter_id: renter_id,
    bookedStatus: bookedStatus,
  };
  console.log(updateRenterObj);
  carsModel
    .updateOne(
      { _id: id },
      { $set: { renter_id: renter_id, bookedStatus: bookedStatus } }
    )
    .then((data) => {
      res.send({ message: "car succefully booked", data });
    })
    .catch((err) => {
      res.send({ message: "car not booked", err });
    });
};

const findBookedCarDetails = (req, res) => {
  //const { id } = req.body;
  carsModel
    .find({})
    .populate("owner_id")
    .populate("renter_id")
    .then((data) => res.send(data));
};
// carsModel.find().then((data) => {
//   console.log(data);
//   res.send({ message: data })).catch((err) => {
//     res.send({ message: err });
//   });
// });
//};

module.exports = { addCarsByOwner, bookCarsByRenters, findBookedCarDetails };
