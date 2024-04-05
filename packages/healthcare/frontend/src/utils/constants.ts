import { CardCredentialsStep } from '../app/get-started/form-steps/checkout/card-credentials'
import {
  AllergiesStep,
  ChlamydiaDiagnosisStep,
  DiagnosticsStep,
  GonorrheaDiagnosisStep,
  OtherQuestionsStep,
  PrepPrescriptionStep,
  PrescriptionsStep,
  TreatmentReceptionStep,
} from '../app/get-started/form-steps/history'
import { SyphilisDiagnosisStep } from '../app/get-started/form-steps/history/syphilis-diagnosis'
import { CurrentRelationshipStep, SexualOrientationStep } from '../app/get-started/form-steps/life-style'
import { DateOfBirthStep, LocationStep, PersonalInfoStep, PhoneNumberStep } from '../app/get-started/form-steps/personal-informations'
import { BirthSexStep, GenderStep, PreferredPronounsStep } from '../app/get-started/form-steps/profile'
import {
  PartnersStep,
  UnprotectedSexStep,
  RecentHIVExpositionStep,
  LastMonthHIVExpositionStep,
  HIVOngoingRiskStep,
} from '../app/get-started/form-steps/risk-factors'
import { ShippingInfoStep } from '../app/get-started/form-steps/checkout/shipping-info'
import { ConfirmStep } from '../app/get-started/form-steps/confirm'
import { InsuranceCardUploadStep } from '../app/get-started/form-steps/coverage/insurance-card-upload'
import {
  GovIDPhotoStep,
  HealthInsurancePlanStep,
  HealthInsuranceStep,
  HouseHoldInfoStep,
  InsuranceDetailsStep,
} from '../app/get-started/form-steps/coverage'
import { SummaryStep } from '../app/get-started/form-steps/summary'
import { HIVDiagnosisStep } from '../app/get-started/form-steps/history/hiv-diagnosis'
import { AidsDiagnosisStep } from '../app/get-started/form-steps/history/aids-diagnosis'
import { LastTimeDoctorVisitStep } from '../app/get-started/form-steps/history/last-time-doctor-visit'
import { LastTimePrepMedicationStep } from '../app/get-started/form-steps/history/last-time-prep-medication'

export const acceptedImageFormats = ['image/jpeg', 'image/png'] as const

export const steps = [
  {
    key: 'Location',
    Component: LocationStep,
  },
  {
    key: 'DateOfBirth',
    Component: DateOfBirthStep,
  },
  {
    key: 'PersonalInfo',
    Component: PersonalInfoStep,
  },
  {
    key: 'PhoneNumber',
    Component: PhoneNumberStep,
  },
  {
    key: 'BirthSex',
    Component: BirthSexStep,
  },
  {
    key: 'Gender',
    Component: GenderStep,
  },
  {
    key: 'PreferredPronouns',
    Component: PreferredPronounsStep,
  },
  {
    key: 'SexualOrientation',
    Component: SexualOrientationStep,
  },
  {
    key: 'CurrentRelationship',
    Component: CurrentRelationshipStep,
  },
  {
    key: 'Partners',
    Component: PartnersStep,
  },
  {
    key: 'UnprotectedSex',
    Component: UnprotectedSexStep,
  },
  {
    key: 'RecentHIVExposition',
    Component: RecentHIVExpositionStep,
  },
  {
    key: 'LastMonthHIVExposition',
    Component: LastMonthHIVExpositionStep,
  },
  {
    key: 'HIVOngoingRisk',
    Component: HIVOngoingRiskStep,
  },
  {
    key: 'PrepPrescription',
    Component: PrepPrescriptionStep,
  },
  {
    key: 'LastTimePrepMedication',
    Component: LastTimePrepMedicationStep,
  },
  {
    key: 'HIVDiagnosis',
    Component: HIVDiagnosisStep,
  },
  {
    key: 'AidsDiagnosis',
    Component: AidsDiagnosisStep,
  },
  {
    key: 'LastTimeDoctorVisit',
    Component: LastTimeDoctorVisitStep,
  },
  {
    key: 'SyphilisDiagnosis',
    Component: SyphilisDiagnosisStep,
  },
  {
    key: 'GonorrheaDiagnosis',
    Component: GonorrheaDiagnosisStep,
  },
  {
    key: 'ChlamydiaDiagnosis',
    Component: ChlamydiaDiagnosisStep,
  },
  {
    key: 'Diagnostics',
    Component: DiagnosticsStep,
  },
  {
    key: 'TreatmentReception',
    Component: TreatmentReceptionStep,
  },
  {
    key: 'Prescriptions',
    Component: PrescriptionsStep,
  },
  {
    key: 'Allergies',
    Component: AllergiesStep,
  },
  {
    key: 'OtherQuestions',
    Component: OtherQuestionsStep,
  },
  {
    key: 'CardCredentials',
    Component: CardCredentialsStep,
  },
  {
    key: 'HealthInsurance',
    Component: HealthInsuranceStep,
  },
  {
    key: 'HouseHoldInfo',
    Component: HouseHoldInfoStep,
  },
  {
    key: 'HealthInsurancePlan',
    Component: HealthInsurancePlanStep,
  },
  {
    key: 'InsuranceCardUpload',
    Component: InsuranceCardUploadStep,
  },
  {
    key: 'InsuranceDetails',
    Component: InsuranceDetailsStep,
  },
  {
    key: 'GovIDPhoto',
    Component: GovIDPhotoStep,
  },
  {
    key: 'ShippingInfo',
    Component: ShippingInfoStep,
  },
  {
    key: 'Summary',
    Component: SummaryStep,
  },
  {
    key: 'Confirm',
    Component: ConfirmStep,
  },
] as const

export const states = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' },
] as const

export type State = (typeof states)[number]
