import { StyleSheet } from 'react-native';

// Theme constants
const COLORS = {
  primary: '#4a90e2',
  danger: '#dc3545',
  background: '#f5f5f5',
  white: '#ffffff',
  inputBg: '#f8f9fa',
  border: '#e1e1e1',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#ffffff',
  },
  rating: {
    active: '#FFD700',
    inactive: '#666666',
  },
  switch: {
    track: {
      active: '#81b0ff',
      inactive: '#767577',
    },
    thumb: {
      active: '#4a90e2',
      inactive: '#f4f3f4',
    },
  },
};

const SPACING = {
  xs: 5,
  sm: 8,
  md: 10,
  lg: 15,
  xl: 20,
  xxl: 24,
};

const FONTS = {
  size: {
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
  },
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: 'bold',
  },
};

const BORDER_RADIUS = {
  sm: 4,
  base: 8,
};

export default StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header Section
  header: {
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  title: {
    fontSize: FONTS.size.xl,
    fontWeight: FONTS.weight.bold,
    marginBottom: SPACING.md,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchLabel: {
    marginRight: SPACING.md,
    fontSize: FONTS.size.base,
    color: COLORS.text.secondary,
  },

  // Form Sections
  formSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    marginTop: SPACING.md,
  },

  sectionTitle: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.semibold,
    marginBottom: SPACING.lg,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  // Input Elements
  inputContainer: {
    marginBottom: SPACING.lg,
  },

  label: {
    fontSize: FONTS.size.base,
    marginBottom: SPACING.sm,
    color: COLORS.text.primary,
  },

  input: {
    backgroundColor: COLORS.inputBg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: FONTS.size.base,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Pub Selector
  pubSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  pubSelectorText: {
    marginLeft: SPACING.md,
    fontSize: FONTS.size.base,
    color: COLORS.text.secondary,
  },

  // Drink Items
  drinkItem: {
    backgroundColor: COLORS.inputBg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.base,
    marginBottom: SPACING.md,
  },

  drinkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },

  drinkName: {
    fontSize: FONTS.size.base,
    fontWeight: FONTS.weight.semibold,
  },

  drinkPrice: {
    fontSize: FONTS.size.base,
    color: COLORS.primary,
    fontWeight: FONTS.weight.semibold,
  },

  // Rating
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  star: {
    marginRight: SPACING.xs,
  },

  ratingsCount: {
    marginLeft: SPACING.md,
    color: COLORS.text.secondary,
  },

  // Add Drink Form
  addDrinkForm: {
    backgroundColor: COLORS.inputBg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.base,
    marginTop: SPACING.md,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.md,
  },

  button: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.base,
    marginLeft: SPACING.md,
  },

  cancelButton: {
    backgroundColor: COLORS.danger,
  },

  addButton: {
    backgroundColor: COLORS.primary,
  },

  buttonText: {
    color: COLORS.text.light,
    fontSize: FONTS.size.base,
    fontWeight: FONTS.weight.medium,
  },

  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.base,
    margin: SPACING.xl,
    alignItems: 'center',
  },

  submitButtonText: {
    color: COLORS.text.light,
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.semibold,
  },
});