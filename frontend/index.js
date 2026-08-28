const entryForm = document.querySelector("#entry form");
const entryList = document.querySelector("#entries-list ul");
const entryTitle = document.querySelector("#detail-title p");
const entryCategory = document.querySelector("#detail-category p");
const entryDate = document.querySelector("#detail-time p");
const createForm = document.querySelector("#entry form");

const patchForm = document.querySelector("#detail-edit input");
const removeForm = document.querySelector("#detail-delete input");

entryForm.addEventListener("submit", extractEntry);
createForm.addEventListener("submit", createNewEntry);
patchForm.addEventListener("submit", patchEntry);
removeForm.addEventListener("submit", deleteEntry);

function extractEntry(e) {
  e.preventDefault();
  fetchEntryData(e.target.entryInput.value);
  e.target.entryInput.value = "";
}

async function fetchEntryCategory(entry) {
  try {
    const respData = await fetch(
      `https://bridget-jones-diary-1.onrender.com/cateogry/${entry}`,
    );

    if (respData.ok) {
      const data = await respData.json();
      addEntry(data);
    } else {
      throw "Something has gone wrong with one of the API requests";
    }
  } catch (e) {
    console.log(e);
  }
}

async function fetchEntryId(entry) {
  try {
    const respData = await fetch(
      `https://bridget-jones-diary-1.onrender.com/id/${entry}`,
    );

    if (respData.ok) {
      const data = await respData.json();
      addEntry(data);
    } else {
      throw "Something has gone wrong with one of the API requests";
    }
  } catch (e) {
    console.log(e);
  }
}

async function fetchEntryDiary() {
  try {
    const respData = await fetch(`https://bridget-jones-diary-1.onrender.com/`);

    if (respData.ok) {
      const data = await respData.json();
      addEntry(data);
    } else {
      throw "Something has gone wrong with one of the API requests";
    }
  } catch (e) {
    console.log(e);
  }
}

function addEntry() {
  const li = document.createElement("li");
  li.id = data.entry_id;
  li.textContent = data.title;
  li.addEventListener("click", displayEntry, { once: true });
  entryList.appendChild(li);
}

fetchEntryDiary();
