const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`inline-flex h-11 items-center justify-center rounded-lg bg-[#111217] px-4 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
