import { FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-cinema-black px-4 pb-24 pt-10 sm:px-6 md:pb-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-cinema-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-black tracking-wide text-white">
            Cine<span className="text-cinema-red">Verse</span>
          </p>
          <p className="mt-2 max-w-xl">
            Premium movie discovery powered by OMDb. This portfolio project is not affiliated with
            Netflix or OMDb.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-cinema-red">
            Done by Shiva
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[FaGithub, FaInstagram, FaXTwitter].map((Icon, index) => (
            <span
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white transition hover:border-cinema-red hover:text-cinema-red"
              key={index}
            >
              <Icon />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
