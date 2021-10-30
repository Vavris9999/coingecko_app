export interface Coin{
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: DoubleRange;
    market_cap: number;
    market_cap_rank: number;
}