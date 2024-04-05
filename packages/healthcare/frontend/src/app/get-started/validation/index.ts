import { z } from 'zod'
import { GenderStepSchema } from '../form-steps/profile/gender'
import { PreferredPronounsSchema } from '../form-steps/profile/preferred-pronouns'
import { birthSexSchema } from '../form-steps/profile/birth-sex'
import { CurrentRelationshipSchema } from '../form-steps/life-style/current-relationship'
import { SexualOrientationSchema } from '../form-steps/life-style/sexual-orientation'
import { partnersStepSchema } from '../form-steps/risk-factors/partners'
import { unprotectedSexSchema } from '../form-steps/risk-factors/unprotected-sex'
import { recentHIVExpositionSchema } from '../form-steps/risk-factors/recent-hiv-exposition'
import { lastMonthHIVExpositionSchema } from '../form-steps/risk-factors/last-month-hiv-exposition'
import { hivOngoingRiskSchema } from '../form-steps/risk-factors/hiv-ongoing-risk'
import { personalInfoStepSchema } from '../form-steps/personal-informations/personal-informations'
import { phoneNumberSchema } from '../form-steps/personal-informations/phone-number'
import { locationStepSchema } from '../form-steps/personal-informations/location'
import { dateOfBirthSchema } from '../form-steps/personal-informations/date-of-birth'
import { houseHoldInfoSchema } from '../form-steps/coverage/house-hold-info'
import { insuranceDetailsSchema } from '../form-steps/coverage/insurance-details'
import { insuranceCardUploadSchema } from '../form-steps/coverage/insurance-card-upload'
import { healthInsurancePlanSchema } from '../form-steps/coverage/health-insurance-plan'
import { cardCredentialsSchema } from '../form-steps/checkout/card-credentials'
import { prepPrescriptionSchema } from '../form-steps/history/prep-prescription'
import { syphilisDiagnosisSchema } from '../form-steps/history/syphilis-diagnosis'
import { gonorrheaDiagnosisSchema } from '../form-steps/history/gonorrhea-diagnosis'
import { chlamydiaDiagnosisSchema } from '../form-steps/history/chlamydia-diagnosis'
import { diagnosticsSchema } from '../form-steps/history/diagnostics'
import { treatmentReceptionSchema } from '../form-steps/history/treatment-reception'
import { prescriptionsSchema } from '../form-steps/history/prescriptions'
import { allergiesSchema } from '../form-steps/history/allergies'
import { otherQuestionsSchema } from '../form-steps/history/other-questions'
import { shippingInfoSchema } from '../form-steps/checkout/shipping-info'
import { govIDPhotoSchema } from '../form-steps/coverage/gov-id'
import { hivDiagnosisSchema } from '../form-steps/history/hiv-diagnosis'
import { aidsDiagnosisSchema } from '../form-steps/history/aids-diagnosis'
import { lastTimeDoctorVisitSchema } from '../form-steps/history/last-time-doctor-visit'
import { lastTimePrepMedicationSchema } from '../form-steps/history/last-time-prep-medication'

export const formSchema = locationStepSchema
  .and(dateOfBirthSchema)
  .and(phoneNumberSchema)
  .and(
    z.object({
      personalInformation: personalInfoStepSchema,
    })
  )
  .and(birthSexSchema)
  .and(GenderStepSchema)
  .and(PreferredPronounsSchema)
  .and(SexualOrientationSchema)
  .and(CurrentRelationshipSchema)
  .and(partnersStepSchema)
  .and(unprotectedSexSchema)
  .and(recentHIVExpositionSchema)
  .and(lastMonthHIVExpositionSchema)
  .and(hivOngoingRiskSchema)
  .and(prepPrescriptionSchema)
  .and(
    z.object({
      lastTimePrepMedication: z.optional(lastTimePrepMedicationSchema.shape.lastTimePrepMedication),
    })
  )
  .and(hivDiagnosisSchema)
  .and(
    z.object({
      aidsDiagnosis: z.optional(aidsDiagnosisSchema.shape.aidsDiagnosis),
    })
  )
  .and(
    z.object({
      lastTimeDoctorVisit: z.optional(lastTimeDoctorVisitSchema.shape.lastTimeDoctorVisit),
    })
  )
  .and(syphilisDiagnosisSchema)
  .and(gonorrheaDiagnosisSchema)
  .and(chlamydiaDiagnosisSchema)
  .and(diagnosticsSchema)
  .and(treatmentReceptionSchema)
  .and(prescriptionsSchema)
  .and(allergiesSchema)
  .and(otherQuestionsSchema)
  .and(shippingInfoSchema)
  .and(cardCredentialsSchema)
  .and(
    z.object({
      insurance: z.discriminatedUnion('doesUserHaveInsurance', [
        z.object({
          doesUserHaveInsurance: z.literal('yes'),
          healthInsurancePlan: healthInsurancePlanSchema.shape.healthInsurancePlan,
          insuranceImageFile: insuranceCardUploadSchema.shape.insuranceImageFile.optional(),
          insuranceDetails: insuranceDetailsSchema.shape.insuranceDetails.optional(),
        }),
        z.object({
          doesUserHaveInsurance: z.literal('no'),
          householdInfo: houseHoldInfoSchema.shape.householdInfo,
        }),
      ]),
    })
  )
  .and(govIDPhotoSchema)

export type FormSchema = z.infer<typeof formSchema>
