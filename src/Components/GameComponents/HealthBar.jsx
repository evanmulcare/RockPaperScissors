import React from 'react';
import { useSpring, animated } from 'react-spring';

const HealthBar = ({ health, position, user,wins }) => {
  const { width } = useSpring({
    width: `${health}%`,
    from: { width: position === 'left' ? '100%' : '0%' },
  });

  return (
    <div>
      <div>
        {position === 'left' ? (
          <h3 className={`uppercase font-bold text-white text-left ml-5`}>{wins} Wins</h3>
        ) : (
          <h3 className={`uppercase font-bold text-white ml-2 text-right mr-5`}>{wins} Wins</h3>
        )}
      </div>

      <div className={`border-2 rounded-2xl ${position === 'left' ? 'ml-2' : 'mr-2'} `}>
        {position === 'left' ? (
          <div className='bg-red-500 border w-full rounded-2xl '>
            <animated.div className="bg-green-500 h-full rounded-2xl" style={{ width }}>
              <div className="flex justify-start">
                <div className=" ml-2">
                  <h2 className="text-md font-semibold text-white text-left">
                    {user?.email}
                  </h2>
                </div>
              </div>
            </animated.div>
          </div>) : (

          <div className='bg-red-500 border w-full rounded-2xl flex justify-end'>
            <animated.div className="bg-green-500 h-full rounded-2xl" style={{ width }}>
              <div className="flex justify-end">
               
                <div className="mr-2">
                  <h2 className="text-md font-semibold text-white text-left">
                  {user?.firstname} {user?.lastname}
                  </h2>
                </div>
               
              </div>
            </animated.div>
          </div>)}
      </div>

    </div>
  );
};

export default HealthBar;