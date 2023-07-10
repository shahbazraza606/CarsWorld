
const Car = require('../Model/carsModel');




const createcar = (req, res) => {

  console.log(req.file);


  const newCar = new Car({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    image: req.file.filename,
  });


  newCar.save()
    .then(() => {
      res.json({ message: 'Car uploaded successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error In Uploading' });
    });
};
const getcars = (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const carsPerPage = 3;

  Car.find()
    //  .sort({ name: 1 })
    .skip(page * carsPerPage)
    .limit(carsPerPage)
    .then((cars) => {
      res.status(200).json({ message: "Here is the car info", cars: cars });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error In Fetching' });
    });
};


const getcarchart = (req, res) => {
  Car.find()
    .sort({ name: 1 })
    .then((cars) => {
      

      res.status(200).json({ message: "Here is the car info", cars: cars });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error In Fetching' });
    });
};

const getcarbyid = (req, res) => {
  Car.findById(req.params.id)
    .then((car) => {
      res.status(200).json({message: "Here is the car info",car : car});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error In Fetching' });
    });
};

const deletecar = (req, res) => {
  Car.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({message: "Car Deleted Successfully"});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error In Deleting' });
    });
};

const updatecar = (req, res) => {

  const updatedCar = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    
    image:req.file ? req.file.filename : req.file
  };
  console.log(updatedCar);

  Car.findByIdAndUpdate(req.params.id, updatedCar)
    .then(() => { 
      res.status(200).json({message: "Car Updated Successfully"
    , });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error In Updating' });
    });
};



const findcar = async (req,res) => {
  const {name} = req.params;
  Car.findOne({name: name})
  .then((Car) => {
    res.status(200).json({
      Car: Car,
    });
  }).catch((err) => 
  {
  console.error(err);
  });
}


module.exports = {
  createcar,
  getcars,
  getcarbyid,
  deletecar,
  updatecar,
  findcar,
  getcarchart
};


