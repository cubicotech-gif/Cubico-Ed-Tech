import type { ReactNode } from 'react';

export interface SlideConfig {
  id: string;
  label: string;
  tag: string;
  beforeTitle: string;
  afterTitle: string;
  beforeContent: ReactNode;
  afterContent: ReactNode;
  proofStat: string;
  proofLabel: string;
}
