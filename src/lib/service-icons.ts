/**
 * Canonical list of service-card icon keys. The Services global stores one of
 * these strings per card; `src/components/services.js` maps each key to its SVG
 * glyph. Keep this list and the `glyphs` registry in the component in sync.
 */
export const SERVICE_ICON_KEYS = [
  'search',
  'chat',
  'sparkles',
  'gear',
  'megaphone',
  'share',
  'chart',
  'layout',
  'globe',
  'cart',
  'code',
  'pen',
  'bolt',
  'shield',
  'mobile',
] as const

export type ServiceIconKey = (typeof SERVICE_ICON_KEYS)[number]

export const SERVICE_ICON_OPTIONS = SERVICE_ICON_KEYS.map((key) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  value: key,
}))
