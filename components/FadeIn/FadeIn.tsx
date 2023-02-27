import { Transition } from "@headlessui/react";
import React from "react";

function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}

export default FadeIn;
