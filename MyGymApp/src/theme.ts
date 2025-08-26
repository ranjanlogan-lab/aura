import { DefaultTheme } from '@react-navigation/native';
import { MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';

const colors = {
  background: '#0D1B2A',
  card: '#1B263B',
  primary: '#2EC4B6',
  accent: '#F77F00',
  text: '#E0E1DD',
  secondaryText: '#A9B1B9',
  success: '#FFD700',
  danger: '#E63946',
};

const typography = {
  heading: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 24,
    color: colors.text,
  },
  subheading: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 18,
    color: colors.text,
  },
  body: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontFamily: 'System',
    fontWeight: '300',
    fontSize: 12,
    color: colors.secondaryText,
  },
};

const shadows = {
  aura: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
};

const gradients = {
  background: ['#0D1B2A', '#1B263B', '#2EC4B6'],
  aura: ['#2EC4B6', '#FFD700', '#F77F00'],
};

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  typography,
  shadows,
  gradients,
};

export const PaperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    surface: colors.card,
    surfaceVariant: colors.card,
    onSurface: colors.text,
    onBackground: colors.text,
    error: colors.danger,
  },
};