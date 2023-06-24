import { Fragment, useState } from "react";
import Modal from "./Modal";

export default function GameCard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div>
        <div className="bg-white border-pink-200 max-w-sm overflow-hidden rounded border shadow-lg">
          <div className="">
            <div className="mb-2 py-2 px-3 text-xl font-bold  flex justify-between bg-primary-lightest">
              <h1>Game Title</h1>
              <small>Completed</small>
            </div>
            <p className="text-gray-700 text-base px-3 py-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              bibendum magna eu porttitor laoreet. Proin faucibus risus id mi
              interdum, a consequat nunc consectetur. Quisque at ligula at ex
              iaculis volutpat.
            </p>
          </div>
          <div className=" px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-gray-200 text-gray-700 mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold">
                  John Doe
                </span>
                <span className="bg-gray-200 text-gray-700 mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold">
                  USA
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-primary-lightest hover:bg-blue-700 text-white  rounded px-5 py-1 font-bold"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6 bg-background-color ">
          <h3 className="text-xl font-bold text-center">
            Choose how you want to join the game
          </h3>
          <br />
          <hr className="bg-primary"/>
          <div className="div p-2 ">
            <p className="mt-2 text-gray-500">Caution, Guest Players cannot track playing history</p>
            <p className="mt-2 text-gray-500">
              Member players can track history and ranking with other players
            </p>
          </div>
          <div className="flex justify-around mt-3 text-light-text">
            <button className="bg-primary-light px-4 py-1 rounded-full cursor-pointer">Member</button>
            <button className="bg-primary-light px-4 py-1 rounded-full cursor-pointer">Guest</button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
