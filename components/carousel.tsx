import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
} from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton } from "./emblaButtons";

function Carousel() {
  // Autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 30 }, [Autoplay()]);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    img: string;
    header: {
      keyword: { first: boolean; content: string };
      title: string;
    };
    desc: string;
  }[] = [
    {
      id: 1,
      img: "image1.png",
      header: {
        keyword: { first: true, content: "Decentralized" },
        title: "by Design",
      },
      desc: "QuantiFi is a decentralized investment fund governed by a DAO. Utilising professional level quantitative models combined with AI money management software we offer managed exposure to the digital asset community.",
    },
    {
      id: 2,
      img: "image2.png",
      header: { keyword: { first: true, content: "Investment" }, title: "for All" },
      desc: "Traditionally the Quantitative investment approach has been reserved for high net-worth individuals, institutions, family offices and accredited investors. Quantifi is changing this. Through blockchain technology, we brings sophisticated trading strategies in a trustees, decentralized environment to the retail community.",
    },
    {
      id: 3,
      img: "image3.png",
      header: { keyword: { first: true, content: "Govern" }, title: "with QNTFI" },
      desc: "Quantifi is governed by a DAO made up of holders of the QNTFI governance token. The Quantifi DAO receives the 20% performance fee levied from trading profits, which is paid out periodically to QNTFI holders. In return, governance token holders bring security to the fund by evaluating proposals and voting on their implementation.",
    },
    {
      id: 4,
      img: "image4.png",
      header: { keyword: { first: false, content: "Difference" }, title: "The QuantiFi" },
      desc: "The founders of QuantiFi have deep knowledge and experience in traditional finance, as well as in cryptocurrency and decentralized finance. Building upon this experience, we built QuantiFi upon the analytical models of our Swiss Quantitative Firm. We then licenced this model to the Quantifi DAO to build a decentralized Defi trading fund, in which investors funds are protected by smart contracts and invested in a way previously reserved for eligible investors.",
    },
    {
      id: 5,
      img: "image5.png",
      header: { keyword: { first: true, content: "Invest" }, title: "with QIT" },
      desc: "QuantiFi investors deposit stable coins in return for Quantifi Investor Tokens (QIT). Deposited funds are managed professionally to grow the value of QIT, thus earning yield for QIT holders. Investors can realise their profits by redeeming their QIT for stablecoins. In return, Quantifi charges a 2% deposit fee and a 20% performance fee.",
    },
  ];

  return (
    <>
      <div className="embla overflow-hidden h-full" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => {
            return (
              // Slide
              <div key={slide.id} className="flex-embla flex flex-col-reverse sm:flex-row">
                {/* Image half */}
                <div className="embla__slide__img sm:w-1/2 w-full">
                  <img className="h-full w-auto" src={slide.img} />
                </div>
                {/* Text half */}
                <div className="sm:w-1/2 w-full flex justify-center text-center items-center sm:items-start flex-col sm:text-left text-5xl mx-2.5">
                  <div className="max-w-md">
                    {/* Title */}
                    <div className="mb-4 md:mb-0">
                      {slide.header.keyword.first ? (
                        <p className="font-sans font-light">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098]">
                            {slide.header.keyword.content}
                          </span>{" "}
                          {slide.header.title}
                        </p>
                      ) : (
                        <p className="font-sans font-light">
                          <span>{slide.header.title}</span>{" "}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098]">
                            {slide.header.keyword.content}
                          </span>
                        </p>
                      )}
                    </div>
                    {/* Description */}
                    <p className="font-sans mt-2 sm:mt-6 text-xl mb-3 md:mb-0">{slide.desc}</p>
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
    </>
  );
}

{
  /* <button className="embla__dot opacity-50"></button> */
}

export default Carousel;
