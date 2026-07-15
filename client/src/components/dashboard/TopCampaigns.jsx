import { topCampaigns } from "../../data/dashboardData";

const formatCurrency = (value) =>
  `₹${new Intl.NumberFormat("en-IN").format(value)}`;

const TopCampaigns = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Search Campaign Performance</h2>

          <p className="text-sm text-slate-500">
            Google Ads | March 2026 – June 29, 2026
          </p>
        </div>

        <button className="bg-[#134080] text-white px-4 py-2 rounded-lg hover:bg-[#0d305f]">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">Campaign</th>

              <th className="text-left p-3">Platform</th>

              <th className="text-left p-3">Status</th>

              <th className="text-right p-3">Spend</th>

              <th className="text-right p-3">Impressions</th>

              <th className="text-right p-3">Clicks</th>

              <th className="text-right p-3">Conversions</th>

              <th className="text-right p-3">CTR</th>

              <th className="text-right p-3">Cost / Conv.</th>
            </tr>
          </thead>

          <tbody>
            {topCampaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-4 font-medium whitespace-nowrap">
                  {campaign.campaign}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {campaign.platform}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>

                <td className="text-right p-4 font-medium">
                  {formatCurrency(campaign.spend)}
                </td>

                <td className="text-right p-4">
                  {campaign.impressions.toLocaleString("en-IN")}
                </td>

                <td className="text-right p-4">
                  {campaign.clicks.toLocaleString("en-IN")}
                </td>

                <td className="text-right p-4 font-semibold text-[#134080]">
                  {campaign.conversions.toLocaleString("en-IN")}
                </td>

                <td className="text-right p-4">{campaign.ctr.toFixed(2)}%</td>

                <td className="text-right p-4 font-semibold text-green-600">
                  {formatCurrency(campaign.costPerConversion)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCampaigns;
