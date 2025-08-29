import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dog-walker.jpg";
import { useBooking } from "@/contexts/BookingContext";

const Hero = () => {
  const { openTrialBooking } = useBooking();
  return (
   <section
  id="home"
  className="
    relative 
    bg-white 
    pt-12 sm:pt-12 md:pt-16 lg:pt-20 
    overflow-hidden bg-cover bg-center bg-no-repeat
    lg:min-h-screen
  "
  style={{ backgroundImage: `url("/Ellipse 25.png")` }}
>

      {/* Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[-173px] left-[-231px] w-[607px] h-[607px] bg-[#FFF8E0BD] rounded-full z-0 opacity-90"></div>
        <div className="absolute top-[233px] left-[1540px] w-[607px] h-[607px] bg-[#E7F0FFAD] rounded-full z-0 opacity-90"></div>
      </div>

      {/* Container aligned with Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] gap-8 md:gap-12 lg:gap-40">
          {/* Left Content */}
          <div className="animate-fade-in z-10 relative">
            
            {/* Heading - Narrower Width */}
            <div className="w-full max-w-[400px]">
              <h1 className="flex flex-col text-left tracking-[0.06em]">
                {/* Line 1: PLATYPUS- with dash in same color */}
                <span className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-[6xl] font-light text-[#F3C313] text-blur-shadow inline-block">
                  PLATYPUS <span className="text-black"> - </span>
                </span>

                {/* Line 2 */}
                <span className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2">
                  INDIA'S DOG
                </span>

                {/* Line 3 */}
                <span className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2">
                  WALKING&nbsp;EXPERTS
                </span>
              </h1>
            </div>

            {/* Paragraph - Wider Width */}
            {/* Paragraph - Responsive Width */}
<div className="mt-6 md:mt-8 lg:mt-10 w-full sm:w-[90%] md:w-[500px] lg:w-[638px] xl:w-[670px]">
  <p className="
    text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[22px]
    text-[#1A1A1A] 
    font-normal font-segoe 
    leading-[160%] sm:leading-[170%] md:leading-[180%] lg:leading-[180%] xl:leading-[180%]
  ">
    Book a Trial Walk Today: Safe, Joyful, Professionally Trained
    Walkers. Live GPS tracking and verified Guardians across Mumbai.
  </p>
</div>



            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6 lg:pt-8 mt-8 md:mt-10 lg:mt-12">
              <Button
                onClick={openTrialBooking}
                size="lg"
                className="text-[16px] sm:text-[18px] md:text-[20px] text-white px-8 md:px-10 h-[48px] md:h-[55px] w-full sm:w-[200px] md:w-[213px] py-3 md:py-4 font-medium rounded-[4px]
                bg-blue-500 hover:bg-blue-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
              
              >
                Book Trial Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-[#397CEF] hover:bg-blue-50 px-6 md:px-8 h-[48px] md:h-[55px] 
           w-full sm:w-[240px] md:w-[257px] rounded-[4px] py-3 md:py-4 
           text-sm flex items-center gap-3 shadow-md hover:shadow-lg 
           transition-all duration-300 hover:scale-105"

              >
                <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-b from-[#397CEF] to-[#709DEB] flex items-center rounded-full justify-center">
                  <img
                    src="/Live.png"
                    className="w-4 md:w-5 h-4 md:h-5 text-white"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs md:text-sm text-[#000000]">
                    Live Now
                  </div>
                  <div className="text-[11px] md:text-[13.89px] font-medium text-[#6ACB5D]">
                    Walking in your area
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Right Image - aligned with Navbar button end */}
          <div className="lg:flex justify-end items-center hidden">
            <div className="relative">
              <img
                src={"/hero Img.png"}
                alt="Professional dog walker with golden retriever"
                className="h-[752px] w-[502px] object-contain rounded-3xl"
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