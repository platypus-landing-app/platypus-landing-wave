import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-dog-walker.jpg';
import { useBooking } from '@/contexts/BookingContext';

const Hero = () => {

 const { openTrialBooking} = useBooking();
  return (
<section
  id="home"
  className="relative min-h-screen bg-white pt-20 lg:pt-20 md:pt-16 sm:pt-12 overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url("/Ellipse 25.png")`}}
>
  
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {/* Left Circle: Top Left Semi-circle */}
    <div className="absolute top-[-173px] left-[-231px] w-[607px] h-[607px] bg-[#FFF8E0BD] rounded-full z-0 opacity-90"></div>

    {/* Right Circle: Centered Vertically, Full Circle */}
    <div className="absolute top-[233px] left-[1540px] w-[607px] h-[607px] bg-[#E7F0FFAD] rounded-full z-0 opacity-90"></div>

    <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-gray-200 opacity-20 select-none">
      WALKING EXPERTS
    </span>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]">
      {/* Left Content */}
      <div className="space-y-6 md:space-y-8 lg:space-y-10 animate-fade-in z-10 relative">
     <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-10 animate-fade-in z-10 relative">
  {/* Heading */}
  <h1 className="leading-[160%] sm:leading-[150%] md:leading-[160%] lg:leading-[160%] tracking-[0.06em] text-left">
    <span className="text-[48px] xs:text-[56px] sm:text-[68px] md:text-[72px] lg:text-[79.6px] font-light text-[#F3C313] text-blur-shadow inline-block mx-2 xs:mx-3 sm:mx-4 md:mx-2 my-3 xs:my-3 sm:my-3 md:my-2">
      PLATYPUS
    </span>
    <span className="text-[46px] xs:text-[54px] sm:text-[66px] md:text-[70px] lg:text-[76.6px] font-normal text-black text-blur-shadow inline-block mx-2 xs:mx-3 sm:mx-4 md:mx-2 my-3 xs:my-3 sm:my-3 md:my-2">
      -
    </span>
    <br />
    <span className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mx-2 xs:mx-4 sm:mx-5 md:mx-3 my-3 xs:my-3 sm:my-3 md:my-2">
      INDIA'S
    </span>
    <span className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mx-2 xs:mx-4 sm:mx-5 md:mx-3 my-3 xs:my-3 sm:my-3 md:my-2">
      DOG
    </span>
    <br />
    <span className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mx-2 xs:mx-4 sm:mx-5 md:mx-3 my-3 xs:my-3 sm:my-3 md:my-2">
      WALKING&nbsp;EXPERTS
    </span>
  </h1>

  {/* Paragraph - Aligned with heading */}
  <p className="text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px] lg:text-[28px] text-[#1A1A1A] max-w-lg font-normal font-segoe leading-[145%] sm:leading-[150%] md:leading-[160%] mx-2 xs:mx-3 sm:mx-4 md:mx-5">
    Book a Trial Walk Today: Safe, Joyful, Professionally Trained Walkers.
    Live GPS tracking and verified Guardians across Mumbai.
  </p>

  {/* Buttons - Aligned with heading */}
  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2 md:pt-4 mx-2 xs:mx-3 sm:mx-4 md:mx-4">
    <Button 
      onClick={openTrialBooking}
      size="lg" 
      className="bg-[#397CEF] text-[16px] sm:text-[18px] md:text-[20px] hover:bg-blue-500 text-white px-8 md:px-10 h-[48px] md:h-[55px] w-full sm:w-[200px] md:w-[213px] py-3 md:py-4 font-medium rounded-[4px] shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-40"
    >
      Book Trial Now
    </Button>

    <Button 
      variant="outline" 
      size="lg" 
      className="border-2 text-[#397CEF26] hover:bg-blue-50 px-6 md:px-8 h-[48px] md:h-[55px] w-full sm:w-[240px] md:w-[257px] rounded-[16px] py-3 md:py-4 text-sm flex items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-b from-[#397CEF] to-[#709DEB] flex items-center rounded-[100%] justify-center">
        <img src='/Live.png' className="w-4 md:w-5 h-4 md:h-5 text-white" />
      </div>
      <div className="text-left">
        <div className="font-semibold text-xs md:text-sm text-[#000000]">Live Now</div>
        <div className="text-[11px] md:text-[13.89px] font-medium text-[#6ACB5D]">Walking in your area</div>
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
            className="h-[752px] w-[502px] object-contain drop-shadow-2xl rounded-3xl"
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