/**
 * Utilidades para componentes polimórficos.
 *
 * `as` acepta un componente React (View, Pressable, Link, Animated.View…).
 * Para semántica web (`section`, `article`, …) se resuelve a `View` con un
 * `accessibilityRole`, que react-native-web traduce a ARIA. Así se mantiene
 * un único árbol de estilos RN en iOS, Android y Web.
 */

import React from 'react';

export type AsProp<C extends React.ElementType> = { as?: C };

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> =
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>> &
  Props;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

/** Términos semánticos permitidos como `as` → rol accesible cross-platform. */
export const SEMANTIC_ROLE: Record<string, string> = {
  section: 'summary',
  article: 'text',
  header: 'header',
  footer: 'text',
  main: 'summary',
  nav: 'menu',
  aside: 'summary',
};

export type SemanticTag = keyof typeof SEMANTIC_ROLE;

/**
 * Resuelve el prop `as` a un componente RN válido y un rol accesible.
 * Los strings semánticos se mapean a `fallback` + role (nunca a tags DOM
 * crudos, que romperían el procesamiento de estilos de RN).
 */
export function resolveAs(
  as: React.ElementType | undefined,
  fallback: React.ElementType,
): { Component: React.ElementType; accessibilityRole?: string } {
  if (typeof as === 'string') {
    return { Component: fallback, accessibilityRole: SEMANTIC_ROLE[as] };
  }
  return { Component: as ?? fallback };
}
