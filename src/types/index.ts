import { ComponentProps, ComponentType, ElementType, ReactNode } from 'react'

/**
 * A render function accepts a set of props and returns a react node.
 */
export type RenderFn<Props> = (props: Props) => ReactNode

/**
 * Union of react nodes and render functions that return react nodes.
 */
export type RenderNode<Props> = ReactNode | RenderFn<Props>

/**
 * Function type used to compare two elements for equality.
 */
export type EqualityFn<T> = (prev: T, next: T) => boolean

/**
 * Class name function that accepts a set of props and expects the composed
 * class name in return.
 */
export type ClassNameFn<Props> = (props: Props) => string

/**
 * Union of string and class name function.
 */
export type ClassName<Props> = string | ClassNameFn<Props>

/**
 * Shorthand for all valid HTML elements and react component constructors.
 */
export type ElemType = keyof JSX.IntrinsicElements | ComponentType<any>

/**
 * Returns the default props of an HTML element or a React component.
 */
export type PropsOf<Tag extends ElemType> = Tag extends ElementType
  ? ComponentProps<Tag>
  : never

/**
 * Shorthand for components that can dynamically set its wrapper element type.
 * 
 * @example
 *  type Props = PropsAs<'div', { children: () => ReactNode }>
 */
export type PropsAs<Tag extends ElemType, Props extends {}> =
  & Omit<PropsOf<Tag>, keyof Props>
  & Props
  & { as?: Tag }
