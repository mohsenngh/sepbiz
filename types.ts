
export enum RegistrationStep {
  Intro,
  PhoneNumber,
  Otp,
  NationalId,
  DateOfBirth,
  IdTypeSelection,
  SmartCardUpload,
  CertificateUpload,
  AddressAndBusiness,
  AddressConfirm,
  BankAccount,
  BankAccountConfirm,
  Success,
  ContractView,
  FaceVerification,
  ContractSigned,
}

export interface FormData {
  phoneNumber: string;
  otp: string;
  nationalId: string;
  dob: { day: number; month: number; year: number };
  idType: 'smart_card' | 'certificate' | null;
  smartCardFront: File | null;
  smartCardBack: File | null;
  certificateCode: string;
  birthCertificate: File | null;
  postalCode: string;
  businessCategory: string;
  address: string;
  bankInfo: string;
  accountHolderName: string;
}