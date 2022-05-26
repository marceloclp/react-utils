import { mergeProps } from './merge-props'

describe('mergeProps()', () => {
  it('should return a new props object with priority from right to left', () => {
    const props = mergeProps({ className: 'a' }, { className: 'b' })
    expect(props).toMatchObject({ className: 'b' })
  })
  describe('when there are no repeated event handlers', () => {
    it('should keep the reference to the single event handler', () => {
      const onClick = () => undefined
      const props = mergeProps(
        { className: 'abc' },
        { onClick },
      )
      expect(props).toMatchObject({ className: 'abc', onClick })
    })
  })
  describe('when there are repeated event handlers', () => {
    it('should build a new event handler', () => {
      const firstOnClick = () => undefined
      const secondOnClick = () => undefined
      const props = mergeProps(
        { onClick: firstOnClick },
        { onClick: secondOnClick },
      )
      expect(
        props.onClick !== firstOnClick &&
        props.onClick !== secondOnClick
      ).toBeTruthy()
    })
    it('should fire both handlers when the handler is invoked', () => {
      const firstOnClick = jest.fn()
      const secondOnClick = jest.fn()
      const props = mergeProps(
        { onClick: firstOnClick },
        { onClick: secondOnClick },
      )
      props.onClick({ defaultPrevented: false })
      expect(firstOnClick).toHaveBeenCalled()
      expect(secondOnClick).toHaveBeenCalled()
    })
  })
  describe('when the target is disabled', () => {
    it('should not include any handlers on the props object', () => {
      const props = mergeProps({ disabled: true }, { onClick: jest.fn() })
      expect(props.onClick).toBeUndefined()
    })
  })
})