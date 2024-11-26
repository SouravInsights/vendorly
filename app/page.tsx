import { Header } from "../app/components/layout/Header";
import { StatCard } from "../app/components/dashboard/StatCard";
import { VendorsList } from "../app/components/vendors/VendorsList";
import { Users, Package, TrendingUp } from "lucide-react";

const stats = [
  { title: "Active Vendors", value: "8", trend: "+2", icon: Users },
  { title: "Total Products", value: "24", trend: "+5", icon: Package },
  { title: "Avg. Margin", value: "32%", trend: "+5%", icon: TrendingUp },
];

const vendors = [
  { id: "1", name: "Rajesh Textiles", location: "Surat", rating: 4.8 },
  { id: "2", name: "Jaipur Fabrics", location: "Jaipur", rating: 4.5 },
];

export default function HomePage() {
  return (
    <div className="p-8">
      <Header />

      <div className="grid grid-cols-3 gap-6 mt-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-8">
        <VendorsList vendors={vendors} />
      </div>
    </div>
  );
}
