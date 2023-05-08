import React, { useEffect, useState } from 'react'
import {
  CategoryScale,
  // LinearScale,
  LogarithmicScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  // Legend,
  // Plugin,
  ChartData,
  ChartOptions,
  Chart as ChartJS,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { Box, SxProps } from '@mui/material'
import { AllChainNftMintCost, chainUiKit } from '@/constants'

ChartJS.register(
  CategoryScale,
  // LinearScale,
  LogarithmicScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  // Legend,
)

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'NFTs Minted per $1',
      color: '#333',
      font: {
        size: 20,
        family: 'Roboto',
      },
    },
  },
  elements: {
    bar: {
      backgroundColor: '#173C13',
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 75,
        minRotation: 75,
      },
    },
    y: {
      type: 'logarithmic',
    },
  },
  // layout: {
  //   padding: {
  //     bottom: 60,
  //   },
  // },
}

export interface NftMintCostGraphAmountPerDollarProps {
  nftMintCost: AllChainNftMintCost
  nftType: NftTypes
  sx?: SxProps
}

// const plugins: Plugin[] = [
//   {
//     id: 'custom_logo',
//     afterDraw: (chart) => {
//       const { ctx } = chart
//       ctx.save()
//       console.log(chart)
//       const xAxis = chart.scales['x-axis-0']
//       const yAxis = chart.scales['y-axis-0']
//       xAxis.ticks.forEach((value, index) => {
//         const x = xAxis.getPixelForTick(index)
//         console.log(x)
//         const image = new Image()
//         // const chainUiInfo = chainUiKit[labels[index]]
//         // image.src = chainUiInfo.icon // image URL
//         // console.log(image.src)
//         // ctx.drawImage(image, x - 12, yAxis.bottom + 10)
//       })
//       ctx.restore()
//     },
//   },
// ]

export default function NftMintCostGraphAmountPerDollar({ nftMintCost, nftType, sx }: NftMintCostGraphAmountPerDollarProps) {
  const [data, setData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] })

  useEffect(() => {
    if (!nftMintCost || !nftType) return

    const labels: string[] = []
    const backgroundColor: string[] = []
    const dataset = nftMintCost.map((nftCostChain) => {
      labels.push(chainUiKit[nftCostChain.chainName].name)
      backgroundColor.push(chainUiKit[nftCostChain.chainName].color)
      return 1 / nftCostChain.costs[nftType]
    })

    setData({ labels, datasets: [{ data: dataset, backgroundColor }] })
  }, [nftMintCost, nftType])

  return (
    <Box sx={{ height: '100%', maxWidth: '100%', ...sx }}>
      <Bar options={options} data={data} />
    </Box>
  )
}
