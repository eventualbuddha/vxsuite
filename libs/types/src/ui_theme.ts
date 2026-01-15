/** Supported screen types for VxSuite apps. */
export type ScreenType = 'builtIn' | 'elo13' | 'elo15' | 'lenovoThinkpad15';

/** Returns true if screenType is a touch screen */
export function isTouchscreen(screenType: ScreenType): boolean {
  return ['elo13', 'elo15'].includes(screenType);
}

/**  VVSG 2.0 compliant color modes used for voter-facing touchscreen apps. */
export const TOUCH_COLOR_MODES = [
  'contrastHighDark',
  'contrastHighLight',
  'contrastMedium',
  'contrastLow',
] as const;

export type TouchColorMode = (typeof TOUCH_COLOR_MODES)[number];

/** Standard color mode for non-voter-facing desktop apps. */
export type DesktopColorMode = 'desktop';

export type PrintColorMode = 'print';

/** Options for supported UI color themes. */
export type ColorMode = DesktopColorMode | PrintColorMode | TouchColorMode;

export const TOUCH_SIZE_MODES = [
  'touchSmall',
  'touchMedium',
  'touchLarge',
  'touchExtraLarge',
] as const;

/**  VVSG 2.0 compliant size modes used for voter-facing touchscreen apps. */
export type TouchSizeMode = (typeof TOUCH_SIZE_MODES)[number];

/** Standard size mode for non-voter-facing desktop apps. */
export type DesktopSizeMode = 'desktop';

export type PrintSizeMode = 'print';

/** Options for supported UI sizing themes. */
export type SizeMode = DesktopSizeMode | PrintSizeMode | TouchSizeMode;

export function isTouchSizeMode(sizeMode: SizeMode): sizeMode is TouchSizeMode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return TOUCH_SIZE_MODES.includes(sizeMode as any);
}

export type ColorString = string;

/** CSS color values for various UI features. */
export interface ColorTheme {
background: ColorString;
onBackground: ColorString;
onBackgroundMuted: ColorString;

container: ColorString;
containerLow: ColorString;
containerHigh: ColorString;
outline: ColorString;

primary: ColorString;
onPrimary: ColorString;
primaryContainer: ColorString;

neutral: ColorString;
onNeutral: ColorString;

danger: ColorString;
onDanger: ColorString;
dangerContainer: ColorString;

warningContainer: ColorString;

inverseBackground: ColorString;
onInverse: ColorString;
inverseContainer: ColorString;
inversePrimary: ColorString;
inverseWarningAccent: ColorString;

dangerAccent: ColorString;
warningAccent: ColorString;
successAccent: ColorString;
}

/** Pixel size values for various UI element types. */
export interface SizeTheme {
borderRadiusRem: number;
bordersRem: {
  hairline: number;
  medium: number;
  thick: number;
  thin: number;
  };
fontDefault: number;
fontWeight: {
  bold: number;
  light: number;
  regular: number;
  semiBold: number;
  };
headingsRem: {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  };
letterSpacingEm: number;
lineHeight: number;
minTouchAreaSeparationPx: number;
minTouchAreaSizePx: number;
}

/** UI theme configuration. */
export interface UiTheme {
colorMode: ColorMode;
colors: ColorTheme;
screenType: ScreenType;
sizeMode: SizeMode;
sizes: SizeTheme;
isVisualModeDisabled: boolean;
}

export type ColorPalette = Record<string, ColorString>;
