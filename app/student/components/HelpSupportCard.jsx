// components/HelpSupportCard.js
import React from "react";

const HelpSupportCard = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-emerald-200 rounded-lg w-full shadow-sm mt-0">
        <div className="text-center p-5">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Need Help?
          </h3>
          <p className="text-gray-700 mb-6 text-sm leading-relaxed">
            Get support from teachers or join study groups to enhance your
            learning experience.
          </p>
          <div className="flex flex-col gap-3">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
              Ask a Teacher
            </button>
            <button className="w-full bg-white hover:bg-gray-50 text-green-600 font-medium py-2.5 px-4 rounded-lg border border-green-600 transition-colors duration-200">
              Join Study Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportCard;
