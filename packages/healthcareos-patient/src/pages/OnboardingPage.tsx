import { getReferenceString } from '@medplum/core';
import { Questionnaire, QuestionnaireResponse } from '@medplum/fhirtypes';
import { Document, QuestionnaireForm, useMedplum } from '@medplum/react';
import { useEffect, useState } from 'react';

export function Onboarding(): JSX.Element {
  const medplum = useMedplum();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();

  useEffect(() => {
    medplum.searchOne('Questionnaire', 'name:contains=patient').then(setQuestionnaire).catch(console.log);
  }, [medplum]);

  if (!questionnaire) {
    return <div>Loading...</div>;
  }
  return (
  <Document>
     <QuestionnaireForm
      questionnaire={questionnaire}
      onSubmit={async(formData: any) => {
        await medplum.createResource<QuestionnaireResponse>({
          resourceType: 'QuestionnaireResponse',
          status: 'completed',
          questionnaire: getReferenceString(questionnaire),
        });
      }}
    />
  </Document>
  )
}
