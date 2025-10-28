import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import LightRays from "./LightRays";

export default function Todo() {
  const [task, setTask] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [done, setDone] = useState<boolean[]>([]);

  const addTask = () => {
    if (input.trim() === "") return alert("Task Cannot Be Empty !");
    setTask([...task, input]);
    setDone([...done, false]);
    setInput("");
  };

  const deleteTask = (key: number) => {
    const tasks = [...task];
    const completionStatus = [...done];
    tasks.splice(key, 1);
    completionStatus.splice(key, 1);
    setTask(tasks);
    setDone(completionStatus);
  };

  const toggleTask = (index: number) => {
    const completionStatus = [...done];
    completionStatus[index] = !completionStatus[index];
    setDone(completionStatus);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffffff"
          raysSpeed={1.5}
          lightSpread={1}
          rayLength={1.8}
          followMouse={true}
          mouseInfluence={0.8}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="relative z-10 p-6 rounded-2xl shadow-2xl text-center bg-white/20">
        <h1 className="text-3xl italic text-slate-300 mb-4">All Tasks</h1>

        <div className="flex justify-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Task Here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="border border-gray-400 rounded-md px-3 py-1 text-black placeholder-slate-300"
          />
          <button
            onClick={addTask}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md ease-in duration-100"
          >
            Add
          </button>
        </div>

        {task.length === 0 ? (
          <p className="text-gray-300">Add A Task Now</p>
        ) : (
          <div className="space-y-2">
            {task.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/20 px-3 py-2 rounded-md"
              >
                <button onClick={() => toggleTask(index)}>
                  {done[index] ? (
                    <IoMdCheckbox className="text-green-500" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank className="text-gray-300" />
                  )}
                </button>

                <span
                  className={`flex-1 mx-3 text-left ${
                    done[index]
                      ? "line-through text-gray-400"
                      : "text-slate-300"
                  }`}
                >
                  {item}
                </span>

                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-400 hover:text-red-600"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
