import { Title } from '@mantine/core';
import { Logo, SignInForm } from '@medplum/react';
import { useNavigate } from 'react-router-dom';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <SignInForm
      // Configure according to your settings
      googleClientId="687949780985-j6erf2gg0f133rqalukqa3vcf45ltaf2.apps.googleusercontent.com" // use this one to run against prod
      // googleClientId="397236612778-c0b5tnjv98frbo1tfuuha5vkme3cmq4s.apps.googleusercontent.com" // use this one for localhost
      onSuccess={() => navigate('/')}
    >
      <Logo size={32} />
      <Title>Sign in to Medplum</Title>
    </SignInForm>
  );
}