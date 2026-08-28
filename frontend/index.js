const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const createForm = document.querySelector("#create-form");
const patchForm = document.querySelector("#patch-form");
const removeForm = document.querySelector("#remove-form");

let cal = 0;
const fruitCal = {};
const apiKey = "57038365-2518f6e86a0e254b681cb1420";

fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruit);
patchForm.addEventListener("submit", patchFruit);
removeForm.addEventListener("submit", deleteFruit);

function extractFruit(e) {
  e.preventDefault();
  fetchFruitData(e.target.fruitInput.value);
  e.target.fruitInput.value = "";
}

async function fetchFruitData(fruit) {
  try {
    //Make sure to replace this link with your deployed API URL in this fetch
    const respData = await fetch(
      `https://fruits-api-z4ak.onrender.com/fruits/${fruit}`,
    );
    const respImg = await fetch(
      `https://pixabay.com/api/?q=${fruit}+fruit&key=${apiKey}`,
    );

    if (respData.ok && respImg.ok) {
      const data = await respData.json();
      const imgData = await respImg.json();
      addFruit(data, imgData);
    } else {
      throw "Something has gone wrong with one of the API requests";
    }
  } catch (e) {
    console.log(e);
  }
}

function addFruit(fruit, fruitImg) {
  const img = document.createElement("img");
  img.classList.add("fruits");
  img.alt = fruit.name;
  img.src = fruitImg.hits[0].previewURL;

  img.addEventListener("click", removeFruit, { once: true });
  fruitList.appendChild(img);

  fruitCal[fruit.name] = fruit.nutritions.calories;

  cal += fruit.nutritions.calories;
  fruitNutrition.textContent = "Total Calories: " + cal;
}

function removeFruit(e) {
  const fruitName = e.target.alt;
  cal -= fruitCal[fruitName];
  fruitNutrition.textContent = "Total Calories: " + cal;

  delete fruitCal[fruitName];
  e.target.remove();
}

async function createNewFruit(e) {
  e.preventDefault();
  const data = {
    genus: e.target.fruitGenus.value,
    name: e.target.fruitName.value,
    family: e.target.fruitFam.value,
    order: e.target.fruitOrder.value,
    nutritions: {
      carbohydrates: Number(e.target.fruitCarb.value),
      protein: Number(e.target.fruitProt.value),
      fats: Number(e.target.fruitFat.value),
      calories: Number(e.target.fruitCal.value),
      sugar: Number(e.target.fruitSug.value),
    },
  };

  e.target.reset();

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `https://fruits-api-z4ak.onrender.com/fruits`,
    options,
  );
  let messageStatus = document.querySelector("#message");
  if (response.status == 201) {
    messageStatus.textContent = "Fruit successfully created";
    setTimeout(() => (messageStatus.textContent = ""), 4000);
  } else {
    messageStatus.textContent = "This fruit already exists";
    setTimeout(() => (messageStatus.textContent = ""), 4000);
  }
}

async function patchFruit(e) {
  e.preventDefault();

  const data = {
    name: e.target.newName.value,
    family: e.target.fruitFam.value,
  };

  const fruit = e.target.oldName.value;
  e.target.reset();

  const options = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `https://fruits-api-z4ak.onrender.com/fruits/${fruit}`,
    options,
  );
  console.log(response);
  let messageStatus = document.querySelector("#patch-message");
  if (response.status == 200) {
    messageStatus.textContent = "Fruit successfully changed";
    setTimeout(() => (messageStatus.textContent = ""), 4000);
  } else {
    messageStatus.textContent = "This fruit doesn't exist";
    setTimeout(() => (messageStatus.textContent = ""), 4000);
  }
}

async function deleteFruit(e) {
  e.preventDefault();

  const fruit = e.target.name.value;

  e.target.reset();

  const options = {
    method: "DELETE",
  };

  const response = await fetch(
    `https://fruits-api-z4ak.onrender.com/fruits/${fruit}`,
    options,
  );
  console.log(response);
  let messageStatus = document.querySelector("#remove-message");
  if (response.status == 200) {
    messageStatus.textContent = "Fruit successfully DELETED";
    setTimeout(() => (messageStatus.textContent = ""), 4000);
  } else {
    messageStatus.textContent = "This fruit doesn't exist";
    setTimeout(() => (messageStatus.textContent = ""), 4000);
  }
}
