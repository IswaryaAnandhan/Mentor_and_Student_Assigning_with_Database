const express= require("express");
const app=express()
app.use(express.json());
let mentor=[];
let student=[];
app.post("/create_mentor",async(req,res)=>{
    try { 
         mentor.push(req.body);
         res.json({ message: "Mentor created"});  
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    }
})

app.post("/create_student",async(req,res)=>{
    try {
         student.push(req.body);
         res.json({ message: "Student created"});  
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    }
})

/** get all mentors */
app.get("/mentors",(req, res)=>{
    res.json(mentor);
})
/** get particular mentor */

app.get("/mentors/:id",(req, res)=>{
    const mentors=mentor.find(m=>m.id === parseInt(req.params.id))
    if(!mentors) res.status(404).send("Mentor not found")
    res.send(mentors)
})

/** get student */

app.get("/students",(req, res)=>{
    res.json(student)
});

/** get particular student */
app.get("/student/:id",(req, res)=>{
    const students=student.find(m=>m.id === parseInt(req.params.id))
    if(!students) res.status(404).send("Mentor not found")
    res.send(students)
})

/** assign student to a mentor */
app.post("/assign_mentor/:id",(req, res)=>{
  const mentors=mentor.find(m=>m.id === parseInt(req.params.id))
    if(!mentors) res.status(404).send("mentor not found")
    console.log(mentors)
    const student={
        name:req.body.name,
        id:req.body.id
    
    }
    mentors.students.push(student)
    res.send(`student with name ${student.name} assigned to ${mentors.name}`)
})

/** show all students of particular mentor */

app.get("/mentor_students/:id",(req, res) => {
  const mentors=mentor.find(m=>m.id=== parseInt(req.params.id))
    const students=mentors.student
    res.json(students)

})
/** assign or change mentor for student */
app.put("/change_mentor/:id",(req, res) => {
    const students=student.find(s=>s.id=== parseInt(req.params.id));
    if(!students) res.status(404).send("student not found");
    const mentor_name=req.body
    //student.mentor=""
    students.mentor.push(mentor_name)
    res.send("updated successfully")
    console.log(students)
    
})

app.listen(3003)