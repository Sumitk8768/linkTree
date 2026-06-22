import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Image, Palette, Sparkles } from "lucide-react";

const suggestions = [
  "Read my latest essay",
  "Book a 1:1 call",
  "Download the free guide",
  "Youtube",
];

const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

const LinkForm = ({
  cancelLabel = "Cancel",
  defaultValues = { title: "", url: "" },
  loading,
  onCancel,
  onSubmit,
  submitLabel = "Save link",
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ defaultValues });
  const title = useWatch({ control, name: "title" }) || "";

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[30px] border border-[#dedbd3] bg-white p-6 shadow-[0_14px_34px_rgba(20,20,20,0.06)] sm:p-10"
    >
      <div className="space-y-7">
        <label className="block">
          <span className="mb-2 block text-sm font-black text-[#17181d]">Title</span>
          <Controller
            name="title"
            control={control}
            rules={{
              maxLength: { value: 80, message: "Title must be 80 characters or fewer." },
              required: "Title is required.",
            }}
            render={({ field }) => (
              <input
                {...field}
                className="h-[60px] w-full rounded-[20px] border border-[#dedbd3] bg-[#fbfaf7] px-5 text-lg outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
                placeholder="e.g. Book a discovery call"
              />
            )}
          />
          <div className="mt-2 flex items-center justify-between text-sm text-zinc-500">
            <span>{errors.title?.message || "What people will click on your page"}</span>
            <span>{title.length}/80</span>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-black text-[#17181d]">Destination URL</span>
          <Controller
            name="url"
            control={control}
            rules={{
              pattern: { value: urlPattern, message: "Enter a valid URL." },
              required: "Destination URL is required.",
            }}
            render={({ field }) => (
              <input
                {...field}
                className="h-[60px] w-full rounded-[20px] border border-[#dedbd3] bg-[#fbfaf7] px-5 text-lg outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
                placeholder="https://cal.com/you/intro"
              />
            )}
          />
          {errors.url ? <p className="mt-2 text-sm font-semibold text-red-600">{errors.url.message}</p> : null}
        </label>

        <div>
          <p className="mb-2 text-sm font-black text-[#17181d]">Try one of these</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setValue("title", suggestion, { shouldValidate: true })}
                className="rounded-full border border-[#dedbd3] bg-[#fbfaf7] px-4 py-2 text-sm font-semibold text-[#23242a] transition hover:bg-white hover:shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 border-t border-[#e7e2d9] pt-3 sm:grid-cols-3">
          {[
            { icon: Image, label: "Thumbnail" },
            { icon: Palette, label: "Style" },
            { icon: Sparkles, label: "AI rewrite" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#dedbd3] bg-[#fbfaf7] text-sm font-semibold text-zinc-600 transition hover:bg-white"
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-14 rounded-[18px] border border-[#dedbd3] bg-white px-7 text-base font-black transition hover:bg-[#fbfaf7]"
          >
            {cancelLabel}
          </button>
          <button
            disabled={loading}
            className="h-14 rounded-[18px] bg-[#101116] px-8 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LinkForm;
