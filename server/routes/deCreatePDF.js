const { jsPDF } = require("jspdf");
const autoTable = require("jspdf-autotable")
const { DateTime } = require("luxon");

const deCreatePDF = (personalData, allergyData, medicationData) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth, sex, streetNumber, city, state, postalCode, country } = personalData
  const formattedAllergy = allergyData.map(i => Object.values(i));
  const formattedMedication = medicationData.map(i => Object.values(i));

  let sexLocalized

  if (sex === "male") {
    sexLocalized = "Männlich"
  } else {
    sexLocalized = "Weiblich"
  }

  const doc = new jsPDF();
  
  doc.autoTable({
    bodyStyles: { halign: "right" },
    body: [
      [DateTime.local().setLocale("de").toLocaleString("DATE_SHORT")],
    ],
    theme: "plain"
  })

  doc.autoTable({
    headStyles: { fontSize:16 },
    head: [
      ["Patientenfragebogen"],
    ],
    theme: "plain"
  })

  doc.autoTable({
    head: [
      ["Vorname", "Nachname", "Geburtsdatum", "Geschlecht"]
    ],
    body: [
      [firstName, lastName, DateTime.fromISO(dateOfBirth).setLocale("de").toLocaleString("DATE_SHORT"), sexLocalized],
    ],
    theme: "plain",
  })
  doc.autoTable({
    head: [
      ["E-Mail Adresse", "Telefonnummer"]
    ],
    body: [
      [email, phoneNumber],
    ],
    theme: "plain",
  })
  doc.autoTable({
    head: [
      ["Addresse"]
    ],
    body: [
      [`${streetNumber}, ${postalCode} ${city} ${state} ${country}`],
    ],
    theme: "plain",
  })

  doc.autoTable({
    head: [["Allergie", "Symptom"]],
    body: formattedAllergy
  })

  doc.autoTable({
    head: [["Medikament", "Zustand", "Häufigkeit", "Dosis"]],
    body: formattedMedication,
  })

  doc.setFontSize(10)
  doc.setFont("helvetica")
  doc.text("Dieser Patientenfragebogen wurde durch EHR generiert", 14, doc.lastAutoTable.finalY + 10)
  
  const string = doc.output("arraybuffer");
  return string
}

module.exports = { deCreatePDF }