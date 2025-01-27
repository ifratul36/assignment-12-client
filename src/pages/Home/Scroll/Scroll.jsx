import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import { ServiceData } from "../../../constants";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Scroll = () => {
    return (
        <div>
            
     <SectionTitle heading={'Top Destination For Your Next Vacation'} subHeading={'enjoy your new journey'}/>   


       <div className='flex items-center justify-center flex-col h-screen bg-[#9091e324]'>

                <Swiper 
                    breakpoints={{
                        340: {
                          slidesPerView: 2,
                          spaceBetween: 15,
                        },
                        700: {
                          slidesPerView: 3,
                          spaceBetween: 15,
                        },
                      }}
                      freeMode={true}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[FreeMode, Pagination]}
                      className="max-w-[75%] lg:max-w-[86%]"
                >
                    {ServiceData.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-4 py-8 h-[280px] w-[230px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.backgroundImage})` }}
                        />
                        <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                        <div className="relative flex flex-col gap-3">
                          <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                          <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                          <p className="lg:text-[18px]">{item.content} </p>
                        </div>
                        <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
                      </div>
                    </SwiperSlide>
                  ))}

                </Swiper>

            </div>
        </div>
    );
};

export default Scroll;
