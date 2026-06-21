const getInitials = (username = "") => {
  const cleanName = username.replace(/[^a-z0-9]/gi, "");
  return cleanName.slice(0, 2).toUpperCase() || "LS";
};

const ProfileHeader = ({ avatarUrl, message, username }) => {
  return (
    <section className="flex w-full flex-col items-center pt-12 text-center sm:pt-14">
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${username} profile`}
            className="h-[104px] w-[104px] rounded-full object-cover shadow-xl shadow-cyan-900/10 ring-4 ring-white/70 sm:h-[110px] sm:w-[110px]"
          />
        ) : (
          <div className="brand-font flex h-[104px] w-[104px] items-center justify-center rounded-full bg-gradient-to-br from-[#09cbbb] to-[#008fd8] text-[25px] font-extrabold text-white shadow-xl shadow-cyan-900/10 sm:h-[110px] sm:w-[110px]">
            {getInitials(username)}
          </div>
        )}
        <div className="absolute -bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#dffdf6] text-sm font-black text-[#00bfa5] shadow-sm">
          OK
        </div>
      </div>

      <h1 className="brand-font mt-6 text-[28px] font-extrabold leading-none tracking-normal text-[#14171c] sm:text-[32px]">
        @{username}
      </h1>

      <p className="mt-4 max-w-[395px] text-[15px] font-semibold leading-6 text-zinc-700 sm:text-[16px]">
        {message}
      </p>
    </section>
  );
};

export default ProfileHeader;
