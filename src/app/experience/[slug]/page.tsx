const IdExperience = ({ params }: { params: { slug: string } }) => {
  const slugPost = params.slug;
  return (
    <div className="w-full pt-16">
      <div className="min-h-[calc(100vh-10rem)] w-full px-6 py-12 md:px-14 lg:px-24 2xl:px-60">{`Page: ${slugPost}`}</div>
    </div>
  );
};

export default IdExperience;
