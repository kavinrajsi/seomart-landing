import * as migration_20260714_121850_initial from './20260714_121850_initial';
import * as migration_20260714_193604_remove_eyebrow from './20260714_193604_remove_eyebrow';
import * as migration_20260714_201120_testimonial_logo from './20260714_201120_testimonial_logo';
import * as migration_20260714_220347_leads from './20260714_220347_leads';

export const migrations = [
  {
    up: migration_20260714_121850_initial.up,
    down: migration_20260714_121850_initial.down,
    name: '20260714_121850_initial',
  },
  {
    up: migration_20260714_193604_remove_eyebrow.up,
    down: migration_20260714_193604_remove_eyebrow.down,
    name: '20260714_193604_remove_eyebrow',
  },
  {
    up: migration_20260714_201120_testimonial_logo.up,
    down: migration_20260714_201120_testimonial_logo.down,
    name: '20260714_201120_testimonial_logo',
  },
  {
    up: migration_20260714_220347_leads.up,
    down: migration_20260714_220347_leads.down,
    name: '20260714_220347_leads'
  },
];
