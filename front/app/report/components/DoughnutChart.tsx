import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { iconColors, categoryList } from '../../lib/constants'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// 데이터 가져와야해
import { categorySumList } from '../../dummies'

const DoughnutChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

  const data = {
    labels: categorySumList
      .slice(0, 5)
      .map(
        (element) =>
          element.spendingCategoryId &&
          categoryList[element.spendingCategoryId]?.toString(),
      ) as string[],
    plugins: [ChartDataLabels],
    datasets: [
      {
        label: 'category',
        data: categorySumList
          .slice(0, 5)
          .map((element) => element.spendingCostSum) as number[],
        backgroundColor: categorySumList
          .slice(0, 5)
          .map(
            (element) =>
              element.spendingCategoryId &&
              iconColors[element.spendingCategoryId]?.toString(),
          ) as string[],
      },
    ],
  }

  const doughnutSum = () => {
    // const sliceSumList = categorySumList.slice(0, 5)
    const result = categorySumList.map(
      (element, key) => element.spendingCostSum,
    )
    const total = result.reduce(
      (sum, currValue) => (sum as number) + (currValue || 0),
      0,
    )
    return total as number
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: 'white',
        font: {
          size: 17,
        },
        padding: 6,
        formatter: function (value: number, context: any) {
          const percentage = Math.round((value / doughnutSum()) * 100)
          return percentage > 0 ? percentage.toString() + '%' : ''
        },
      },
    },
  }
  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: any) {
      const {
        ctx,
        chartArea: { top, width, height },
      } = chart
      ctx.save()
      ctx.font = 'bolder 40px sans-serif'
      ctx.fillStyle = 'Black'
      ctx.textAlign = 'center'
      ctx.fillText(
        `${
          categorySumList[0].spendingCostSum &&
          Math.round(
            (categorySumList[0].spendingCostSum / doughnutSum()) * 100,
          ) + '%'
        }`,
        width / 2,
        top + height / 1.8,
      )
    },
  }

  return <Doughnut data={data} options={options} plugins={[textCenter]} />
}

export default DoughnutChart
