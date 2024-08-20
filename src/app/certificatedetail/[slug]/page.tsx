import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';

export default function CertificateDetail({ params }: { params: { slug: string } }) {
  const slugPost = params.slug;

  return (
    <>
      <div className="fixed z-10 w-full bg-purple-500/30 shadow backdrop-blur-sm">
        <Navbar />
      </div>
      <div className="min-h-screen flex-col items-center pt-16">
        <div className="mt-10 px-6 md:px-14 lg:mt-28 lg:grid-cols-2 lg:px-24 2xl:px-60">
          <div className="rounded-lg bg-white p-6">
            <IdExperienceComponent slugPost={slugPost} />
          </div>
        </div>
        <div className="relative text-white">
          <Footer />
        </div>
      </div>
    </>
  );
}
