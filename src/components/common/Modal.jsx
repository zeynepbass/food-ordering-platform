import { GiCancel } from "react-icons/gi";
import Title from "@/components/common/Title";
import useOutsideClick from "@/hooks/useOutsideClick";

const Modal = ({ title, onClose, children }) => {
  const panelRef = useOutsideClick(onClose);

  return (
    <div className="fixed inset-0 z-50 grid place-content-center bg-white/60">
      <div
        ref={panelRef}
        className="relative md:w-[600px] w-[370px] max-h-[90vh] overflow-y-auto bg-white border-2 p-10 rounded-3xl"
      >
        <Title addClass="text-[40px] text-center">{title}</Title>
        {children}
        <button
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <GiCancel size={25} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
