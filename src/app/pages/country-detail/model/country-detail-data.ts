import { LineChartElement } from '../../../core/models/line-chart-element';

export interface CountryDetailData {
  countryName: string,
  participationCount: number,
  medalCount: number,
  athleteCount: number,
  lineChart: LineChartElement[]
}
