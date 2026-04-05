require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();

app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE","OPTIONS"], allowedHeaders: ["Content-Type","Authorization"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────
app.use("/api/auth",       require("./routes/auth"));
app.use("/api/classrooms", require("./routes/classrooms"));
app.use("/api/faculty",    require("./routes/faculty"));
app.use("/api/courses",    require("./routes/courses"));
app.use("/api/schedule",   require("./routes/schedule"));
app.use("/api/students",   require("./routes/students"));
app.use("/api/conflicts",  require("./routes/conflicts"));

app.get("/", (req, res) => res.json({ message: "SmartSched API running ✅" }));

// ── MongoDB ───────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });