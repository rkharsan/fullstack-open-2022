require("dotenv").config();

const express = require("express");
const app = express();
app.disable("x-powered-by");

app.use(require("cors")());
app.use(express.json());
app.use(express.static("build"));
app.use(require("morgan")("tiny"));

const Person = require("./models/person.js");

app.get("/info", (req, res, next) => {
  Person.count({})
    .then((length) => {
      const content = `Phonebook has info for ${length} people.<br>${new Date()}`;
      res.status(200).send(content);
    })
    .catch((err) => next(err));
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.status(200).json(persons))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    res.status(400).json({
      error: "need name and number",
    });
    return;
  }

  const existingPerson = await Person.exists({ name });
  if (existingPerson) {
    res.status(403).json({
      error: "name must be unique",
    });
    return;
  }

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => res.status(201).send(savedPerson))
    .catch((err) => next(err));
});

app.use((req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
});

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    res.status(400).json({ error: "malformed id" });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
