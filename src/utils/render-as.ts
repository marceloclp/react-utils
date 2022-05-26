import {
  cloneElement,
  createElement,
  ElementType,
  ForwardedRef,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react'
import { ol, tab } from '../logging'
import { getSyncRefsCallback } from './get-sync-refs-callback'
import { filterProps } from './filter-props'
import { mergeProps } from './merge-props'

type Elem = HTMLElement | Element

const invalidAsFragmentError = (name: string) =>
  `Attempted to render <${name} /> as a <Fragment /> ` +
  'while passing props down.\n' +
  'You can apply one of the following solutions:\n' +
  ol(
    'Render as an actual element instead of a <Fragment />',
    'Render a single valid element as the top-most child',
  ).map(tab(2)).join('')

type RenderAsParams = {
  /**
   * The element to render as.
   * Can be any valid JSX element tag or a react function component/constructor.
   */
  as: ElementType
  displayName?: string
  children: ReactNode
  props?: Record<string, any>
  refs?: ForwardedRef<Elem> | ForwardedRef<Elem>[]
}

export function renderAs({
  as: Component,
  displayName = 'Unknown',
  children,
  props = {},
  refs = [],
}: RenderAsParams): ReactElement {
  const passthroughRef = getSyncRefsCallback(refs, props.ref)
  
  // Props without `ref` and `undefined` props.
  const filteredProps = filterProps(props, (prop, value) => {
    return prop !== 'ref' && typeof value !== 'undefined'
  })
  if (passthroughRef) filteredProps.ref = passthroughRef

  const hasProps = Object.values(filteredProps).length > 0

  // When rendering as a Fragment:
  //  1. Props and ref need to be passed to the top-most valid react element.
  //  2. If the top-most child element is also a Fragment, then attempt to pass
  //     the props down n-levels.
  //  3. If we have props to attach, and the top-most child element is not a
  //     valid react element, then throw an error.
  //  4. If we have props to attach, and we have more than one top-most child
  //     element, then throw an error.
  if (Component === Fragment && hasProps) {
    if (
      !isValidElement(children) ||
      (Array.isArray(children) && children.length > 1)
    ) throw new Error(invalidAsFragmentError(displayName))

    // Clone the top-most child element and merge the passthrough props.
    return cloneElement(children, mergeProps(children.props, filteredProps))
  }

  return createElement(Component, filteredProps, children)
}
