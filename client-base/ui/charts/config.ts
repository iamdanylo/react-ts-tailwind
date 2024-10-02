import {
  AreaStyleOptions,
  ColorType,
  DeepPartial,
  HistogramStyleOptions,
  HorzScaleOptions,
  LineStyleOptions,
  PriceScaleMode,
  SeriesOptionsCommon,
  TimeChartOptions,
} from 'lightweight-charts';

export const colors = {
  backgroundColor: 'transparent',
  lineColor: '#D1A654',
  textColor: 'white',
  areaTopColor: '#D1A654',
  areaBottomColor: 'transparent',
  borderColor: 'hsla(220, 4%, 20%, 1)',
  histogramColor: '#CAA761',
};

export const baseOptions: DeepPartial<TimeChartOptions> = {
  layout: {
    background: { type: ColorType.Solid, color: colors.backgroundColor },
    textColor: colors.textColor,
    fontFamily: 'Poppins, sans-serif',
    fontSize: 12,
  },
  grid: {
    horzLines: {
      color: colors.borderColor,
    },
    vertLines: {
      color: colors.borderColor,
    },
  },
  leftPriceScale: {
    visible: true,
    autoScale: false,
  },
  rightPriceScale: {
    visible: true,
    autoScale: true,
  },
  overlayPriceScales: {
    borderColor: colors.borderColor,
    mode: PriceScaleMode.Normal,
    entireTextOnly: true,
    borderVisible: true,
    invertScale: false,
    scaleMargins: {
      top: 0.05,
      bottom: 0.2,
    },
  },
  handleScale: true,
  handleScroll: false,
};

export const chartTimeScaleOptions: DeepPartial<HorzScaleOptions> = {
  fixLeftEdge: true,
  fixRightEdge: true,
  timeVisible: true,
  lockVisibleTimeRangeOnResize: true,
  rightBarStaysOnScroll: true,
  shiftVisibleRangeOnNewBar: false,
};

export const lineSeriesOptions: DeepPartial<LineStyleOptions & SeriesOptionsCommon> = {
  priceScaleId: 'left',
  color: colors.lineColor,
  crosshairMarkerVisible: false,
  lineVisible: false,
  priceLineVisible: false,
};

export const areaSeriesOptions: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> = {
  lineColor: colors.lineColor,
  topColor: colors.areaTopColor,
  bottomColor: colors.areaBottomColor,
  priceLineWidth: 1,
  priceScaleId: 'right',
};

export const histogramSeriesOptions: DeepPartial<HistogramStyleOptions & SeriesOptionsCommon> = {
  priceScaleId: '',
  color: colors.histogramColor,
  priceLineVisible: false,
  baseLineVisible: false,
};
