import {
  Edit3,
  ExternalLink,
  GripVertical,
  Link as LinkIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

const LinkItem = ({ link, onDelete, onEdit, onToggle }) => {
  const isActive = link.isActive ?? link.active ?? true;

  return (
    <article className="group rounded-[28px] border border-[#dedbd3] bg-white p-6 shadow-[0_10px_24px_rgba(20,20,20,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(20,20,20,0.09)]">
      <div className="flex items-center gap-5">
        <button className="hidden cursor-grab text-zinc-300 transition group-hover:text-zinc-500 md:block">
          <GripVertical size={21} />
        </button>

        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#08c8bd] to-[#008fd8] text-white shadow-lg shadow-cyan-900/10">
          <LinkIcon size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[17px] font-black text-[#16171d]">
            {link.title || "Untitled link"}
          </h3>
          <p className="mt-1 flex items-center gap-2 truncate text-sm font-medium text-zinc-500">
            <ExternalLink size={15} />
            {link.url}
          </p>
        </div>

        <div className="hidden h-11 border-l border-[#e2ded6] md:block" />

        <div className="hidden w-20 text-center md:block">
          <p className="text-xl font-black leading-none text-[#16171d]">
            {(link.clicks || 0).toLocaleString()}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-500">Clicks</p>
        </div>

        <button
          type="button"
          aria-label="Toggle active status"
          onClick={() => onToggle?.(link)}
          className={`relative h-6 w-11 rounded-full shadow-inner transition after:absolute after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow ${
            isActive
              ? "bg-[#13b889] after:right-1"
              : "bg-zinc-300 after:left-1"
          }`}
        />
        <button
          type="button"
          onClick={() => onEdit?.(link)}
          className="hidden text-zinc-500 transition hover:text-zinc-950 sm:block"
          aria-label="Edit link"
        >
          <Edit3 size={19} />
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(link)}
          className="hidden text-zinc-500 transition hover:text-red-600 sm:block"
          aria-label="Delete link"
        >
          <Trash2 size={19} />
        </button>
       
      </div>
    </article>
  );
};

export default LinkItem;
