export default function Modal({isVisible, onClose, children}) {
    if(!isVisible) return null

    const handleClose = (e) => {
        if (e.target.id === "wrapper") {
            onClose()
        }
    }
  return (
    <div id="wrapper" className="bg-black fixed inset-0 flex items-center justify-center  backdrop-blur-sm  mx-3" onClick={handleClose}>
        <div className="w-[600px] flex flex-col rounded-md ">
            <button className="text-xl place-self-end" onClick={() => onClose()}>X</button>
            <div className="bg-white p-2 rounded">
                {children}
            </div>
        </div>
    </div>
  );
}
