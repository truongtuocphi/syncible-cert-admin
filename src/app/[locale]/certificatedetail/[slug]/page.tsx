import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';

export default function CertificateDetail({ params }: { params: { slug: string } }) {
  const slugPost = params.slug;

  return (
    <>
      <div className="fixed top-0 z-30 w-screen md:mt-6">
        <Navbar />
      </div>
      <div className="min-h-screen flex-col items-center pt-16">
        <div className="mt-10 px-6 md:px-14 lg:mt-28 lg:px-24 2xl:px-60">
          <IdExperienceComponent slugPost={slugPost} changeLayout={true} />
        </div>
        <div className="relative text-white">
          <Footer />
        </div>
      </div>
    </>
  );
}
