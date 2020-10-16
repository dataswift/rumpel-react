import React, { useEffect, useRef } from 'react';
import './Modal.scss';
import FormatMessage from "../../features/messages/FormatMessage";

type Props = {
  open: boolean;
  onClose: () => void;
  titleMessageId: string;
};

export const Modal: React.FC<Props> = ({
  open,
  onClose,
  titleMessageId,
  children,
}) => {
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
    <div
      ref={content}
      style={open ? { display: 'block' } : {}}
      className="modal"
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className={'modal-text-title'}>
            <FormatMessage id={titleMessageId} />
          </div>
        </div>
        <div className="modal-body modal-text-content">{children}</div>
        <div className="modal-footer">
          <button onClick={onClose} className={'modal-btn-accent'}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
