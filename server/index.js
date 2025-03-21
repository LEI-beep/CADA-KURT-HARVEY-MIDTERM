import express from "express";
import { db } from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;


app.get("/get-list", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM students ORDER BY student_id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/add-student", async (req, res) => {
    const { lname, fname, course, year } = req.body;
  
    if (!lname || !fname || !course || !year) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const result = await db.query(
        "INSERT INTO students (lname, fname, course, year) VALUES ($1, $2, $3, $4) RETURNING student_id, lname, fname, course, year",
        [lname, fname, course, year]
      );
  
      res.json(result.rows[0]); 
    } catch (err) {
      console.error("Error adding student:", err);
      res.status(500).json({ error: err.message });
    }
  });
  


app.delete("/delete-student/:id", async (req, res) => {
    const id = Number(req.params.id); 
  
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
  
    try {

      const checkStudent = await db.query("SELECT * FROM students WHERE student_id = $1", [id]);
  
      if (checkStudent.rowCount === 0) {
        return res.status(404).json({ error: "Student not found" });
      }
  

      const result = await db.query("DELETE FROM students WHERE student_id = $1 RETURNING *", [id]);

      res.json({ message: "Student deleted", deletedStudent: result.rows[0] });
    } catch (err) {
      console.error("Error deleting student:", err);
      res.status(500).json({ error: err.message });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
