class Doctor {
    #name;
    #specialization;
    #yearsOfExperiens;
    #contactInformation;

    constructor(name, specialization, yearsOfExperiens, contactInformation) {
        this.#name = name;
        this.#specialization = specialization;
        this.#yearsOfExperiens = yearsOfExperiens;
        this.#contactInformation = contactInformation;
    }

    get name() {
        return this.#name;
    }

    get specialization() {
        return this.#specialization;
    }

    get yearsOfExperiens() {
        this.#yearsOfExperiens;
    }

    get contactInformation() {
        this.#contactInformation;
    }
}

class Patient { 
    #name;
    #dateOfBirth;
    #gender;
    #contactInformation;
    #existingMedicalConditions;

    constructor(name, dateOfBirth, gender, contactInformation, existingMedicalConditions) {
        this.#name = name;
        this.#dateOfBirth = dateOfBirth;
        this.#gender = gender;
        this.#contactInformation = contactInformation;
        this.#existingMedicalConditions = existingMedicalConditions;
    }

    get name() {
        return this.#name;
    }

    get dateOfBirth() {
        return this.#dateOfBirth;
    }

    get gender() {
        return this.#gender;
    }

    get contactInformation() {
        return this.#contactInformation;
    }
    
    get existingMedicalConditions() {
        return this.#existingMedicalConditions;
    }
}

class MedicalHistory {
    #diagnoses;
    #treatments;
    #medications;   

    constructor() {
        this.#diagnoses = [];
        this.#treatments = [];
        this.#medications = [];
    }

    setDiagnoses(diagnoses) {
        this.#diagnoses.push(diagnoses);
    }

    setTreatments(treatments) {
        this.#treatments.push(treatments);
    }

    setMedications(medications) {
        this.#medications.push(medications);
    }

    getDiagnoses() {
        return this.#diagnoses;
    }

    getTreatments() {
        return this.#treatments;
    }

    getMedications() {
        return this.#medications;
    }
}

class MedicalHistoryReport {
    generateReport(patient, medicalHistory) {
        console.log("Medical History Report");
        console.log("----------------------");
        console.log(`Name: ${patient.name}`);
        console.log(`Date of Birth: ${patient.dateOfBirth}`);
        console.log(`Gender: ${patient.gender}`);
        console.log(`Contact Information ${patient.contactInformation}`);
        console.log("Diagnoses:");
        medicalHistory.getDiagnoses().forEach((diagnoses) => console.log(`- ${diagnoses}`));
        console.log("Treatments:");
        medicalHistory.getTreatments().forEach((treatments) => console.log(`- ${treatments}`));
        console.log("Medications:");
        medicalHistory.getMedications().forEach((medications) => console.log(`- ${medications}`));
    }
}

const doctor = new Doctor("Dr. John", "Cardiolog", 10, "drjohn@gmail.com");

const patient = new Patient("David", "1990..01.02", "Female", "david@gmail.com");

const medicalHistory = new MedicalHistory();

medicalHistory.setDiagnoses('High blood pressure');
medicalHistory.setTreatments('Prescribed medication');
medicalHistory.setMedications('Lisinopril');

const medicalHistoryReport = new MedicalHistoryReport();
medicalHistoryReport.generateReport(patient, medicalHistory);

