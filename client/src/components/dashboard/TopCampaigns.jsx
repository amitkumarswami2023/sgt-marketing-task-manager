import { topCampaigns } from "../../data/dashboardData";

const TopCampaigns = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Top Campaigns</h2>

          <p className="text-sm text-slate-500">
            Best performing marketing campaigns
          </p>
        </div>

        <button className="bg-[#134080] text-white px-4 py-2 rounded-lg hover:bg-[#0d305f]">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">Campaign</th>

              <th className="text-left p-3">Platform</th>

              <th className="text-left p-3">Status</th>

              <th className="text-right p-3">Spend</th>

              <th className="text-right p-3">Clicks</th>

              <th className="text-right p-3">Leads</th>

              <th className="text-right p-3">Admissions</th>

              <th className="text-right p-3">ROAS</th>
            </tr>
          </thead>

          <tbody>
            {topCampaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-4 font-medium">{campaign.campaign}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.platform === "Google Ads"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
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

                <td className="text-right p-4">{campaign.spend}</td>

                <td className="text-right p-4">
                  {campaign.clicks.toLocaleString()}
                </td>

                <td className="text-right p-4">{campaign.leads}</td>

                <td className="text-right p-4 font-semibold">
                  {campaign.admissions}
                </td>

                <td className="text-right p-4 font-bold text-green-600">
                  {campaign.roas}
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
