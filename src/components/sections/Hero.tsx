import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-dog-walker.jpg';

const Hero = () => {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-[#F0F0F0] pt-20">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Semicircle Background Shape */}
    <div className="absolute top-0 left-[-300px] w-[950px] h-[480px] bg-[#FFF8E0BD] rounded-b-full z-0 opacity-90 semicircle"></div>
    <div className="absolute top-0 right-[-400px] top-[250px] w-[950px] h-[480px] bg-red-900 rounded-b-full z-0 opacity-90 semicircle"></div>
    
  <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-gray-200 opacity-20 select-none">
    WALKING EXPERTS
  </span>
</div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-10 animate-fade-in z-10 relative">
            <div>
              <h1 className="leading-tight mb-8">
                <span className="text-[79.6px] md:text-4xl lg:text-5xl font-bold text-[#F3C313] font-weigth-300 drop-shadow-lg font-rounded tracking-wide">PLATYPUS</span>
                <span className="text-[76.6px] md:text-4xl lg:text-5xl text-[#0000] font-bold"> - </span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl text-black font-bold">INDIA'S DOG WALKING EXPERTS</span>
              </h1>
            </div>
            
            <p className="text-[28px] md:text-xl text-[#1A1A1A] max-w-lg font-weigth-400 font-segoe">
              Book a Trial Walk Today: Safe, Joyful, Professionally Trained Walkers.
              Live GPS tracking and verified Guardians across Mumbai.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button 
                onClick={() => handleScrollTo('#areas')}
                size="lg" 
                className="bg-[#397CEF] text-[20px] hover:bg-blue-500 text-white px-10 h-[55px] w-[213px] py-4 text-lg font-medium rounded-[4px] shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-40"
              >
                Book Trial Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 text-[#397CEF26] hover:bg-blue-50 px-8 h-[55px] w-[257px] rounded-[16px] py-4 text-sm flex items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 bg-gradient-to-b from-[#397CEF] to-[#709DEB] flex items-center rounded-[100%] justify-center">
                  <img src='/Live.png' className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm text-[#000000] font-weight-400">Live Now</div>
                  <div className="text-[13.89px] font-weight-400 font-medium text-[#6ACB5D]">Walking in your area</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:flex justify-center items-center hidden">
            <div className="relative">
             <img 
                src={"/hero Img.png"} 
                alt="Professional dog walker with golden retriever" 
                className="h-[752px] w-[502px] object-contain drop-shadow-2xl rounded-3xl"
              />

              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-3xl -z-10 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-600 rounded-full flex justify-center cursor-pointer hover:border-blue-700 transition-colors"
             onClick={() => handleScrollTo('#features')}>
          <div className="w-1 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;