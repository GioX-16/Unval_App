import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAppTheme, useTranslation } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface FilterOption {
  key: string;
  label: string;
}

interface FeedFiltersProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FeedFilters({ filters, activeFilter, onFilterChange }: FeedFiltersProps) {
  const { colors } = useAppTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key;
        return (
          <Pressable
            key={filter.key}
            style={[
              styles.filter,
              { 
                backgroundColor: isActive ? colors.primary : colors.surface,
                borderColor: isActive ? colors.primary : colors.border,
              }
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text style={[
              styles.filterText,
              { color: isActive ? colors.surface : colors.textSecondary }
            ]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  filter: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.xl,
    borderWidth: 1,
  },
  filterText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
  },
});