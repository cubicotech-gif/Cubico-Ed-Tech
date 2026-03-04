import type { SlideConfig } from '../types';
import { SlideLMS, SlideLMSMobile } from './SlideLMS';
import { SlideSchoolPortal, SlideSchoolPortalMobile } from './SlideSchoolPortal';
import { SlideAnimation, SlideAnimationMobile } from './SlideAnimation';
import { SlideERP, SlideERPMobile } from './SlideERP';

export const slides: SlideConfig[] = [
  {
    id: 'lms',
    label: 'LMS DASHBOARD',
    category: 'MOODLE LMS',
    color: 'var(--blue)',
    laptopComponent: SlideLMS,
    phoneComponent: SlideLMSMobile,
  },
  {
    id: 'portal',
    label: 'SCHOOL PORTAL',
    category: 'SCHOOL MANAGEMENT',
    color: 'var(--gold)',
    laptopComponent: SlideSchoolPortal,
    phoneComponent: SlideSchoolPortalMobile,
  },
  {
    id: 'animation',
    label: 'ANIMATION STUDIO',
    category: '3D ANIMATIONS',
    color: '#7C6AF5',
    laptopComponent: SlideAnimation,
    phoneComponent: SlideAnimationMobile,
  },
  {
    id: 'erp',
    label: 'SCHOOL ERP',
    category: 'ADMIN SYSTEM',
    color: 'var(--blue)',
    laptopComponent: SlideERP,
    phoneComponent: SlideERPMobile,
  },
];
