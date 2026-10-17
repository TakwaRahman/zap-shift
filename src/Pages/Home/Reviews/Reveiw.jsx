import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ reveiew }) => {
  const { userName, review, user_photoURL } = reveiew;

  return (
    <div className="card w-full max-w-[340px] sm:max-w-md lg:max-w-lg bg-base-100 shadow-xl rounded-3xl p-5 sm:p-6 lg:p-8 mx-auto">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-4xl sm:text-5xl text-sky-200 mb-4 sm:mb-6" />

      {/* Review */}
      <p className="text-sm sm:text-base leading-7 text-gray-500">
        {review}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-sky-300 my-5 sm:my-7"></div>

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full">
            <img src={user_photoURL} alt={userName} />
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold">
            {userName}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500">
            Senior Product Designer
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;