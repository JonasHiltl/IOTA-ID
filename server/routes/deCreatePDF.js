const { jsPDF } = require("jspdf");
const moment = require("moment")
const autoTable = require("jspdf-autotable")

const deCreatePDF = (personalData, allergyData, medicationData) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth, sex, streetNumber, city, state, postalCode, country } = personalData
  try {
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
        [moment().format("DD. MM. YYYY")],
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
        ["Vorname", "nachname", "Geburtsdatum", "Geschlecht"]
      ],
      body: [
        [firstName, lastName, moment(dateOfBirth).format('DD. MM. YYYY'), sexLocalized],
      ],
      theme: "plain",
    })
    doc.autoTable({
      head: [
        ["E-Mail", "Telefonnummer"]
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
      head: [["Allergy", "Symptoms"]],
      body: formattedAllergy
    })

    doc.autoTable({
      head: [["Medication", "Condition", "Frequency", "Dose"]],
      body: formattedMedication,
    })

    doc.setFontSize(10)
    doc.setFont("helvetica")
    doc.text("Dieser Patientenfragebogen wurde durch EHR generiert", 14, doc.lastAutoTable.finalY + 10)

    doc.save(`${firstName}.pdf`)
    return doc
  } catch (error) {
    return res
      .json({
        error: error,
        message: "There was a Problem with our Servers",
        success: false
      })
      .status(500); 
  }
}

module.exports = { deCreatePDF }