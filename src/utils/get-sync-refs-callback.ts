import { ForwardedRef } from 'react'
import { MaybeArray } from '../types/utils'

/**
 * Given an array of references, it builds a callback that keeps all references
 * in sync.
 * 
 * If there are no valid references, then it returns null.
 * If there is only one valid reference, then it returns it.
 * If there are more than one valid references, then it returns a new callback.
 */
export function getSyncRefsCallback<T>(
  ...refs: MaybeArray<ForwardedRef<T>>[]
): ForwardedRef<T> | undefined {
  const refsmap = new Map<ForwardedRef<T>, boolean>()
  refs.flat().forEach(ref => {
    if (ref === null || typeof ref === 'undefined')
      return
    if (refsmap.has(ref))
      return
    refsmap.set(ref, true)
  })
  if (refsmap.size === 0)
    return undefined
  if (refsmap.size === 1)
    return [...refsmap.keys()][0]
  return function syncRefs(value: T | null) {
    for (const ref of refsmap.keys()) {
      if (ref === null) continue
      if (typeof ref === 'function') ref(value)
      else ref.current = value
    }
  }
}