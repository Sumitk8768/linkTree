import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { getAuthSession } from "../services/auth.storage";

const Login = () => {
  const navigate = useNavigate();
  const { error, loading, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseData = await login({
        identifier: formData.email,
        password: formData.password,
      });
      const username = getAuthSession()?.username || responseData?.user?.username;
      navigate(username ? "/dashboard/links" : "/login");
    } catch {
      // The hook owns and exposes the user-facing error state.
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#111217]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        <aside className="relative hidden overflow-hidden bg-[#101417] px-8 py-8 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_6%,rgba(13,165,177,0.72),transparent_34%),radial-gradient(circle_at_64%_100%,rgba(80,39,53,0.64),transparent_38%),linear-gradient(140deg,#17332f_0%,#12252b_48%,#121217_100%)]" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500 text-base font-extrabold shadow-lg shadow-cyan-500/30">
              L
            </div>
            <span className="text-lg font-bold">Linkstack</span>
          </div>

          <div className="relative z-10 my-auto max-w-xl">
            <h1 className="display-title text-5xl text-white xl:text-6xl">
              One link.
              <br />
              <span className="italic text-white/85">Every</span> story you tell.
            </h1>
            <p className="mt-6 max-w-lg text-base font-semibold leading-7 text-white/55">
              The link-in-bio platform trusted by 240,000+ creators, founders,
              and teams to turn followers into customers.
            </p>

            <div className="mt-10 max-w-lg rounded-2xl bg-white/15 px-6 py-6 text-white shadow-2xl backdrop-blur">
              <p className="text-base font-bold leading-7">
                "Linkstack replaced four different tools for me. My booking
                rate doubled in the first month."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-xs font-extrabold">
                  MO
                </div>
                <div>
                  <p className="text-sm font-bold">Maya Okafor</p>
                  <p className="text-sm font-semibold text-white/70">
                    Photographer - 180k followers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex gap-5 text-xs font-bold text-white/45">
            <span>SOC 2 Type II</span>
            <span>/</span>
            <span>GDPR Ready</span>
            <span>/</span>
            <span>99.99% Uptime</span>
          </div>
        </aside>

        <main className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8">
          <button
            type="button"
            aria-label="Toggle theme"
            className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-sm text-[#111217] transition hover:bg-black/5"
          >
            Theme
          </button>

          <section className="w-full max-w-[420px]">
            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500 text-base font-extrabold text-white shadow-lg shadow-cyan-500/30">
                L
              </div>
              <span className="text-lg font-bold">Linkstack</span>
            </div>

            <h1 className="display-title text-4xl text-[#111217] sm:text-[2.75rem]">
              Welcome back
            </h1>
            <p className="mt-3 max-w-md text-base leading-6 text-zinc-600">
              Sign in to your Linkstack to manage links, analytics and your
              audience.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/45 px-3 text-sm font-semibold shadow-sm transition hover:bg-white">
                <span className="font-bold text-red-500">G</span>
                Google
              </button>
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/45 px-3 text-sm font-semibold text-zinc-600 shadow-sm transition hover:bg-white">
                <span className="text-sm text-black">A</span>
                Apple
              </button>
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/45 px-3 text-sm font-semibold text-zinc-600 shadow-sm transition hover:bg-white">
                <span className="text-sm text-black">GH</span>
                GitHub
              </button>
            </div>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Or with email
              </span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-semibold">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@studio.com"
                  className="mt-2 h-12 w-full rounded-xl border border-zinc-200 bg-white/60 px-4 text-base outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
                />
              </label>

              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Password</span>
                  <button
                    type="button"
                    className="text-sm text-zinc-600 hover:text-black"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="mt-2 flex h-12 items-center rounded-xl border border-zinc-200 bg-white/60 px-4 transition focus-within:border-zinc-400 focus-within:bg-white">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((isVisible) => !isVisible)}
                    className="ml-3 text-sm text-zinc-500 hover:text-black"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <label className="flex items-center gap-3 text-sm text-zinc-600">
                <input
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#111217]"
                />
                Keep me signed in for 30 days
              </label>

              {error ? (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#101116] text-base font-bold text-white shadow-2xl shadow-black/10 transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
                <span aria-hidden="true">-&gt;</span>
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-zinc-600">
              New to Linkstack?{" "}
              <Link to="/register" className="font-semibold text-black">
                Create an account
              </Link>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Login;

