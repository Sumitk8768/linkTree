const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
