import express from "express";
import prismaClient  from "db/client";

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/user", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "username, password and email are required" });
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        password,
        email,
      },
    });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(8080, () => {
  console.log("Server running on port 8080");
});
