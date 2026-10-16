import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const symptomInput = document.getElementById("symptomInput");
const symptomList = document.getElementById("symptomList");

// Save a new symptom
async function saveSymptom() {
    const symptom = symptomInput.value.trim();

    if (symptom === "") {
        alert("Please enter a symptom.");
        return;
    }

    try {
        await addDoc(collection(db, "symptoms"), {
            symptom: symptom,
            createdAt: new Date().toISOString()
        });

        symptomInput.value = "";
        await getSymptoms();

    } catch (error) {
        console.error("Error saving symptom:", error);
        alert("Could not save symptom. Please check the console.");
    }
}

// Display saved symptoms
async function getSymptoms() {
    try {
        const querySnapshot = await getDocs(
            collection(db, "symptoms")
        );

        symptomList.replaceChildren();

        querySnapshot.forEach((documentSnapshot) => {
            const item = document.createElement("li");
            const name = document.createElement("span");
            const deleteButton = document.createElement("button");

            name.textContent = documentSnapshot.data().symptom;
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", () => {
                deleteSymptom(documentSnapshot.id);
            });

            item.append(name, " ", deleteButton);
            symptomList.appendChild(item);
        });

    } catch (error) {
        console.error("Error getting symptoms:", error);
    }
}

// Delete a symptom
async function deleteSymptom(id) {
    const confirmed = confirm("Delete this symptom?");

    if (!confirmed) return;

    try {
        await deleteDoc(doc(db, "symptoms", id));
        await getSymptoms();

    } catch (error) {
        console.error("Error deleting symptom:", error);
        alert("Could not delete symptom.");
    }
}

// Connect the Save button to the function
window.saveSymptom = saveSymptom;

// Load symptoms once when the page opens
getSymptoms();