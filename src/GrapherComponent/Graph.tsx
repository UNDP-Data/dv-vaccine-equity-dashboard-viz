import { useContext } from 'react';
import { CtxDataType, DataType, IndicatorMetaDataType } from '../Types';
import Context from '../Context/Context';
import { HorizontalBarChart } from './HorizontalBarChart';
import { ScatterPlot } from './ScatterPlot';
import { BivariateMap } from './BivariateMap';
import { UnivariateMap } from './UnivariateMap';
import { BarChart } from './BarChart';
import { DataList } from './DataList';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataType[];
  countries: string[];
}

export function Graph(props: Props) {
  const { data, indicators, countries } = props;
  const { graphType, yAxisIndicator, verticalBarLayout } = useContext(
    Context,
  ) as CtxDataType;
  return (
    <div
      id='graph-node'
      className={`undp-scrollbar graph-el${
        graphType !== 'barGraph' && graphType !== 'dataList'
          ? ' no-overflow'
          : ''
      }`}
    >
      {graphType === 'scatterPlot' ? (
        yAxisIndicator ? (
          <ScatterPlot data={data} indicators={indicators} />
        ) : null
      ) : graphType === 'map' ? (
        yAxisIndicator ? (
          <BivariateMap data={data} indicators={indicators} />
        ) : (
          <UnivariateMap data={data} indicators={indicators} />
        )
      ) : graphType === 'barGraph' ? (
        verticalBarLayout ? (
          <HorizontalBarChart data={data} indicators={indicators} />
        ) : (
          <BarChart data={data} indicators={indicators} />
        )
      ) : (
        <DataList data={data} indicators={indicators} countries={countries} />
      )}
    </div>
  );
}
