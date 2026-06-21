import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  BarChart3,
  Bell,
  ChevronDown,
  ExternalLink,
  Link as LinkIcon,
  LogOut,
  Moon,
  Plus,
  Search,
} from "lucide-react";
import { clearAuthSession, getAuthSession } from "../../features/auth/services/auth.storage";

const navItems = [
  { icon: LinkIcon, label: "My Links", to: "/dashboard/links" },
  { icon: BarChart3, label: "Analytics", to: "/dashboard/analytics" },
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const username = getAuthSession()?.username || "profile";
  const displayName = username
    .replace(/[-_.]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#15161b]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-80 border-r border-[#dedbd3] bg-[#fbfaf7] lg:flex lg:flex-col">
        <div className="flex h-[86px] items-center gap-3 border-b border-[#e3e0d8] px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#10d4bd] to-[#008fd8] text-white shadow-lg shadow-cyan-500/20">
            <LinkIcon size={19} strokeWidth={2.7} />
          </div>
          <span className="text-xl font-black">Linkstack</span>
        </div>

        <div className="flex items-center gap-3 px-8 py-9">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#10d4bd] to-[#008fd8] text-xs font-black text-white">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-black">{displayName}</p>
            <p className="truncate text-sm text-zinc-500">linkstack.io/{username}</p>
          </div>
          <ChevronDown size={16} className="text-zinc-500" />
        </div>

        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex h-11 items-center gap-3 rounded-2xl px-4 text-[15px] font-semibold transition ${
                    isActive
                      ? "bg-[#f0eee8] text-[#17181d]"
                      : "text-zinc-600 hover:bg-[#f3f1eb] hover:text-[#17181d]"
                  }`
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-11 w-full items-center gap-3 rounded-2xl px-4 text-left text-[15px] font-semibold text-zinc-600 transition hover:bg-[#f3f1eb] hover:text-[#17181d]"
          >
            <LogOut size={19} />
            Logout
          </button>
        </nav>

        <div className="mt-auto border-t border-[#e3e0d8] p-4" />
      </aside>

      <div className="lg:pl-80">
        <header className="sticky top-0 z-20 border-b border-[#e3e0d8] bg-[#fbfaf7]/95 backdrop-blur">
          <div className="flex h-[86px] items-center gap-5 px-5 lg:px-10">
            <label className="flex h-11 w-full max-w-xl items-center gap-3 rounded-full border border-[#ddd9d0] bg-white px-4 text-zinc-500 shadow-sm">
              <Search size={19} />
              <input
                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-zinc-500"
                placeholder="Search links, tags, analytics..."
              />
              <span className="hidden rounded-md border border-zinc-200 px-2 py-1 text-xs font-bold text-zinc-500 sm:inline">
                ⌘K
              </span>
            </label>
            <Link
              to={`/${username}`}
              className="hidden items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-950 md:flex"
            >
              View public profile
              <ExternalLink size={15} />
            </Link>
            <button className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100 sm:flex">
              <Moon size={20} />
            </button>
            <button className="relative hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100 sm:flex">
              <Bell size={20} />
              <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
            </button>
            <Link
              to="/dashboard/links/new"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-2xl bg-[#101116] px-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black sm:px-5"
            >
              <Plus size={19} />
              <span className="hidden sm:inline">New link</span>
            </Link>
          </div>
        </header>

        <main className="min-h-[calc(100vh-86px)] px-5 py-10 lg:px-10 xl:px-[70px]">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
