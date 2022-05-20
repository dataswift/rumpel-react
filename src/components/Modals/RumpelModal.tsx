import React, { useEffect, useRef } from 'react';
import './RumpelModal.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const RumpelModal: React.FC<Props> = ({ open, onClose, children }) => {
  const content = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (content.current === e.target) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick, false);

    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, [onClose]);

  return (
    <div id="RumpelModal" ref={content} style={open ? { display: 'block' } : {}} className="rum-modal">
      <div className="rum-modal-content">{children}</div>
    </div>
  );
};

export default RumpelModal;
