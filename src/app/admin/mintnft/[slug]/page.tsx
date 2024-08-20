import IdExperienceComponent from '@/components/pages/IdExperienceComponent';

const IdExperience = ({ params }: { params: { slug: string } }) => {
  const slugPost = params.slug;

  return <IdExperienceComponent slugPost={slugPost} />;
};

export default IdExperience;
