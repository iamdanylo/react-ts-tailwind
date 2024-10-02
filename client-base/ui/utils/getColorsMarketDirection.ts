import { ArticleMarketDirection } from 'src/articles-shared/api';

export function getColorsMarketDirection(direction: ArticleMarketDirection) {
  switch (direction) {
    case ArticleMarketDirection.BEARISH:
      return 'text-status-bearish';
    case ArticleMarketDirection.BULLISH:
      return 'text-status-bullish';
    default:
      return '';
  }
}
