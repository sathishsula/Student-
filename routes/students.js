const router = require("express").Router();
let Student = require("../models/Student");
//import student from "../models/student.js";

    //DATA INSERT
    //http//localhost:8070/student/add/
router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        age,name, gender
    })
    newStudent.save().then(()=>{
        res.json("Data is saved by the  database");
    }).catch((error)=>{
        console.log(error);
    })
})

//data read
//student data fetch
//http//localhost:8070/student/
router.route("/").get((req,res)=>{
    Student.find().then((Student)=>{
        res.json(Student);
    }).catch((error)=>{
        console.log(error);
    })
})

//data update
////http//localhost:8070/student/
router.route('/update/:id').put(async(req,res)=>{
    let userId = req.params.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,age,gender
    }

    const update = await Student.findByIdAndUpdate(userId,updateStudent).then(()=>{
        res.status(200).send({status: "User Updated"})
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status: "errror updating data!", error:error.message});
    })
})

////http//localhost:8070/student/
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User Delete"});
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status:"Error with delete user!", error:error.message});
    })
})
//http//localhost:8070/student/
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    const user = await Student.findById(userId).then((student)=>{
        res.status(200).send({status:"User fetched", student})
    }).catch(()=>{
        console.log(error.message);
        res.status(500).send({status:"Error with get usrer!", error:eroor.message})
    })
})
module.exports = router;

