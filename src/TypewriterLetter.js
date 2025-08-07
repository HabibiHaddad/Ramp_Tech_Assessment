import { useEffect, useState } from "react";

const TypewriterLetter = ({ delay, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, delay * 500);
  }, [delay]);

  return show && <p>{children}</p>;
};

export default TypewriterLetter;
