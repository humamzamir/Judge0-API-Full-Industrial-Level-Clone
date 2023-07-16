const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compiler = require("compilex");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser());

const option = { stats: true };
compiler.init(option);

// MongoDB connection URL
const url = 'mongodb+srv://humamzamir97:AVPmAkZKatzav4z1@cluster0.5jpeh37.mongodb.net/';

// Connect to MongoDB using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the schema and model for compiled code collection
const compiledCodeSchema = new mongoose.Schema({
  code: String,
  output: String,
  language: String // Added "language" field to store the programming language
});

const CompiledCode = mongoose.model('CompiledCode', compiledCodeSchema);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use(express.static(path.join(__dirname, "public")));

app.post("/compilecode", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var inputRadio = req.body.inputRadio;
  var lang = req.body.lang;

  if (lang === "C" || lang === "C++") {
    if (inputRadio === "true") {
      var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
      compiler.compileCPPWithInput(envData, code, input, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          // Save the code, output, and language to MongoDB using Mongoose
          CompiledCode.create({ code, output: data.output, language: lang })
            .then(() => {
              console.log('Code saved to MongoDB');
            })
            .catch((error) => {
              console.error('Error saving code to MongoDB:', error);
            });

          res.send(data.output);
        }
      });
    } else {
      var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
      compiler.compileCPP(envData, code, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data.output, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
        // data.error = error message
        // data.output = output value
      });
    }
  } else if (lang === "Python") {
    if (inputRadio === "true") {
      var envData = { OS: "windows" };
      compiler.compilePythonWithInput(envData, code, input, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    } else {
      var envData = { OS: "windows" };
      compiler.compilePython(envData, code, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    }
  } else if (lang === "Java") {
    if (inputRadio === "true") {
      var envData = { OS: "windows" };
      compiler.compileJavaWithInput(envData, code, input, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    } else {
      var envData = { OS: "windows" };
      compiler.compileJava(envData, code, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    }
  } else if (lang === "Nim") {
    if (inputRadio === "true") {
      var envData = { OS: "windows" };
      compiler.compileNimWithInput(envData, code, input, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    } else {
      var envData = { OS: "windows" };
      compiler.compileNim(envData, code, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    }
  } else if (lang === "Ruby") {
    if (inputRadio === "true") {
      var envData = { OS: "windows" };
      compiler.compileRubyWithInput(envData, code, input, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    } else {
      var envData = { OS: "windows" };
      compiler.compileRuby(envData, code, function (data) {
        // Save the code, output, and language to MongoDB using Mongoose
        CompiledCode.create({ code, output: data, language: lang })
          .then(() => {
            console.log('Code saved to MongoDB');
          })
          .catch((error) => {
            console.error('Error saving code to MongoDB:', error);
          });

        res.send(data);
      });
    }
  } else if (lang === "JavaScript") {
    // Handle JavaScript compilation (if supported by compilex)
    // You need to add the compileJavaScript and compileJavaScriptWithInput functions
  } else {
    res.send("Unsupported language");
  }
});

app.get("/fullStat", function (req, res) {
  compiler.fullStat(function (data) {
    res.setDefaultEncoding(data);
  });
});

app.listen(9091);
compiler.flush(function (){
  console.log("All temporary files flushed!");
});
