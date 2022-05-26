import { ReactNode } from 'react'
import { ClassName, RenderNode } from '../types'

/**
 * Shorthand to quickly building a RenderNode.
 * 
 * @param children - the RenderNode (ReactNode or RenderFn).
 * @param props - the props required to invoke the render function, if any.
 */
export function rn<P>(children: RenderNode<P>, props: P): ReactNode {
  if (typeof children === 'function')
    return children(props)
  return children
}

/**
 * Shorthand to quickly build a class name that accepts a class name function.
 * 
 * @param className - the class name function or string.
 * @param props - the props required to invoke the class name function, if any.
 */
export function cn<P>(className: ClassName<P> | undefined, props: P) {
  if (typeof className === 'function')
    return className(props)
  return className
}
