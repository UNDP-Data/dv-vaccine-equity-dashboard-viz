import { useContext, useState } from 'react';
import sortBy from 'lodash.sortby';
import { format } from 'd3-format';
import { Input, Select } from 'antd';
import { DataType, CtxDataType, IndicatorMetaDataType } from '../../Types';
import Context from '../../Context/Context';

interface Props {
  data: DataType[];
  countries: string[];
  indicators: IndicatorMetaDataType[];
}

export function DataList(props: Props) {
  const { data, countries, indicators } = props;
  const { dataListCountry, updateDataListCountry } = useContext(
    Context,
  ) as CtxDataType;
  const [search, updateSearch] = useState<string | undefined>(undefined);
  const filteredIndicatorsBySearch = search
    ? indicators.filter(d =>
        d.Indicator.toLowerCase().includes(search.toLowerCase() || ''),
      )
    : indicators;
  const dataFilteredByCountry = dataListCountry
    ? data.filter(d => d['Country or Area'] === dataListCountry)[0].data
    : undefined;
  return (
    <div>
      {dataListCountry && dataFilteredByCountry ? (
        <>
          <div
            style={{
              padding: 'var(--spacing-06)',
              backgroundColor: 'var(--white)',
              borderBottom: '1px solid var(--gray-400)',
              position: 'sticky',
              top: 0,
            }}
          >
            <Input
              className='undp-input'
              placeholder='Search an indicator'
              onChange={d => {
                updateSearch(d.target.value);
              }}
              value={search}
            />
          </div>
          <div>
            <div
              className='undp-table-head undp-table-head-sticky'
              style={{ top: '101px' }}
            >
              <div
                style={{ width: '70%' }}
                className='undp-table-head-cell undp-sticky-head-column'
              >
                Indicator
              </div>
              <div
                style={{ width: '30%' }}
                className='undp-table-head-cell undp-sticky-head-column align-right'
              >
                Value
              </div>
            </div>
            {sortBy(filteredIndicatorsBySearch, d => d.Indicator).map((d, i) =>
              dataFilteredByCountry.findIndex(
                el => el.indicator === d.DataKey,
              ) !== -1 ? (
                <div
                  key={i}
                  className='undp-table-row padding-top-05'
                  style={{ backgroundColor: 'var(--white)' }}
                >
                  <div
                    style={{ width: '70%', fontSize: '1rem' }}
                    className='undp-table-row-cell'
                  >
                    <h5 className='undp-typography'>{d.Indicator}</h5>
                  </div>
                  <div
                    style={{ width: '30%' }}
                    className='undp-table-row-cell align-right'
                  >
                    {dataFilteredByCountry.findIndex(
                      el => el.indicator === d.DataKey,
                    ) === -1 ? (
                      'NA'
                    ) : (
                      <h5 className='undp-typography margin-bottom-00 bold'>
                        {d.LabelPrefix ? `${d.LabelPrefix} ` : ''}
                        {dataFilteredByCountry.findIndex(
                          el => el.indicator === d.DataKey,
                        ) !== -1
                          ? dataFilteredByCountry[
                              dataFilteredByCountry.findIndex(
                                el => el.indicator === d.DataKey,
                              )
                            ].value < 1000000
                            ? format(',')(
                                dataFilteredByCountry[
                                  dataFilteredByCountry.findIndex(
                                    el => el.indicator === d.DataKey,
                                  )
                                ].value,
                              ).replace(',', ' ')
                            : format('.3s')(
                                dataFilteredByCountry[
                                  dataFilteredByCountry.findIndex(
                                    el => el.indicator === d.DataKey,
                                  )
                                ].value,
                              ).replace('G', 'B')
                          : dataFilteredByCountry[
                              dataFilteredByCountry.findIndex(
                                el => el.indicator === d.DataKey,
                              )
                            ].value}
                        {d.LabelSuffix ? ` ${d.LabelSuffix}` : ''}
                      </h5>
                    )}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </>
      ) : (
        <div className='center-area-info-el'>
          <h5 className='undp-typography'>
            Please select countries to see their trends
          </h5>
          <Select
            showSearch
            className='undp-select'
            placeholder='Please select a country'
            onChange={d => {
              updateDataListCountry(d);
            }}
            value={dataListCountry}
            maxTagCount='responsive'
          >
            {countries.map(d => (
              <Select.Option className='undp-select-option' key={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
