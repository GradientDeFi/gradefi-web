import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'

import NftMintAmountSelectors from '@/components/NftMintAmountSelectors'
import { NftMintCostDataCardGrid } from '@/components/NftMintCostDataCard'
import { NftMintCostGraphAmountPerDollar } from '@/components/NftMintCostGraph'
import { NftMintAmount } from '@/constants'
import useNftMintCost from '@/hooks/useNftMintCost'

// TODO: custom type
const nftType: NftTypes = 'enumerable'

export default function NftMintCostPageMain() {
  const [nftMintAmount, setNftMintAmount] = useState<NftMintAmount>(10_000)
  const nftMintCost = useNftMintCost(nftMintAmount)

  return (
    <Container sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h3" textAlign="center" fontWeight={600} className="text-gray-800">NFT Mint Cost</Typography>
      <NftMintAmountSelectors
        nftMintAmount={nftMintAmount}
        setNftMintAmount={setNftMintAmount}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid xs={12} md={7}>
          <NftMintCostDataCardGrid
            nftMintCost={nftMintCost}
            mintAmount={nftMintAmount}
            nftType={nftType}
          />
        </Grid>
        <Grid xs={12} md={5}>
          <NftMintCostGraphAmountPerDollar
            nftMintCost={nftMintCost}
            nftType={nftType}
            sx={{ height: 500 }}
          />
        </Grid>
      </Grid>
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
            For Solana Compressed NFT: Uncompressed equivalent (proof size: 3) for both 10,000 and 1,000,000 NFTs
          </Typography>
        </Box>
        <Box p={3} className="border-t border-gray-300">
          <Typography variant="subtitle1" fontWeight={600} className="text-gray-500">Note:</Typography>
          <Typography variant="subtitle1" className="text-gray-500">
            Base gas prices are fetched from the latest block on each EVM chain, so the displayed minting price could fluctuate from time to time.
          </Typography>
        </Box>
        <Box p={3} className="border-t border-gray-300">
          <Typography variant="subtitle1" fontWeight={600} className="text-gray-500">Calculation:</Typography>
          <Typography variant="subtitle1" className="text-gray-500">
            EVM: # of mints * mint cost per NFT (does not account for contract creation cost)
          </Typography>
          <Typography variant="subtitle1" className="text-gray-500">
            Solana (Compressed): # of mints * mint cost per NFT (0.000005 SOL) + compressed Merkle tree initialization
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
