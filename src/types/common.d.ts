import React from 'react'

import tokenList from '../data/token-list.json'

export type ReactChildren = React.ReactElement | React.ReactNode | React.ReactNode[]

export interface ReactPropChildren {
  children: ReactChildren
}

export type SvgElement = HTMLElement & SVGElement

export type TokenListKeys = Exclude<keyof typeof tokenList, '_chains'>

export type TokenListVariationKeys = keyof typeof tokenList[TokenListKeys]

export interface TokenList {
  name: string,
  logo: string,
  tokens: {
    [variation: string]: {
      [chainId: string]: string // address
    }
  }
}
