import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, Ref, useMemo } from 'react';
import { createChart, DeepPartial, IChartApi, TimeChartOptions, ISeriesApi, Time, LineData } from 'lightweight-charts';
import { IChartData } from './types';
import { formatDateToTime, tickMarkTypeTransformer } from './utils/date';
import {
  baseOptions,
  chartTimeScaleOptions,
  lineSeriesOptions,
  areaSeriesOptions,
  histogramSeriesOptions,
} from './config';

type Props = {
  initialData: IChartData[] | null;
  chartOptions?: DeepPartial<TimeChartOptions>;
};

export const BaseStocksChart = forwardRef(
  ({ initialData, chartOptions = {} }: Props, ref: Ref<{ update: (data: IChartData) => void } | null>) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<IChartApi | null>(null);
    const areaSeries = useRef<ISeriesApi<'Area'> | null>(null);
    const volumeSeries = useRef<ISeriesApi<'Histogram'> | null>(null);
    const lineSeries = useRef<ISeriesApi<'Line'> | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const memoizedChartOptions: DeepPartial<TimeChartOptions> = useMemo(
      () => ({
        ...baseOptions,
        ...chartOptions,
        timeScale: {
          tickMarkFormatter: tickMarkTypeTransformer,
        },
      }),
      [chartOptions],
    );

    const handleResize = useCallback(() => {
      if (chartInstance.current && chartRef.current) {
        chartInstance.current.applyOptions({
          width: chartRef.current.clientWidth,
        });
      }
    }, []);

    const handleCrosshairMove = useCallback((param: any) => {
      if (!param || !param.time || !param.point || !tooltipRef.current || !chartRef?.current || !areaSeries.current) {
        if (tooltipRef.current) tooltipRef.current.style.display = 'none';
        return;
      }

      const price = param.seriesData.get(areaSeries.current);
      if (!price) {
        tooltipRef.current.style.display = 'none';
        return;
      }

      const date = new Date((param.time as number) * 1000);
      const priceValue = (price as LineData<Time>).value?.toFixed(2) || '';

      // TODO: Need to add the tooltip styling. Requires design
      const textClass = 'text-xs tracking-[0.04em] font-primary';
      tooltipRef.current.innerHTML = `
        <div class="flex flex-col">
          <span class="${textClass}">Date: ${date.toLocaleDateString()}</span>
          <span class="${textClass}">Time: ${formatDateToTime(date)}</span>
          <span class="${textClass}">Price: $${priceValue}</span>
        </div>
      `;

      const chartRect = chartRef.current.getBoundingClientRect();
      const tooltipWidth = tooltipRef.current.clientWidth;
      const tooltipHeight = tooltipRef.current.clientHeight;
      const x = param.point.x - tooltipWidth / 1.3;
      const y = param.point.y - tooltipHeight - 30;

      tooltipRef.current.style.display = 'block';
      tooltipRef.current.style.left = `${Math.max(0, Math.min(chartRect.width - tooltipWidth, x))}px`;
      tooltipRef.current.style.top = `${Math.max(0, Math.min(chartRect.height - tooltipHeight, y))}px`;
    }, []);

    const initChart = useCallback(() => {
      if (!chartRef.current || !initialData) return;
      chartInstance.current = createChart(chartRef.current, {
        ...memoizedChartOptions,
        width: chartRef.current.clientWidth,
        height: chartRef.current.clientHeight,
      });

      chartInstance.current.timeScale().applyOptions(chartTimeScaleOptions);
      chartInstance.current.timeScale().fitContent();

      lineSeries.current = chartInstance.current.addLineSeries(lineSeriesOptions);
      areaSeries.current = chartInstance.current.addAreaSeries(areaSeriesOptions);
      volumeSeries.current = chartInstance.current.addHistogramSeries(histogramSeriesOptions);

      volumeSeries.current.priceScale().applyOptions({
        scaleMargins: {
          top: 0.85,
          bottom: 0,
        },
      });

      setData(initialData);
      chartInstance.current.subscribeCrosshairMove(handleCrosshairMove);

      return () => {
        chartInstance.current?.unsubscribeCrosshairMove(handleCrosshairMove);
      };
    }, [initialData, memoizedChartOptions]);

    useEffect(() => {
      const unsubscribe = initChart();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.remove();
        if (unsubscribe) unsubscribe();
      };
    }, [initChart, handleResize]);

    useImperativeHandle(
      ref,
      () => ({
        update: (data: IChartData) => {
          if (areaSeries.current && volumeSeries.current && lineSeries.current) {
            updateLastPointPrice(data);
            chartInstance.current?.timeScale().scrollToPosition(1, false);
          }
        },
      }),
      [initialData],
    );

    const setData = (data: IChartData[]) => {
      if (areaSeries.current && volumeSeries.current && lineSeries.current) {
        areaSeries.current.setData(data);
        volumeSeries.current.setData(data);
        lineSeries.current.setData(data);
      }
    };

    const updateLastPointPrice = (point: IChartData) => {
      if (areaSeries.current && volumeSeries.current && lineSeries.current) {
        const lastPoint = initialData?.[initialData.length - 1];

        const updated: IChartData = {
          value: point.value,
          time: lastPoint?.time || point.time,
        };

        areaSeries.current.update(updated);
        volumeSeries.current.update(updated);
        lineSeries.current.update(updated);
      }
    };

    return (
      <div className="w-full h-full relative">
        <div ref={chartRef} className="w-full h-full" />
        <div
          ref={tooltipRef}
          className="absolute z-10 hidden bg-general-dark p-2 rounded shadow pointer-events-none text-general-light"
        ></div>
      </div>
    );
  },
);

export default BaseStocksChart;
