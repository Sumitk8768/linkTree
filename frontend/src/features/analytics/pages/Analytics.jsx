import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, BarChart3, Link as LinkIcon, MousePointerClick, Users } from "lucide-react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import Loader from "../../../shared/components/Loader";
import { getAuthSession } from "../../auth/services/auth.storage";
import { getAnalytics } from "../services/analytics.api";

const fallbackAnalytics = {
  summary: {
    totalLinks: 12,
    totalClicks: 18420,
    uniqueVisitors: 7320,
    averageClicksPerDay: 263,
  },
  activity: [
    { day: "Mon", clicks: 180, visitors: 96 },
    { day: "Tue", clicks: 260, visitors: 140 },
    { day: "Wed", clicks: 210, visitors: 118 },
    { day: "Thu", clicks: 340, visitors: 190 },
    { day: "Fri", clicks: 420, visitors: 238 },
    { day: "Sat", clicks: 380, visitors: 210 },
    { day: "Sun", clicks: 510, visitors: 286 },
  ],
  topLinks: [
    { title: "Book a 1:1 design review", clicks: 4210, ctr: 18.4 },
    { title: "Free Figma starter kit", clicks: 3160, ctr: 15.1 },
    { title: "Weekly newsletter", clicks: 2187, ctr: 11.8 },
    { title: "Latest essay", clicks: 1284, ctr: 8.6 },
  ],
  sources: [
    { name: "Instagram", value: 44 },
    { name: "Direct", value: 26 },
    { name: "X", value: 18 },
    { name: "LinkedIn", value: 12 },
  ],
  recentActivity: [
    "Free Figma starter kit passed 3k clicks",
    "Instagram traffic increased 18% today",
    "Book a 1:1 design review is your top link",
  ],
};

const sourceColors = ["#0fbfae", "#111217", "#86a5ff", "#ffb86b"];

const formatNumber = (value = 0) => Number(value).toLocaleString();

const Analytics = () => {
  const username = getAuthSession()?.username;
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics({ username })
      .then((data) => {
        setAnalytics(data?.analytics || data);
        setError("");
      })
      .catch(() => {
        setAnalytics(fallbackAnalytics);
        setError("Showing sample analytics until the backend endpoint is connected.");
      })
      .finally(() => setLoading(false));
  }, [username]);

  const data = analytics || fallbackAnalytics;
  const stats = useMemo(
    () => [
      { icon: LinkIcon, label: "Total Links", value: data.summary?.totalLinks || 0 },
      { icon: MousePointerClick, label: "Total Clicks", value: data.summary?.totalClicks || 0 },
      { icon: Users, label: "Unique Visitors", value: data.summary?.uniqueVisitors || 0 },
      { icon: Activity, label: "Avg Clicks / Day", value: data.summary?.averageClicksPerDay || 0 },
    ],
    [data]
  );

  return (
    <DashboardLayout>
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="display-title display-gradient text-5xl">Analytics</h1>
          <p className="mt-3 text-lg font-medium text-zinc-500">
            Track clicks, visitors, traffic sources and link performance.
          </p>
        </div>
        <div className="inline-flex h-11 items-center gap-2 rounded-full border border-[#dedbd3] bg-white px-4 text-sm font-bold text-zinc-600 shadow-sm">
          <BarChart3 size={17} /> Last 7 days
        </div>
      </div>

      {loading ? <Loader label="Loading analytics..." /> : null}
      {!loading && error ? (
        <p className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          {error}
        </p>
      ) : null}

      {!loading ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <section key={stat.label} className="rounded-[26px] border border-[#dedbd3] bg-white p-6 shadow-[0_10px_24px_rgba(20,20,20,0.06)]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-extrabold text-zinc-500">{stat.label}</p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eefbf8] text-[#0a9f90]">
                      <Icon size={19} />
                    </span>
                  </div>
                  <p className="mt-5 text-4xl font-extrabold text-[#16171d]">{formatNumber(stat.value)}</p>
                </section>
              );
            })}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
            <section className="rounded-[30px] border border-[#dedbd3] bg-white p-6 shadow-[0_14px_34px_rgba(20,20,20,0.06)]">
              <h2 className="text-xl font-extrabold text-[#16171d]">Last 7 Days Activity</h2>
              <div className="mt-6 h-[330px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.activity || []}>
                    <CartesianGrid stroke="#eee9df" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="clicks" stroke="#0fbfae" fill="#d9fbf5" strokeWidth={3} />
                    <Area type="monotone" dataKey="visitors" stroke="#111217" fill="#f1f1f1" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="rounded-[30px] border border-[#dedbd3] bg-white p-6 shadow-[0_14px_34px_rgba(20,20,20,0.06)]">
              <h2 className="text-xl font-extrabold text-[#16171d]">Traffic Sources</h2>
              <div className="mt-6 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.sources || []} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>
                      {(data.sources || []).map((entry, index) => (
                        <Cell key={entry.name} fill={sourceColors[index % sourceColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-2">
                {(data.sources || []).map((source, index) => (
                  <div key={source.name} className="flex items-center justify-between text-sm font-semibold text-zinc-600">
                    <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sourceColors[index % sourceColors.length] }} />{source.name}</span>
                    <span>{source.value}%</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
            <section className="rounded-[30px] border border-[#dedbd3] bg-white p-6 shadow-[0_14px_34px_rgba(20,20,20,0.06)]">
              <h2 className="text-xl font-extrabold text-[#16171d]">Top Performing Links</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-[#ece7dd]">
                {(data.topLinks || []).map((link) => (
                  <div key={link.title} className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#ece7dd] px-4 py-4 last:border-b-0">
                    <p className="truncate font-bold text-[#16171d]">{link.title}</p>
                    <p className="font-extrabold">{formatNumber(link.clicks)}</p>
                    <p className="font-bold text-[#0a9f90]">{link.ctr}% CTR</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[30px] border border-[#dedbd3] bg-white p-6 shadow-[0_14px_34px_rgba(20,20,20,0.06)]">
              <h2 className="text-xl font-extrabold text-[#16171d]">Click Trends</h2>
              <div className="mt-6 h-[190px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.activity || []}>
                    <Bar dataKey="clicks" fill="#0fbfae" radius={[12, 12, 0, 0]} />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 space-y-3">
                {(data.recentActivity || []).map((item) => (
                  <p key={item} className="rounded-2xl bg-[#fbfaf7] px-4 py-3 text-sm font-semibold text-zinc-600">
                    {item}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </DashboardLayout>
  );
};

export default Analytics;

