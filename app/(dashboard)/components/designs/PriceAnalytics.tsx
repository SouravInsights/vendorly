import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

interface Design {
  id: number;
  imageUrl: string;
  finalPrice: number;
  category: string | null;
  createdAt: string;
  isShortlisted: boolean;
  meeting: {
    vendorName: string;
    location: string;
  };
}

interface PriceAnalyticsProps {
  designs: Design[];
}

interface MarketPrices {
  market: string;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  designCount: number;
}

interface CategoryPrices {
  category: string;
  averagePrice: number;
  designCount: number;
}

export function PriceAnalytics({ designs }: PriceAnalyticsProps) {
  // Calculate market-wise prices
  const marketPrices = useMemo(() => {
    const marketGroups = designs.reduce((acc, design) => {
      const market =
        design.meeting.location.split(",")[1]?.trim() ||
        design.meeting.location;
      if (!acc[market]) {
        acc[market] = {
          prices: [],
          total: 0,
          min: Infinity,
          max: -Infinity,
          count: 0,
        };
      }

      acc[market].prices.push(design.finalPrice);
      acc[market].total += design.finalPrice;
      acc[market].min = Math.min(acc[market].min, design.finalPrice);
      acc[market].max = Math.max(acc[market].max, design.finalPrice);
      acc[market].count++;

      return acc;
    }, {} as Record<string, { prices: number[]; total: number; min: number; max: number; count: number }>);

    return Object.entries(marketGroups).map(
      ([market, data]): MarketPrices => ({
        market,
        averagePrice: data.total / data.count,
        minPrice: data.min,
        maxPrice: data.max,
        designCount: data.count,
      })
    );
  }, [designs]);

  // Calculate category-wise average prices
  const categoryPrices = useMemo(() => {
    const categoryGroups = designs.reduce((acc, design) => {
      if (!design.category) return acc;

      if (!acc[design.category]) {
        acc[design.category] = {
          total: 0,
          count: 0,
        };
      }

      acc[design.category].total += design.finalPrice;
      acc[design.category].count++;

      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(categoryGroups).map(
      ([category, data]): CategoryPrices => ({
        category,
        averagePrice: data.total / data.count,
        designCount: data.count,
      })
    );
  }, [designs]);

  return (
    <div className="space-y-6">
      {/* Market Price Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Market Price Comparison</h3>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {marketPrices.map((market) => (
              <Card key={market.market} className="p-4 flex-shrink-0 w-72">
                <h4 className="font-medium">{market.market}</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500">
                    Average: ₹{(market.averagePrice / 100).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Range: ₹{(market.minPrice / 100).toLocaleString()} - ₹
                    {(market.maxPrice / 100).toLocaleString()}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {market.designCount} designs
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>

      {/* Category Averages */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Category Price Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryPrices.map((cat) => (
            <div key={cat.category} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">{cat.category}</h4>
              <p className="text-lg font-semibold mt-1">
                ₹{(cat.averagePrice / 100).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Average price ({cat.designCount} designs)
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Price Distribution Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Price Distribution</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={marketPrices}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="market" />
              <YAxis
                tickFormatter={(value) => `₹${(value / 100).toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: number) =>
                  `₹${(value / 100).toLocaleString()}`
                }
              />
              <Line
                type="monotone"
                dataKey="averagePrice"
                stroke="#ec4899"
                name="Average Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
