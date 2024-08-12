export default function page({ params }: { params: { slug: string } }) {
  const slugPost = params.slug;

  return <div>{slugPost}</div>;
}
