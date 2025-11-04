import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";

export default function Todo() {
  const [task, setTask] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [done, setDone] = useState<boolean[]>([]);

  const addTask = () => {
    if (input.trim() === "") return alert("Task Cannot Be Empty !");
    if (task.length >= 10) return alert("You can only add up to 10 tasks!");
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
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="z-10 p-6 rounded-2xl shadow-2xl text-center bg-white/20 w-[450px] h-[600px] flex flex-col">
        <h1 className="text-3xl italic text-slate-300 mb-4">
          All Tasks {task.length > 0 ? `: ${task.length}` : ""}
        </h1>
        <div className="flex justify-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Task Here"
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length === 50) {
                alert(
                  "Character limit reached! Maximum 50 characters allowed."
                );
                return;
              }
              setInput(value);
            }}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            maxLength={50}
            className="border border-gray-400 rounded-md px-3 py-1 text-white placeholder-slate-300 bg-transparent"
          />
          <button
            onClick={addTask}
            className="bg-green-700 hover:bg-green-500 text-white px-4 py-1 rounded-md ease-in duration-100"
          >
            Add
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 min-h-0 pr-2">
          {task.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-[80%] italic text-2xl text-gray-300">
              <p>Add A Task Now</p>
            </div>
          ) : (
            task.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/20 px-4 py-2 rounded-md"
              >
                <button onClick={() => toggleTask(index)}>
                  {done[index] ? (
                    <IoMdCheckbox className="text-green-500" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank className="text-gray-300" />
                  )}
                </button>

                <span
                  className={`flex-1 mx-3 px-2 text-left break-words whitespace-pre-wrap ${
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
