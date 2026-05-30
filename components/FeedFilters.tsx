import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate } from 'react-native-reanimated';
import { useAppTheme } from '@/constants/AppContext';
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
  const scrollRef = useRef<ScrollView>(null);
  const itemPositions = useRef<{ x: number; width: number }[]>([]);
  const indicatorTranslateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const handleItemLayout = (index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    itemPositions.current[index] = { x, width };
  };

  const updateIndicator = (key: string) => {
    const index = filters.findIndex(f => f.key === key);
    if (index >= 0 && itemPositions.current[index]) {
      const { x, width } = itemPositions.current[index];
      indicatorTranslateX.value = withSpring(x, { damping: 20, stiffness: 200 });
      indicatorWidth.value = withSpring(width, { damping: 20, stiffness: 200 });
    }
  };

  useEffect(() => {
    updateIndicator(activeFilter);
  }, [activeFilter]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorTranslateX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, { gap: Theme.spacing.sm }]}
      >
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter.key;
          return (
            <Pressable
              key={filter.key}
              onLayout={(e) => handleItemLayout(index, e)}
              style={[
                styles.filter,
                {
                  backgroundColor: isActive ? 'transparent' : colors.surface,
                  borderColor: isActive ? 'transparent' : colors.border,
                }
              ]}
              onPress={() => onFilterChange(filter.key)}
            >
              <Text style={[
                styles.filterText,
                { color: isActive ? colors.primary : colors.textSecondary }
              ]}>
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
        <Animated.View
          style={[
            styles.indicator,
            indicatorStyle,
            { backgroundColor: colors.primary },
          ]}
          pointerEvents="none"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.xl,
    borderWidth: 1,
    zIndex: 2,
  },
  filterText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    letterSpacing: -0.2,
  },
  indicator: {
    position: 'absolute',
    bottom: 4,
    height: 3,
    borderRadius: 1.5,
    zIndex: 1,
  },
});
