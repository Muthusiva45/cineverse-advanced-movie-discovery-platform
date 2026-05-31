function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <div className="glass-panel rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cinema-muted">{label}</p>
          <p className="mt-3 text-3xl font-black text-white">{value}</p>
        </div>
        {Icon ? (
          <span className="grid h-11 w-11 place-items-center rounded-md bg-cinema-red/15 text-cinema-red">
            <Icon />
          </span>
        ) : null}
      </div>
      {helper ? <p className="mt-4 line-clamp-2 text-sm text-cinema-muted">{helper}</p> : null}
    </div>
  );
}

export default StatCard;
