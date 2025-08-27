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
<section
  id="home"
  className="relative min-h-screen bg-white pt-20 overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url("/Ellipse 25.png")`}}
>
  
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {/* Left Circle: Top Left Semi-circle - hidden on mobile to prevent horizontal scroll */}
    <div className="hidden md:block absolute top-[-100px] left-[-150px] w-[300px] h-[300px] lg:top-[-173px] lg:left-[-231px] lg:w-[607px] lg:h-[607px] bg-[#FFF8E0BD] rounded-full z-0 opacity-90"></div>

    {/* Right Circle: Centered Vertically - hidden on mobile to prevent horizontal scroll */}
    <div className="hidden md:block absolute top-[150px] right-[-150px] w-[300px] h-[300px] lg:top-[233px] lg:right-[-400px] lg:w-[607px] lg:h-[607px] bg-[#E7F0FFAD] rounded-full z-0 opacity-90"></div>

    <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-gray-200 opacity-20 select-none">
      WALKING EXPERTS
    </span>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
      {/* Left Content */}
      <div className="space-y-10 animate-fade-in z-10 relative">
     <div className="flex flex-col items-start gap-10 animate-fade-in z-10 relative">
  {/* Heading */}
  <h1 className="leading-[160%] tracking-[0.08em] text-left">
    <span className="text-[79.6px] md:text-4xl lg:text-5xl font-light text-[#F3C313] text-blur-shadow inline-block mx-2 my-2">
      PLATYPUS
    </span>
    <span className="text-[76.6px] md:text-4xl lg:text-5xl font-normal text-black text-blur-shadow inline-block mx-2 my-2">
      -
    </span>
    <br />
    <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mx-3 my-2">
      INDIA'S
    </span>
    <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mx-3 my-2">
      DOG
    </span>
    <br />
    <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mx-3 my-2">
      WALKING&nbsp;EXPERTS
    </span>
  </h1>

  {/* Paragraph */}
  <p className="text-[28px] md:text-xl text-[#1A1A1A] max-w-lg font-normal font-segoe leading-[160%]">
    Book a Trial Walk Today: Safe, Joyful, Professionally Trained Walkers.
    Live GPS tracking and verified Guardians across Mumbai.
  </p>

  {/* Buttons */}
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
        <div className="font-semibold text-sm text-[#000000]">Live Now</div>
        <div className="text-[13.89px] font-medium text-[#6ACB5D]">Walking in your area</div>
      </div>
    </Button>
  </div>
</div>

      </div>
      {/* Right Image */}
      <div className="lg:flex justify-center items-center hidden">
        <div className="relative">
          <img 
            src={"/hero Img.png"} 
            alt="Professional dog walker with golden retriever" 
            className="w-full max-w-md h-auto object-contain drop-shadow-2xl rounded-3xl lg:h-[752px] lg:w-[502px]"
          />
          <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-3xl -z-10 opacity-30"></div>
        </div>
      </div>
    </div>
  </div>
</section>


  );
};

export default Hero;