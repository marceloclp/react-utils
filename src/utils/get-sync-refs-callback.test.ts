import { getSyncRefsCallback } from './get-sync-refs-callback'

describe('getSyncRefsCallback()', () => {
  it('should return undefined when there are no valid refs', () => {
    expect(
      getSyncRefsCallback(undefined, null)
    ).toBe(undefined)
  })
  it('should reuse a valid ref when there is only a single valid ref', () => {
    const refObject = { current: null }
    expect(
      getSyncRefsCallback(undefined, [refObject], null)
    ).toBe(refObject)
  })
  it('should return a new ref callback when there are multiple valid refs', () => {
    expect(
      getSyncRefsCallback(undefined, { current: null }, () => undefined)
    ).toBeInstanceOf(Function)
  })
})
