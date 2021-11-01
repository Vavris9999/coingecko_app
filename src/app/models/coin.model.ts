export interface Coin{
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: DoubleRange;
    market_cap: number;
    market_cap_rank: number;
}
export interface CoinDetail{
    id: string;
    description: string;
    categories: string;
    name: string;
    symbol: string;
    image: string;
    links: string;
}