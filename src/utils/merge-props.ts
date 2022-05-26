import { Dict } from '../types/utils'

type Event = { defaultPrevented: boolean }
type EventHandler = (event: Event) => void | undefined

function isEventHandler(prop: string, value: any) {
  return prop.startsWith('on') && typeof value === 'function'
}
function isTargetDisabled(target: Dict) {
  return target.disabled || target['aria-disabled']
}

export function mergeProps(...arrayOfPropsObjects: Dict[]) {
  if (arrayOfPropsObjects.length === 0) return {}
  if (arrayOfPropsObjects.length === 1) return arrayOfPropsObjects[0]

  const target: Dict = {}

  // We need to collect event handlers and build a new handler function for
  // each event that contains more than one handler.
  const eventHandlers: Dict<EventHandler[]> = {}

  for (const props of arrayOfPropsObjects) {
    Object.entries(props).forEach(([prop, value]) => {
      if (!isEventHandler(prop, value))
        return (target[prop] = value)
      // Collect event handlers.
      if (!eventHandlers[prop]) eventHandlers[prop] = []
      eventHandlers[prop].push(value)
    })
  }

  // If the target is disabled, then we have to nullify all event handlers.
  // 
  // This is important because `cloneElement` merges existing with new props,
  // instead of just overwriting.
  if (isTargetDisabled(target)) {
    for (const eventName in eventHandlers)
      target[eventName] = undefined
    return target
  }

  // Merge event handlers.
  Object.entries(eventHandlers).forEach(([eventName, handlers]) => {
    if (handlers.length === 1)
      return (target[eventName] = handlers[0])
    target[eventName] = {
      [eventName](event: Event) {
        if (!event.defaultPrevented) handlers.forEach(handler => handler(event))
      }
    }[eventName]
  })
  
  return target
}