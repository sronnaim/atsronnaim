import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";

type PolymorphicAsProp<E extends ElementType> = {
  as?: E;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>;

const defaultElement = "p";

export type TextProps<E extends ElementType = typeof defaultElement> =
  PolymorphicProps<E>;

export function Text<E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  ...restProps
}: TextProps<E>) {
  const Component = as ?? defaultElement;

  return (
    <Component {...restProps} className={className}>
      {children}
    </Component>
  );
}
