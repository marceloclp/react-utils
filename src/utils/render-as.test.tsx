import React, { Fragment } from 'react'
import { renderAs } from './render-as'

describe('renderAs()', () => {
  const childrenArr = [<div key={0} />, <div key={1} />]
  describe('when rendering as a Fragment', () => {
    describe('and there are props being passed down', () => {
      const props = { className: 'my-div' }
      describe('and the top-most child is a valid react element', () => {
        it('should render successfully', () => {
          const result = renderAs({ as: Fragment, children: <div />, props })
          expect(result).toMatchObject({ type: 'div', props })
        })
        it('should merge any existing props and prioritize the piped down props', () => {
          const result = renderAs({
            as: Fragment,
            children: <div className="my-div-2" id="my-div" />,
            props,
          })
          expect(result).toMatchObject({
            type: 'div',
            props: { className: 'my-div', id: 'my-div' },
          })
        })
      })
      it('should throw an error if the top-most child is not a valid react element', () => {
        expect(
          () => renderAs({ as: Fragment, children: 'Invalid element', props })
        ).toThrowError()
      })
      it('should throw an error if there are more than one top-most children', () => {
        expect(
          () => renderAs({ as: Fragment, children: childrenArr, props })
        ).toThrowError()
      })
    })
    describe('and there are no props being passed down', () => {
      it('should render successfully if the top-most child is a valid react element', () => {
        const result = renderAs({ as: Fragment, children: <div /> })
        expect(result).toMatchObject({ type: Fragment })
      })
      it('should render successfully if the top-most child is not a valid react element', () => {
        const result = renderAs({ as: Fragment, children: 'Invalid element' })
        expect(result).toMatchObject({
          type: Fragment,
          props: { children: 'Invalid element' },
        })
      })
      it('should render successfully if there are more than one top-most children', () => {
        const result = renderAs({ as: Fragment, children: childrenArr })
        expect(result).toMatchObject({ type: Fragment })
      })
    })
    it('should attach the ref to the top-most valid react element', () => {
      const refObject = { current: null }
      const result = renderAs({ as: Fragment, children: <div />, refs: refObject  })
      expect(result).toMatchObject({ type: 'div', ref: refObject })
    })
  })
  describe('when rendering as a valid JSX element', () => {
    it('should render successfully', () => {
      const result = renderAs({ as: 'div', children: [] })
      expect(result).toMatchObject({ type: 'div', props: { children: [] } })
    })
    it('should attach the ref to the element', () => {
      const refCallback = () => undefined
      const result = renderAs({ as: 'div', children: [], refs: refCallback })
      expect(result).toMatchObject({ type: 'div', ref: refCallback })
    })
  })
  describe('when rendering as a valid constructor', () => {
    const Card = () => <div className="card" />
    it('should render successfully', () => {
      const result = renderAs({ as: Card, children: [] })
      expect(result).toMatchObject({ type: Card })
    })
  })
})