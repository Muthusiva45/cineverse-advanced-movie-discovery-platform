import GsapText from './GsapText';

function PageTitle({ children }) {
  return (
    <GsapText as="h1" className="mt-3 text-4xl font-black md:text-6xl">
      {children}
    </GsapText>
  );
}

export default PageTitle;
