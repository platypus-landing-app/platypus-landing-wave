'use client';

import { useApplication } from '@/contexts/ApplicationContext';
import ProfessionalApplicationDialog from './ProfessionalApplicationDialog';

export default function ProfessionalApplicationDialogWrapper() {
  const { isApplicationOpen } = useApplication();

  if (!isApplicationOpen) return null;

  return <ProfessionalApplicationDialog />;
}
