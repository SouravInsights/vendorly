import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import type { Vendor } from "../../types";

export const VendorsList = ({ vendors }: { vendors: Vendor[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-pink-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-medium">
                  {vendor.name[0]}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{vendor.name}</h4>
                  <p className="text-sm text-gray-500">{vendor.location}</p>
                </div>
              </div>
              <Badge className="bg-pink-100 text-pink-800">
                ★ {vendor.rating}
              </Badge>
              <Button variant="ghost" size="icon">
                <MoreVertical size={16} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
