import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';
import LightBlueGradientEllipse from '../../../../../public/Ellipse_1.svg';

export default function CertificateDetail({ params }: { params: { slug: string } }) {
  const slugPost = params.slug;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex-col items-center bg-custom-blue-gradient pt-[6.5rem]">
        <div className="mt-[1.375rem] px-4 md:px-8 sm:mt-16 lg:px-24 2xl:px-60">
          <IdExperienceComponent slugPost={slugPost} changeLayout={true} />
        </div>
        <div className="relative text-black">
          <Footer />
        </div>

        <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-[90rem]">
            <div className="absolute -left-1/2 -top-1/2 -z-10 w-[125rem] sm:-top-[5%] sm:left-[-40%] sm:w-[150%] sm:-translate-x-[20%] sm:-translate-y-[50%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
            <div className="absolute -bottom-1/2 -right-1/2 -z-10 w-[125rem] sm:-translate-y-[20%] sm:translate-x-[20%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
