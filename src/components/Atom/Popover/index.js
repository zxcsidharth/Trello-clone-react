import React, { useState } from "react";

import { usePopper } from "react-popper";
import PopoverContent from "./Popover";
import BaseModal from "../BaseModal";

export function Popover({ children, content }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
  });
  return (
    <>
      <PopoverContent
        isOpen={isPopoverOpen}
        content={
          <BaseModal
            style={{ background: "transparent" }}
            onClose={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <div
              ref={setPopperElement}
              style={{ ...styles.popper, zIndex: 999 }}
              {...attributes.popper}
              className='popover-content bg-white'
            >
              {content}
            </div>
          </BaseModal>
        }
      >
        <div
          ref={setReferenceElement}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          {children}
        </div>
      </PopoverContent>
    </>
  );
}
