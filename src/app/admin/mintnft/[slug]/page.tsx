import IdExperienceComponent from '@/components/pages/IdExperienceComponent';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL || '';
if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL không được định nghĩa');
}

const IdExperience = ({ params }: { params: { slug: string } }) => {
  const slugPost = params.slug;

  return <IdExperienceComponent headerURL={headerURL} slugPost={slugPost} />;
};

export default IdExperience;
