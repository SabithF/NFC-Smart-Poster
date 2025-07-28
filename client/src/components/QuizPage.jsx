import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProgress, scanPoster, submitQuiz } from '../api/posterApi';
import { getDeviceId } from '../utils/fingerprint.js';
import { UserProfile } from './UserProfile.jsx';
import { QuizCard } from './QuizCard.jsx';
import { ProductBanner } from './ProductBanner.jsx';
import Badge from './Badge.jsx';
import LeaderBoard from './LeaderBoard.jsx';
import { GridBackground } from './other_components/GridBackground';
import { Spotlight } from './other_components/spotlight';
import MainPage from './MainPage.jsx';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import Lottie from 'lottie-react';
import welcome from '../assets/Welcome.json'
import { uniqueDevice } from '../hooks/uniqueDevice.js';
import { TypewriterEffectSmootha } from './other_components/HeroText.jsx';
import CircularGallery from './other_components/CircularGallery.jsx'
import Noise from './other_components/Noise.jsx'
import Playbutton from '../assets/play-button.json';
import { StarIcon } from './const/Icons.jsx';
import trophy from '../../public/assets/img/trophy.png';
import { Counter } from "./other_components/Counter.jsx";
import AnimatedCounter from './other_components/AnimatedCounter.jsx';
import { AnimatePresence, motion } from "motion/react"




