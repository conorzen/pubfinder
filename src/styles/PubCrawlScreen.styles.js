import { StyleSheet } from 'react-native';

// Define any reusable values as constants
const COLORS = {
  primary: '#4a90e2',
  secondary: '#2ecc71',
  background: '#f5f5f5',
  white: '#ffffff',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#ffffff',
  },
  border: '#eeeeee',
  shadow: '#000000',
  danger: '#ff4444',
};

const SPACING = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 24,
};

const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export default StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  section: {
    marginTop: SPACING.lg,
    padding: SPACING.lg,
    paddingTop: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: SPACING.lg,
    marginTop: 0,
  },

  // Typography
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    margin: SPACING.lg,
    color: COLORS.text.primary,
  },

  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
    color: COLORS.text.primary,
  },

  // Buttons
  createButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    marginHorizontal: SPACING.xs,
  },

  roundPlannerButton: {
    backgroundColor: COLORS.secondary,
  },

  createButtonText: {
    color: COLORS.text.light,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semiBold,
    marginLeft: SPACING.sm,
  },

  // Cards
  routeCard: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },

  roundCard: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING.md,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },

  // Card Elements
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },

  routeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semiBold,
    color: COLORS.text.primary,
    marginRight: SPACING.sm,
  },

  routeDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
    lineHeight: SPACING.lg,
  },

  // Badges
  customBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.md,
  },

  customBadgeText: {
    color: COLORS.text.light,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
  },

  // Actions
  routeActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deleteButton: {
    marginRight: SPACING.sm,
    padding: SPACING.xs,
  },

  // Details & Summary
  routeFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: SPACING.lg,
  },

  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  roundDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },

  detailText: {
    marginLeft: SPACING.xs,
    color: COLORS.text.secondary,
    fontSize: FONTS.sizes.sm,
  },

  roundDetailText: {
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
  },

  // Round Summary
  roundSummary: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
});