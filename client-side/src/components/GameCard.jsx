import {Fragment, useState} from "react";
import Modal from "./Modal";
import {NavLink} from "react-router-dom";

export default function GameCard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div className="mx-2">
        <div className="bg-white border-pink-200 dark:border-primary-lightest max-w-sm overflow-hidden rounded border shadow-lg">
          <div className="">
            <div className="mb-2 flex justify-between bg-primary dark:bg-primary-lightest dark:text-darkest px-3  py-2 text-xl font-bold text-light-text">
              <h1>Game Title</h1>
              <small>Completed</small>
            </div>
            <p className="text-gray-700 px-3 py-2 text-base">
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
                  className="hover:bg-blue-700 text-white rounded  bg-primary-lightest dark:bg-primary-lightest dark:text-darkest px-5 py-1 font-bold"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-background-color p-6 dark:bg-primary-lightest dark:text-darkest">
          <h3 className="text-center text-xl font-bold">
            Choose how you want to join the game
          </h3>
          <br />
          <hr className="bg-primary" />
          <div className="div p-2 ">
            <p className="text-gray-500 mt-2">
              Caution, Guest Players cannot track playing history
            </p>
            <p className="text-gray-500 mt-2">
              Member players can track history and ranking with other players
            </p>
          </div>
          <div className="mt-3 flex justify-around text-light-text">
            <NavLink to="/register">
              <button className="cursor-pointer rounded-full bg-primary-light px-4 py-1">
                Member
              </button>
            </NavLink>
            <button className="cursor-pointer rounded-full bg-primary-light px-4 py-1">
              Guest
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
