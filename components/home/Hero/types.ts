import type { ComponentType } from 'react';

export interface SlideConfig {
  id: string;
  label: string;
  category: string;
  color: string;
  laptopComponent: ComponentType;
  phoneComponent: ComponentType;
}
