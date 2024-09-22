export default function BlogMDXLayout({ children }: { children: React.ReactNode }) {
  function CustomH1(children: any) {
    return <h1 className="text-4xl font-bold">{children}</h1>;
  }
  function CustomP(children: any) {
    return <p className="text-lg text-[#6C6D71]">{children}</p>;
  }

  const overrideComponents = {
    h1: CustomH1,
  }

  return <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">{children}</div>;
}
