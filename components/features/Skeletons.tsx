import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Skeleton, SkeletonLines } from '@/components/ui';

/** Skeleton de una publicación del feed. */
export const PostSkeleton = () => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.post, { backgroundColor: colors.card }]}>
      <View style={styles.postHeader}>
        <Skeleton width={48} height={48} circle />
        <View style={styles.postHeaderText}>
          <Skeleton width="55%" height={13} />
          <Skeleton width="35%" height={11} style={styles.gapXs} />
        </View>
      </View>
      <SkeletonLines lines={2} style={styles.postBody} />
      <Skeleton width="100%" height={220} radius={0} />
      <View style={styles.postActions}>
        <Skeleton width={56} height={18} />
        <Skeleton width={56} height={18} />
        <Skeleton width={56} height={18} />
      </View>
    </View>
  );
};

/** Skeleton del encabezado de perfil + tabs. */
export const ProfileSkeleton = () => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.profile, { backgroundColor: colors.card }]}>
      <Skeleton width="100%" height={120} radius={0} />
      <View style={styles.profileAvatar}>
        <Skeleton width={100} height={100} circle />
      </View>
      <View style={styles.profileInfo}>
        <Skeleton width={160} height={18} />
        <Skeleton width={110} height={13} style={styles.gapSm} />
        <View style={styles.profileBadges}>
          <Skeleton width={120} height={26} radius={13} />
          <Skeleton width={90} height={26} radius={13} />
        </View>
        <SkeletonLines lines={2} style={styles.profileBio} />
      </View>
    </View>
  );
};

/** Skeleton de fila para listas (explorar, notificaciones). */
export const ListItemSkeleton = () => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.listItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Skeleton width={48} height={48} circle />
      <View style={styles.listItemText}>
        <Skeleton width="60%" height={14} />
        <Skeleton width="40%" height={12} style={styles.gapXs} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  postHeaderText: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  postBody: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
    padding: Theme.spacing.md,
  },
  profile: {
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  profileAvatar: {
    marginTop: -50,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  profileBadges: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginVertical: Theme.spacing.md,
  },
  profileBio: {
    marginTop: Theme.spacing.xs,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    marginBottom: Theme.spacing.sm,
  },
  listItemText: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  gapXs: {
    marginTop: Theme.spacing.xs,
  },
  gapSm: {
    marginTop: Theme.spacing.sm,
  },
});
