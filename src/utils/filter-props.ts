import { Dict } from '../types/utils'

type FilterFn = (prop: string, value: any, props: Dict) => boolean

export function filterProps(props: Dict, filter: FilterFn): Dict {
  return Object.entries(props).reduce((filteredProps, [key, value]) => {
    if (filter(key, value, props))
      return { ...filteredProps, [key]: value }
    return filteredProps
  }, {} as Dict)
}
