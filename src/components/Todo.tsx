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
    setTask([...task, input]);
    setDone([...done, false]);
    alert("Task Added Succesfully")
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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
          
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl opacity-20">✨</div>
            <div className="absolute bottom-0 left-0 text-6xl opacity-20">🔥</div>
            <h1 className="text-4xl font-black text-white mb-2 relative z-10">
              Todo Application ✨
            </h1>
          </div>

          <div className="p-8">
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Enter Task Here"
                value={input}
                className="flex-1 px-6 py-4 rounded-full border-4 border-purple-300 focus:border-pink-400 focus:outline-none text-gray-800 placeholder-gray-400 font-medium text-lg shadow-lg"
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <button
                type="button"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 text-lg"
                onClick={addTask}
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {task.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-4 border-dashed border-purple-300">
                  <p className="text-gray-600 text-xl font-bold">
                    You Can Do It !
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Add A Task Now 
                  </p>
                </div>
              ) : (
                task.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-4 border-purple-200 hover:border-pink-400 hover:scale-105 transition-all duration-200 group shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => toggleTask(index)}
                      className="flex-shrink-0 text-purple-500 hover:text-pink-500 transition-colors"
                    >
                      {done[index] ? (
                        <IoMdCheckbox className="w-8 h-8" />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank className="w-8 h-8" />
                      )}
                    </button>

                    <h5
                      className={`flex-1 text-lg font-bold ${
                        done[index]
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {item}
                    </h5>

                    {done[index] && (
                      <span className="text-2xl">✅</span>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteTask(index)}
                      className="flex-shrink-0 p-3 bg-red-100 text-red-500 rounded-xl hover:bg-red-200 hover:scale-125 active:scale-95 transition-all duration-200 shadow-md"
                    >
                      <FaRegTrashAlt className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {task.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-4 border-purple-200">
                <div className="flex items-center justify-between text-lg font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">
                      {done.filter(Boolean).length === task.length 
                        ? 'period!! all done!' 
                        : `${done.filter(Boolean).length}/${task.length} crushed`}
                    </span>
                  </div>
                  <span className="text-purple-600">
                    {done.filter(Boolean).length === task.length && task.length > 0
                      ? 'Great You Have Completed all The Tasks'
                      : 'Keep Hustling'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-200 to-pink-200 px-8 py-4 flex items-center justify-between text-sm font-bold text-gray-700">
            <span>Stay Productive ✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}