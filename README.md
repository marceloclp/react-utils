# React Utils

## Types

```ts
// Render utility typings.
type RenderFn<Props> = (props: Props) => ReactNode
type RenderNode<Props> = ReactNode | RenderFn<Props>

// Equality function.
type EqualityFn<T> = (prev: T, next: T) => boolean

// Class name utility typings.
type ClassNameFn<Props> = (props: Props) => string
type ClassName<Props> = string | ClassNameFn<Props>

// Shorthand, better ElementType without generic.
type ElemType = keyof JSX.IntrinsicElements | ComponentType<any>

// Extract props based on ElemType.
type PropsOf<Tag extends ElemType> = Tag extends ElementType
  ? ComponentProps<Tag> : never

// Shorthand for quickly building dynamic components.
type PropsAs<Tag extends ElemType, Props extends {}> =
  & Omit<PropsOf<Tag>, keyof Props>
  & Props
  & { as?: Tag }
```

## Utilities

```ts
// Filter object based on a filter function.
function filterProps(props: Props, filter: FilterFn): Props

// Use one of the forwarded refs if possible. Otherwise returns a callback to
// keep references in sync.
function getSyncRefsCallback<T>(...refs: MaybeArray<ForwardedRef<T>>[]): ForwardedRef<T> | undefined

// Merges props and builds new event handlers when required.
function mergeProps(...arrayOfPropsObject: Props[]): Props

// Renders a react element from the provided parameters with all the props
// correctly piped down, including references.
function renderAs({ as, displayName, children, props, refs }): ReactElement
```

## Shorthands

```ts
// Resolves RenderNodes
function rn<P>(children: RenderNode<P>, props: P): ReactNode

// Resolves class names
function cn<P>(className: ClassName<P> | undefined, props: P): string | undefined
```