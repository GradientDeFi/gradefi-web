import { Box, Container, Typography } from '@mui/material'
import React from 'react'

import { NftMintCostDataCardGrid } from '@/components/NftMintCostDataCard'
import useNftMintCost from '@/hooks/useNftMintCost'

export default function NftMintCostPageMain() {
  const nftMintCost = useNftMintCost()

  return (
    <Container
      sx={{
        py: { xs: 3, md: 5 },
      }}
      disableGutters
    >
      <Box>
        <Typography variant="h3" textAlign="center" fontWeight={600} className="text-gray-800">NFT Mint Cost</Typography>
        <Typography variant="subtitle1" textAlign="center" mt={1} className="text-gray-500">
          How much does it cost to mint 10000 NFTs on different blockchains?
        </Typography>
      </Box>
      <Box my={3}>
        <NftMintCostDataCardGrid nftMintCost={nftMintCost} />
      </Box>
      <Box
        maxWidth={{ xs: '100%', sm: 800 }}
        mt={7}
        mx="auto"
      >
        <Box p={3} className="border-t border-gray-300">
          <Typography variant="subtitle1" className="text-gray-500">
            For EVMs: avg. 114771 wei per minting of a bare-bone ERC-721Enumerable (by OpenZeppelin)
          </Typography>
          <Typography variant="subtitle1" className="text-gray-500">
            For Solana: bare-bone Metaplex NFT (avg. 0.012 SOL per mint)
          </Typography>
          <Typography variant="subtitle1" className="text-gray-500">
            For Solana Compressed NFT: Uncompressed equivalent (proof size: 3, depth: 14, leaf: 16384, maxBufferSize: 64, canopyDepth: 11)
          </Typography>
        </Box>
        <Box p={3} className="border-t border-gray-300">
          <Typography variant="subtitle1" className="text-gray-500">
            Notice: Base gas prices are fetched from the latest block on each EVM chain, so the displayed minting price could fluctuate from time to time.
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
