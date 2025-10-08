
  const StateCard = ({ title, count, colorClass, iconClass }) => {
    return (
      <div className={`flex items-center p-5 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl border-l-4 ${colorClass.border} ${colorClass.bg}`}>
        <div className={`p-3 rounded-full ${colorClass.iconBg} ${colorClass.iconText} mr-4`}>

          <i className={`${iconClass} text-xl`} aria-hidden="true"></i>
        </div>
        
        <div>
          <p className="text-2xl font-extrabold text-gray-900">{count.toLocaleString()}</p>
          <p className="text-sm font-medium text-gray-600 mt-0.5">{title}</p>
        </div>
      </div>
    );
  };

  export default StateCard