export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Dr. Devi Shetty",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Dr. Naresh Trehan",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Dr. Prathap C. Reddy",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Dr. Randeep Guleria",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: " Dr. B. M. Hegde",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Dr. P. Raghu Ram",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: " Dr. M. S. Valiathan",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Dr. Gagandeep Kang",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Dr. Sanjay Oak",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
