import BlurReveal from './BlurReveal';

function StatCard({ icon: Icon, label, value, helper, accent = false }) {
  return (
    <BlurReveal className={`glass-panel relative overflow-hidden rounded-xl p-5 ${accent ? 'border-cinema-red/40' : ''}`}>
      {accent ? <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cinema-red/20 blur-2xl" /> : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cinema-muted">{label}</p>
          <p className="mt-3 text-4xl font-black text-white">{value}</p>
        </div>
        {Icon ? (
          <span className="grid h-11 w-11 place-items-center rounded-md bg-cinema-red/15 text-cinema-red">
            <Icon />
          </span>
        ) : null}
      </div>
      {helper ? <p className="mt-4 line-clamp-2 text-sm text-cinema-muted">{helper}</p> : null}
    </BlurReveal>
  );
}

export default StatCard;
