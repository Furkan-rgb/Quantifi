import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton } from "./emblaButtons";
import Image, { StaticImageData } from "next/future/image";
import image1 from "../public/image11.png";
import image2 from "../public/image22.png";
import image3 from "../public/image33.png";
import image4 from "../public/image44.png";
import image5 from "../public/image55.png";

function Carousel() {
  // Autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 30 }, [Autoplay()]);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  //   The slides
  const slides: {
    id: number;
    img: StaticImageData;
    header: {
      keyword: { first: boolean; content: string };
      title: string;
    };
    desc: string;
  }[] = [
    {
      id: 1,
      img: image1,
      header: {
        keyword: { first: true, content: "Decentralized" },
        title: "by Design",
      },
      desc: "QuantiFi is a decentralized investment fund governed by a DAO. Utilising professional level quantitative models combined with AI money management software we offer managed exposure to the digital asset community.",
    },
    {
      id: 2,
      img: image2,
      header: { keyword: { first: true, content: "Investment" }, title: "for All" },
      desc: "Traditionally the Quantitative investment approach has been reserved for high net-worth individuals, institutions, family offices and accredited investors. Quantifi is changing this. Through blockchain technology, we brings sophisticated trading strategies in a trustees, decentralized environment to the retail community.",
    },
    {
      id: 3,
      img: image3,
      header: { keyword: { first: true, content: "Govern" }, title: "with QNTFI" },
      desc: "Quantifi is governed by a DAO made up of holders of the QNTFI governance token. The Quantifi DAO receives the 20% performance fee levied from trading profits, which is paid out periodically to QNTFI holders. In return, governance token holders bring security to the fund by evaluating proposals and voting on their implementation.",
    },
    {
      id: 4,
      img: image4,
      header: { keyword: { first: false, content: "Difference" }, title: "The QuantiFi" },
      desc: "The founders of QuantiFi have deep knowledge and experience in traditional finance, as well as in cryptocurrency and decentralized finance. Building upon this experience, we built QuantiFi upon the analytical models of our Swiss Quantitative Firm. We then licenced this model to the Quantifi DAO to build a decentralized Defi trading fund, in which investors funds are protected by smart contracts and invested in a way previously reserved for eligible investors.",
    },
    {
      id: 5,
      img: image5,
      header: { keyword: { first: true, content: "Invest" }, title: "with QIT" },
      desc: "QuantiFi investors deposit stable coins in return for Quantifi Investor Tokens (QIT). Deposited funds are managed professionally to grow the value of QIT, thus earning yield for QIT holders. Investors can realise their profits by redeeming their QIT for stablecoins. In return, Quantifi charges a 2% deposit fee and a 20% performance fee.",
    },
  ];

  return (
    <div className="h-full max-w-full overflow-hidden bg-black md:h-fit" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => {
          return (
            // Slide
            <div key={slide.id} className="flex flex-col-reverse flex-embla sm:flex-row">
              {/* Image half */}
              <div className="bg-center-right flex h-[48vh] w-full items-center justify-center  bg-cover bg-no-repeat sm:h-full sm:w-1/2">
                <div className="bg-right-center absolute h-[49vh] w-full bg-gradient-to-t from-transparent via-transparent to-black sm:h-full sm:w-1/2 sm:bg-gradient-to-r" />
                <Image
                  className="object-cover w-full h-full"
                  src={slide.img}
                  width={500}
                  height={500}
                  alt={slide.header.title}
                  placeholder="blur"
                />
              </div>
              {/* Text half */}
              <div className="z-20 flex h-[49vh] max-h-fit w-full flex-col items-center justify-start overflow-visible bg-black py-6 text-center text-5xl sm:h-full sm:w-1/2 sm:items-center sm:justify-center sm:text-left">
                <div className="max-w-lg px-5 overflow-visible bg-gradient-to-t from-transparent to-black sm:bg-transparent">
                  {/* Title */}
                  <div className="mb-4 md:mb-0">
                    {slide.header.keyword.first ? (
                      <p className="font-sans font-light text-white">
                        <span className="bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] bg-clip-text text-transparent">
                          {slide.header.keyword.content}
                        </span>{" "}
                        {slide.header.title}
                      </p>
                    ) : (
                      <p className="font-sans font-light text-white">
                        <span>{slide.header.title}</span>{" "}
                        <span className="bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] bg-clip-text text-transparent">
                          {slide.header.keyword.content}
                        </span>
                      </p>
                    )}
                  </div>
                  {/* Description */}
                  <p className="mt-2 mb-3 overflow-visible font-sans text-xl text-white sm:mt-6 md:mb-0">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
