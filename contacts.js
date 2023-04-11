const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsingData = JSON.parse(data);

    return parsingData;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf-8");

    const parsingList = JSON.parse(contactsList);
    const contactById = parsingList.filter(
      (contact) => contact.id === contactId
    );

    return contactById;
  } catch (err) {
    console.error(err);
  }
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsingData = JSON.parse(data);
      const listWitoutContactId = parsingData.filter(
        (contact) => contact.id !== contactId
      );
      const jsonData = JSON.stringify(listWitoutContactId);
      return fs.writeFile(contactsPath, jsonData, "utf-8");
    })
    .catch((error) => {
      console.log(error);
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsingData = JSON.parse(data);

      const id = (Math.random() * 10 ** 17).toString();

      parsingData.push({ id, name, email, phone });

      const jsonData = JSON.stringify(parsingData);

      return fs.writeFile(contactsPath, jsonData, "utf-8");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
