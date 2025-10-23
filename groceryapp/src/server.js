const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 5000;
const itemsPath = path.join(__dirname, "/item.json");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
///////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(5000, "0.0.0.0");

//////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/items", (req, res) => {
  try {
    fs.readFile(itemsPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving items.");
      } else {
        const jsonData = JSON.parse(data);
        const items = jsonData.item;
        res.send(data);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

async function callApi(userInput) {
  const apiKey = process.env.BARCODE_API_KEY;
  const url = `https://api.barcodelookup.com/v3/products?barcode=${userInput}&formatted=y&key=${apiKey}`;

  try {
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    const barcode = data.products[0].barcode_number;
    const name = data.products[0].title;

    console.log("Name:", name, "\n");
    console.log("Barcode Number:", barcode, "\n");

    return [name, data];
  } catch (error) {
    console.error("Error:", error);
  }
}

app.post("/items", async (req, res) => {
  const newItem = req.body;
  console.log(newItem);

  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding item.");
    } else {
      // Add the new item to the existing items
      callApi(newItem.barcode).then((result) => {
        const jsonData = JSON.parse(data);

        const newItemModel = {
          quantity: "1",
          expiry: "",
          barcode: newItem.barcode,
        };

        if (jsonData[result[0]]) {
          jsonData[result[0]].quantity++;
        } else {
          jsonData[result[0]] = newItemModel;
        }

        fs.writeFile(itemsPath, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error adding item.");
          } else {
            res.send("Item added successfully.");
          }
        });
      });
    }
  });
});

app.delete("/items", (req, res) => {
  console.log(req.body);
  const itemName = req.body["name"];
  console.log(itemName);
  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding item.");
    } else {
      const jsonData = JSON.parse(data);
      // Add the new item to the existing items
      if (jsonData[itemName].quantity == 1) {
        delete jsonData[itemName];
      } else {
        jsonData[itemName].quantity--;
      }

      fs.writeFile(itemsPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error removing item.");
        } else {
          res.send(jsonData);
        }
      });
    }
  });
});

app.put("/increment", (req, res) => {
  console.log(req.body);
  const itemName = req.body["name"];
  console.log(itemName);
  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding item.");
    } else {
      const jsonData = JSON.parse(data);
      jsonData[itemName].quantity++;

      fs.writeFile(itemsPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error removing item.");
        } else {
          res.send(jsonData);
        }
      });
    }
  });
});

// app.put("/expiry", (req, res) => {
//   console.log(req.body);
//   const itemName = req.body["name"]; // Assuming the request body contains the new item object
//   const newExpiry = req.body["expiry"];
//   console.log(itemName);
//   fs.readFile(itemsPath, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error adding item.");
//     } else {
//       const jsonData = JSON.parse(data);

//       jsonData[itemName].expiry = newExpiry;

//       fs.writeFile(itemsPath, JSON.stringify(jsonData, null, 2), (err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error removing item.");
//         } else {
//           res.send(jsonData);
//         }
//       });
//     }
//   });
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    CHAT GPT API CALLS    CHAT GPT API CALLS     CHAT GPT API CALLS      CHAT GPT API CALLS
//
///////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/breakfast", (req, res) => {
  try {
    fs.readFile(itemsPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving items.");
      } else {
        const jsonData = JSON.parse(data);
        const items = jsonData.item;

        const responseStructure = {
          Breakfast: { Dish: "", Recipe: "", IngredientsRemaining: [] },
        };
        const structure = JSON.stringify(responseStructure);

        const prompt1 =
          " You are a smart kitchen assistant. From the following list of ingredients" +
          " give me one meal suggestion for BREAKFAST." +
          " Do not use any of the provided ingredients twice. Structure your response in JSON format as such:\n" +
          `${structure}` +
          "\nDish should be the name of the dish to be made. Recipe should include the steps necessary." +
          "\nThe IngredientsRemaining should consist of the ingredients that remain if the recipe is made." +
          " If the quantity property of the given ingredient is greater than one, subtract one and make that the new value." +
          " If the quantity property of the given ingredient is equal to one, remove the ingredient from the list." +
          "Ensure that your response is valid JSON." +
          "\nHere is the list of available ingredients:\n" +
          `${data}`;

        console.log(prompt1);

        generateChatMessage(prompt1)
          .then((response) => res.json({ Dish: response.content }))
          .catch((error) => console.log(error));
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/lunch", (req, res) => {
  try {
    fs.readFile(itemsPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving items.");
      } else {
        const jsonData = JSON.parse(data);
        const items = jsonData.item;

        const responseStructure = {
          Lunch: { Dish: "", Recipe: "", IngredientsRemaining: [] },
        };
        const structure = JSON.stringify(responseStructure);

        const prompt1 =
          " You are a smart kitchen assistant. From the following list of ingredients" +
          " give me one meal suggestion for LUNCH." +
          " Do not use any of the provided ingredients twice. Structure your response in JSON format as such:\n" +
          `${structure}` +
          "\nDish should be the name of the dish to be made. Recipe should include the steps necessary." +
          "\nThe IngredientsRemaining should consist of the ingredients that remain if the recipe is made." +
          " If the quantity property of the given ingredient is greater than one, subtract one and make that the new value." +
          " If the quantity property of the given ingredient is equal to one, remove the ingredient from the list." +
          "Ensure that your response is valid JSON." +
          "\nHere is the list of available ingredients:\n" +
          `${data}`;

        console.log(prompt1);

        generateChatMessage(prompt1)
          .then((response) => res.json({ Dish: response.content }))
          .catch((error) => console.log(error));
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/dinner", (req, res) => {
  try {
    fs.readFile(itemsPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving items.");
      } else {
        const jsonData = JSON.parse(data);
        const items = jsonData.item;

        const responseStructure = {
          Dinner: { Dish: "", Recipe: "", IngredientsRemaining: [] },
        };
        const structure = JSON.stringify(responseStructure);

        const prompt1 =
          " You are a smart kitchen assistant. From the following list of ingredients" +
          " give me one meal suggestion for DINNER." +
          " Do not use any of the provided ingredients twice. Structure your response in JSON format as such:\n" +
          `${structure}` +
          "\nDish should be the name of the dish to be made. Recipe should include the steps necessary." +
          "\nThe IngredientsRemaining should consist of the ingredients that remain if the recipe is made." +
          " If the quantity property of the given ingredient is greater than one, subtract one and make that the new value." +
          " If the quantity property of the given ingredient is equal to one, remove the ingredient from the list." +
          "Ensure that your response is valid JSON." +
          "\nHere is the list of available ingredients:\n" +
          `${data}`;

        console.log(prompt1);

        generateChatMessage(prompt1)
          .then((response) => res.json({ Dish: response.content }))
          .catch((error) => console.log(error));
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

//FOR REROLLS NEED NEW GET NEW PATH
//const prompt2 = "The same response but with a new " + `${userReroll}`

async function generateChatMessage(prompt) {
  const API_KEY = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: `${API_KEY}`,
  });
  const openai = new OpenAIApi(configuration);

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "assistant", content: prompt }],
  });
  //console.log(chatCompletion.data.choices[0].message);
  return chatCompletion.data.choices[0].message;
}
