// Design tokens for the Campus.Life clone. All values were measured from the reference
// screenshots (1080px wide @ 2.625 density => 411dp wide), so sizes are in dp.

export const PURPLE = '#5109B5';

export const Colors = {
  purple: PURPLE,
  splash: '#7D60F5',
  feedBg: '#E2E2E2',
  white: '#FFFFFF',
  black: '#000000',
  text: '#212121',
  grey: '#888888',
  joinStart: '#794CFF',
  joinEnd: '#45B5F4',
  joinButton: '#500AB1',
  gradStart: '#667EEA',
  gradEnd: '#764BA2',
  success: '#198754',
  primary: '#0D6EFD',
  orange: '#E65100',
  menuBg: '#F5F3F8',
  faqBg: '#F4F3EF',
  faqHero: '#5008B4',
  sheetDivider: '#4A148C',
  overlay: 'rgba(0,0,0,0.6)',
} as const;

// Font family names registered in the root layout.
export const Fonts = {
  os4: 'OpenSans_400Regular',
  os5: 'OpenSans_500Medium',
  os6: 'OpenSans_600SemiBold',
  os7: 'OpenSans_700Bold',
  mr7: 'Manrope_700Bold',
  mr8: 'Manrope_800ExtraBold',
  pp4: 'Poppins_400Regular',
  pp5: 'Poppins_500Medium',
  pp6: 'Poppins_600SemiBold',
  pp7: 'Poppins_700Bold',
  pf7: 'PlayfairDisplay_700Bold',
  sr4: 'Sora_400Regular',
  sr5: 'Sora_500Medium',
  sr7: 'Sora_700Bold',
} as const;

// Toolbar height (Android 56dp app bar).
export const BAR_H = 56;
// Bottom navigation bar height (excluding the system inset).
export const NAV_H = 55.6;
