import React, { useState, useEffect } from 'react'
import { useWalletModal } from '@rainbowkit/modal'
import usePortal from 'react-useportal'
import { Web3ReactProvider } from '@web3-react/core'
import { setupProvider } from '@rainbowkit/utils'
import { css } from '@linaria/core'

const modalButton = css`
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  border: 3px solid black;
  font-weight: bold;
`

const ModalExample = () => {
  const { Portal } = usePortal()

  const {
    state: { disconnect, isConnected, connect, isConnecting },
    Modal,
    address
  } = useWalletModal({
    wallets: ['metamask', 'coinbase', 'frame'],
    chains: ['mainnet'],
    terms: (
      <span>
        By connecting a wallet, you acknowledge that you have read and agree to the RainbowKit{' '}
        <a href="/tos">Terms of Service</a>.
      </span>
    )
  })

  return (
    <>
      <pre>
        {JSON.stringify(
          {
            isConnected,
            isConnecting,
            address
          },
          null,
          2
        )}
      </pre>
      <button className={modalButton} onClick={() => (isConnected ? disconnect() : connect())}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </button>
      <Portal>{isConnecting && <Modal />} </Portal>
    </>
  )
}
export const Modal = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <ModalExample />
  </Web3ReactProvider>
)