function QuizPage() {
  const { nickName, deviceId } = uniqueDevice();
  const { posterId } = useParams();
  const navigate = useNavigate();
  const bannerSectionRef = useRef(null);
  const heroSectionRef = useRef(null);

  // const [deviceIdd, setDeviceId] = useState('');
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome');
  const [scanCount, setScanCount] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [userPoints, setUserPointes] = useState(0);
  const [showQuizCard, setShowQuizCard] = useState(false);




  const scrolltoBannerSection = () => {
    bannerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })

  }
  const scrollToHeroSection = () => {
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth' })

  }

  // Get deiviceId and scan the Poster
  useEffect(() => {
    if (!deviceId) return;

    const init = async () => {
      try {

        const qData = await scanPoster(deviceId, posterId);

        if (qData.question) {
          setQuestionData(qData);

        } else if (qData.message) {
          setError(qData.message);
        } else {
          setError("Unexpected error occurred while scanning the poster.");
        }



      } catch (error) {
        setError("Failed to scan poster. Please try again later.");
        console.error("Error scanning poster:", error);

      }
    };

    init();

  }, [posterId, deviceId]);

  useEffect(() => {
    const handleWelcomeMessage = async () => {
      if (!deviceId) return;

      try {
        const progress = await getUserProgress(deviceId);
        const scans = progress?.scanCount || 0
        const badges = progress?.badges?.length || 0
        setScanCount(scans);
        setBadgeCount(badges)




        if (scans > 0) {
          setWelcomeMessage("Welcome Back");
        }
      } catch (error) {
        console.error("Error fetching progress", error);
      }
    };

    handleWelcomeMessage();

  }, [deviceId]);

  useEffect(() => {
    const points = (scanCount * 100) + (badgeCount * 1000);
    setUserPointes(points);
  }, [scanCount, badgeCount])


  // Avoid scrolling when the quiz card it true 

  useEffect(() => {
    if (showQuizCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showQuizCard])



  // Handle answer submit

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      setFeedback("Please select an answer before submitting.");
      return;
    }

    try {
      const result = await submitQuiz(deviceId, posterId, selectedAnswer);
      if (result.correct) {
        navigate('/', {
          state: {
            clue: result.clue,
            badges: result.badges,
            voucherUnlocked: result.voucherUnlocked,

          }
        });
      } else {
        setFeedback(result.message || "Wrong answer, Try again!");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setFeedback("Failed to submit answer. Please try again later.");

    }
  };


  if (error) return <div className="p-4 text-red-600">{error}</div>
  if (!questionData) return <div className="p-4">Loading Quiz...</div>;

  return (

    <>


      {/* Hero Section */}
      <section
        ref={bannerSectionRef}
        className='h-screen w-screen    bg-[#040414] overflow-hidden'>

        <div className='w-screen h-screen absolute' >
          <Noise
            patternSize={500}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
          <div className="absolute inset-0 w-screen h-screen  overflow-hidden" >
            <Spotlight />
          </div>


        </div>

        <div className="flex flex-col h-screen justify-center items-center my-5">

          <h2 className='font-newton  text-4xl  text-center 
          inline-block text-transparent bg-clip-text
          
          bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  '>
            Music <br /> Festival</h2>


          <div className="text-white text-center mt-5 shadow-2xl">
            <h2 className='font-brigada text-3xl  mb-1 shadow-3xl'>
              {welcomeMessage} </h2>
            <TypewriterEffectSmootha
              nickName={nickName}

            />

          </div>

          {/* progress */}
          <div className="font-lucky flex flex-col text-white text-center ">

            <p className='text-lg text-blue-300'>----- Progress -----</p>


            {/* progress menu */}
            <div className="flex flex-row  justify-between">

              {/* scans */}

            </div>
            <UserProfile />


          </div>

          <div className="w-55 mt-3 cursor-pointer motion-safe:animate-bounce"
            onClick={scrolltoBannerSection}>
            <Lottie animationData={Playbutton} />
          </div>


          <div className="text-white text-sm text-center pt-2 mt-2 mx-15 font-outfit">
            Experience Music Festival 2025 – our best year yet with a huge site transformation,
            over 100 live acts. <span className='text-yellow-500 font-semibold '>Collect the badges and win a vip seat</span>
          </div>

        </div>



      </section>

      <section
        ref={bannerSectionRef}
        className='h-screen w-screen flex flex-col justify-center items-center    bg-[#040414] overflow-hidden'>


        <div className='w-screen h-screen absolute' >
          <Noise
            patternSize={500}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>


        <div className="text-white justify-start text-center mt-10">
          <div className="flex flex-row items-center justify-center mb-3">
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />

          </div>
          {/* <h2 className='font-brigada text-sm  mb-2 shadow-3xl'> Welcome back </h2> */}

          <h2 className='font-brigada text-3xl  mb-6 shadow-3xl'> <span className='text-yellow-500'> the Wait is over</span>
            <br />are you ready?</h2>

          <div className="flex flex-row justify-between w-70 mt-10">
            <p className='font-brigada text-4xl   text-left  text-red-400  '>Summer <br /> 2025 <br />
              <span className="inline-flex gap-1 items-baseline">
                <span className=" font-brigada text-lg text-yellow-300">Octagon Hall,  <span className="text-white font-Boulder text-lg">London</span></span>

              </span>
            </p>
            <p className='font-brigada text-2xl  text-right text-blue-400  '>
              24th <br /> Sunday, <br /> <span className='text-white text-lg'>AUG</span> <br />
            </p>
          </div>
        </div>
        {/* <BannerCarousel /> */}
        <div className='h-100 w-100   justify-center items-center md:w-screen'>
          <div className="text-white text-center relative inset-y-15 font-brigada">
            Explore the experiences</div>

          <CircularGallery
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.15} />
        </div>



      </section>





      {/* Game zone --------------------------*/}
      <section
        ref={heroSectionRef}
        className='h-screen w-screen relative overflow-hidden bg-[url(/assets/img/gm-bg-2.jpg)]  bg-cover bg-center bg-blend-multiply '>

        <div className="absolute inset-0 bg-black/75 z-0" />




        {/* background layer */}
        <div className="absolute inset-0 z-0">
          {/* <GridBackground /> */}
          <Spotlight />
        </div>
        <div className="absolute bg-black "></div>

        <div className="relative flex flex-col mt-8 w-full h-full  ">

          {/* Points bar div */}
          <div className="flex flex-row items-center justify-between mt-10 mx-10 md:mx-20">
            {/* points */}
            <div className=" flex text-white">
              <div className="relative flex flex-row  items-center ">

                <div className="absolute -left-3 z-10 flex justify-center items-center shadow-md">
                  <img src={trophy} alt="Trophy" className="h-8 w-auto mr-2" />
                </div>

                <div className="flex font-lucky bg-blue-950 border items-center justify-center  py-1 px-6 pl-7 border-blue-700 rounded-full shadow-xl z-0  ">
                  <Counter
                    value={badgeCount}
                    places={[1]}
                    fontSize={20}
                    padding={0}
                    gap={3}
                    textColor="white"
                    fontWeight={500} />/ 5

                </div>

              </div>

            </div>
            {/* Badges */}
            <div className=" flex justify-end  text-white">


              <div className="relative flex flex-row  items-center ">

                <div class="absolute -left-2 z-10  loader border-r-2 rounded-full border-yellow-500 bg-yellow-300
                  aspect-square w-8 flex justify-center items-center text-yellow-700 right-3 " >⭐</div>

                <div className="flex font-lucky bg-blue-950 border items-center justify-center  py-1 px-6 pl-7 border-blue-700 rounded-full shadow-xl z-0  ">
                  <p className=''> {userPoints}</p>
                </div>

              </div>

            </div>
          </div>

          <div className="relative flex flex-col  justify-center items-center h-[100] w-full">
            <Lottie animationData={welcome} style={{ height: 300, width: 300 }} />
            <TypewriterEffectSmootha
              nickName={nickName}
              message={welcomeMessage}
              onPlayClick={scrolltoBannerSection} />

            <h2 className='text-white text-xl font-vt323'>click the button to being the hunt</h2>

            <div className="py-10">
              <button
                onClick={() => setShowQuizCard(true)}
                className="btn relative w-[60px] h-[50px] rounded-full border-none outline-none cursor-pointer select-none touch-manipulation transition-all duration-300"
                style={{
                  '--primary': '255, 90, 120',
                  '--secondary': '150, 50, 60',
                  outline: '10px solid rgba(var(--primary), 0.5)',
                }}
              >
                {/* Back Layer */}
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-full"
                  style={{ backgroundColor: 'rgb(var(--secondary))' }}
                />

                {/* Front Layer */}
                <div
                  className="front absolute top-0 left-0 w-full h-full rounded-full border flex items-center justify-center font-semibold text-[1.2rem] transition-all duration-150 pointer-events-none"
                  style={{
                    background: 'linear-gradient(0deg, rgba(var(--primary), 0.6) 20%, rgba(var(--primary)) 50%)',
                    boxShadow: '0 0.5em 1em -0.2em rgba(var(--secondary), 0.5)',
                    borderColor: 'rgb(var(--secondary))',
                    color: 'rgb(var(--secondary))',
                    transform: 'translateY(-15%)',
                  }}
                >

                </div>
              </button>
            </div>

            {/* Quiz card popup div */}

            <AnimatePresence>
              {showQuizCard && (

                <div





                  className="fixed  bottom-0 left-0 w-full h-full bg-black/20 backdrop-blur-lg bg-blur-md z-50 flex justify-center items-start pt-10 overflow-y-auto">
                  <motion.div className="w-full max-w-2xl px-4"

                    key="quiz-card"
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 100 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.6,
                      duration: 0.3
                    }}


                  >

                    <QuizCard
                      questionData={questionData}
                      selectedAnswer={selectedAnswer}
                      setSelectedAnswer={setSelectedAnswer}
                      feedback={feedback}
                      handleSubmit={handleSubmit}
                      posterId={posterId}
                    />
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => setShowQuizCard(false)}
                        className=" transition-transform duration-150 ease-in-out active:scale-90 "
                      >
                        <img src="/assets/img/exit.png" alt="" className='h-16' />
                      </button>
                    </div>



                  </motion.div>


                </div>
              )}
            </AnimatePresence>




          </div>
        </div>

      </section>






      {/* <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-900 text-white"> */}
      <div className="min-h-screen bg-black text-white">
        {/* bg pattern */}

        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-10 max-w-6xl">



          {/* <ProductBanner /> */}

          {/* Quiz Card */}



          <QuizCard
            questionData={questionData}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            feedback={feedback}
            handleSubmit={handleSubmit}
            posterId={posterId}
          />

          <Badge deviceId={deviceId} />
          <LeaderBoard />


        </div>


      </div>

      <section className='bg-black'>
        <h2 className='text-white text-xl font-Durango'>SCANS- 600</h2>
        <h2 className='text-white text-xl font-gyoza'>Jade Eventual Quail</h2>
        <h2 className='text-yellow-500 text-4xl font-kerod '>Jade Eventual Quail</h2>
        <h2 className='text-white text-4xl font-midorima'>Scans 600</h2>
        <h2 className='text-white text-4xl font-mike'>600</h2>
        <h2 className='text-white text-4xl font-noctaOutline'>Jade Eventual Quail</h2>
        <h2 className='text-white text-4xl font-noctaSolid'>Jade Eventual Quail</h2>
        <h2 className='text-white text-4xl font-pcme'>Jade</h2>
        <h2 className='text-white text-4xl font-urbanist'> JADE 3OO Quail</h2>
        <h2 className='text-white text-4xl font-boulder'>JADE 3OO Quail</h2>
        <h2 className='text-white text-4xl font-monstserrat'> JADE 3OO Quail</h2>
        <h2 className='text-white text-4xl font-lucky'>3OO Quail</h2>
      </section>


    </>




  );
}

export default QuizPage;