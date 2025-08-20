import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, replace } from 'react-router-dom';
import { getUserProgress, scanPoster, submitQuiz } from '../api/posterApi';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { getDeviceId } from '../utils/fingerprint.js';
import { UserProfile } from './UserProfile.jsx';
import { QuizCard } from './QuizCard.jsx';
import { ProductBanner } from './ProductBanner.jsx';
import Badge from './Badge.jsx';
import LeaderBoard from './LeaderBoard.jsx';
import Voucher from './Voucher.jsx';
import { GridBackground } from './other_components/GridBackground';
import { Spotlight } from './other_components/spotlight';
import MainPage from './MainPage.jsx';
import Lottie from 'lottie-react';
import welcome from '../assets/Welcome.json'
import coin_collection from '../assets/coin_collection.json'
import ray from '../assets/ray.json'
import ray_yellow from '../assets/ray_yellow.json'
import gift_box from '../assets/gift_box.json'
import { uniqueDevice } from '../hooks/uniqueDevice.js';
import { TypewriterEffectSmootha } from './other_components/HeroText.jsx';
import CircularGallery from './other_components/CircularGallery.jsx'
import Noise from './other_components/Noise.jsx'
import Playbutton from '../assets/play-button.json';
import { StarIcon } from './const/Icons.jsx';
import trophy from '../../public/assets/img/trophy.png';
import { Counter } from "./other_components/Counter.jsx";
import { AnimatePresence, motion } from "motion/react"
import { ClickToPlayLottie, ClicktoOpenGift, CoinAnimation, LoadingAnimaiton } from './animations/Animation.jsx';
import ScratchClueCard from './other_components/ScratchCard.jsx';
import FloatingFab from './other_components/FAB.jsx';
import { runConfetti } from './other_components/WinConfetti.js';
import { startCelebrationConfetti } from './other_components/Confetti.js';
import AlreadyScannedPage from './AlreadyScanned.jsx';





function QuizPage() {
  const { nickName, deviceId } = uniqueDevice();
  const { posterId } = useParams();
  const navigate = useNavigate();

  const bannerSectionRef = useRef(null);
  const heroSectionRef = useRef(null);
  const gameSectionRef = useRef(null);
  const badgeSectionRef = useRef(null);
  const LeaderBoardSecRef = useRef(null);
  const voucherRef = useRef(null);
  const festivalLineupref = useRef(null);

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
  const [isLoadingGame, setIsLoadingGame] = useState(false);
  const [play, setPlay] = useState(false);
  const [isVoucherCode, setVoucherCode] = useState(null);
  const [voucherUnlocked, setVoucherUnlocked] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [showCheckAnimation, setShowCheckAnimation] = useState(false)
  const [loading, setLoading] = useState(false);
  const [alreadyScanned, setAlreadyScanned] = useState(false);


  const [activePopup, setActivePopup] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [ShowClueBox, setShowClueBox] = useState(false);
  const [showQuizCard, setShowQuizCard] = useState(false);



  const scrolltoBannerSection = () => {

    bannerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  };

  const scrollToHeroSection = () => {
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth' })

  }



  useEffect(() => {
    if (!deviceId) return;

    const init = async () => {
      setLoading(true);
      try {
        const qData = await scanPoster(deviceId, posterId);

        if (qData?.message === "Poster already scanned.") {

          navigate("/alreadyScanned", { state: { posterId }, replace: true })
          return;
        }
        else if (qData.question) {
          setQuestionData(qData);
        }
        else if (qData.message) {
          setError(qData.message);
        }
        else {
          setError("Unexpected error occurred while scanning the poster.");
        }

      } catch (error) {
        setError("Failed to scan poster. Please try again later.");
        console.error("Error scanning poster:", error);
      } finally {
        setLoading(false)
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


  //  Controlling the background scroll
  useEffect(() => {
    if (activePopup !== null || ShowClueBox || showCongrats || alreadyScanned) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activePopup]);



  useEffect(() => {
    const delayAnimation = setTimeout(() => {
      setPlay(true)
    }, 1000)

    return () => clearTimeout(delayAnimation)
  })

  useEffect(() => {
    const preLoadImages = [
      '/assets/img/exit.png',
      '/assets/img/gm-bg-2.jpg',
      '/assets/img/confetti2.png',
      '/assets/img/you_gift2.png',
      '/assets/img/coin.png',
      '/assets/img/button-coin.png',
      '/assets/img/clue.png',
    ];

    preLoadImages.forEach((src) => {
      const img = new Image();
      img.onload = () => {

      };
      img.onerror = () => {
        console.warn(` Failed to load: ${src}`);
      };
      img.src = src;
    });
  }, []);


  // showCongratulation animation
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const panel = {
    hidden: { y: 24, scale: 0.95, opacity: 0 },
    visible: {
      y: 0, scale: 1, opacity: 1,
      transition: { type: "spring", stiffness: 280, damping: 22, delay: 0.05 },
    },
    exit: { y: 12, scale: 0.98, opacity: 0, transition: { duration: 0.18 } },
  };

  // Handle answer submit
  const handleSubmit = async () => {

    if (!selectedAnswer) {
      setFeedback("Please select an answer before submitting.");
      return;
    }

    try {
      const result = await submitQuiz(deviceId, posterId, selectedAnswer);


      if (result.correct) {
        console.log("Result when correct", result)
        setShowCheckAnimation(true);
        setTimeout(() => {
          setShowCheckAnimation(false);
          setShowCongrats(true);
        }, 1500);


        if (!result.voucherCode) {
          console.log("Voucher code unavailble")
          result.voucherCode = "WINCode"
        }
        if (result.voucherUnlocked && result.voucherCode) {
          setVoucherCode(result.voucherCode)
          setVoucherUnlocked(true)

          localStorage.setItem("voucherInfo", JSON.stringify({
            unlocked: true,
            code: result.voucherCode
          }));

        }
      } else {
        setFeedback(result.message || "Wrong answer, Try again!");

      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setFeedback("Failed to submit answer. Please try again later.");
    }
  };

  // Saving vocher status 
  useEffect(() => {
    const storedVoucher = localStorage.getItem("voucherInfo");
    if (storedVoucher) {
      const { unlocked, code } = JSON.parse(storedVoucher);
      setVoucherUnlocked(unlocked);
      setVoucherCode(code);
    }
  }, []);


  // Handling playground loading...
  const handlePlaygroundLoading = () => {
    setIsLoadingGame(true);
    setTimeout(() => {
      setIsLoadingGame(false);
      setActivePopup('playground');
    }, 3500)
  }



  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (

    <>


      {/* Hero Section ----------------------------------------------------------------------------------*/}
      <section
        ref={heroSectionRef}
        className='h-screen w-screen    bg-[#040414] overflow-hidden'>

        <div className='w-screen h-screen absolute' >
          <Noise
            patternSize={500}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
          <div className="absolute inset-0 w-screen h-screen pointer-events-none  overflow-hidden" >
            <Spotlight />
          </div>


        </div>

        <div className="flex flex-col h-screen justify-center items-center my-5">

          <h2 className='font-brigada  text-4xl  text-center 
          inline-block text-transparent bg-clip-text
          
          bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  '>
            Music <br /> Festival</h2>


          <div className="text-white text-center mt-5 shadow-2xl">
            <h2 className='font-brigada text-3xl  mb-1 shadow-3xl'>
              {welcomeMessage} </h2>
            <TypewriterEffectSmootha
              nickName={nickName} />


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
          <div className="w-55 mt-2 cursor-pointer">
            <div onClick={handlePlaygroundLoading}>
              <Lottie animationData={Playbutton} />
            </div>

            {isLoadingGame && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="text-white font-bold flex flex-col items-center justify-center animate-pulse cursor-pointer space-y-1">
                  <DotLottieReact
                    src="https://lottie.host/0987da8e-7dbf-42eb-98e3-2605a9288635/NOKPFE3KRl.lottie"
                    loop
                    autoplay
                  />
                  <div className="text-white text-lg font-outfit">Loading playground...</div>
                </div>
              </div>
            )}
          </div>



          <button
            className="text-white w-full z-9 text-center py-3 font-outfit underline"
            onClick={() => {
              bannerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            More info
          </button>

          <div className="text-white text-sm text-center pt-2 mt-3 mx-15 font-outfit">
            Experience Music Festival 2025 – our best year yet with a huge site transformation,
            over 100 live acts. <span className='text-yellow-500 font-semibold '>Collect 5 badges and obtain the PRE SALE code</span>
          </div>

        </div>



      </section>




      {/* Second music screen ----------------------------------------------------------------*/}
      <section
        ref={bannerSectionRef}
        className='relatve h-screen w-screen flex flex-col justify-center items-center    bg-[#040414] overflow-hidden'>


        <div className='w-screen h-screen absolute pointer-events-none' >

          <Noise
            patternSize={500}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>


        <div className="text-white justify-center text-center mt-2">
          <div className="flex flex-row items-center justify-center mb-3">
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />
            <StarIcon className="w-6" />

          </div>
          {/* <h2 className='font-brigada text-sm  mb-2 shadow-3xl'> Welcome back </h2> */}

          <h2 className='font-brigada text-3xl  mb-3 shadow-3xl'> <span className='text-yellow-500'> the Wait is over</span>
            <br />are you ready?</h2>

          <div className="flex flex-row justify-center w-70 mt-2">
            <p className='font-brigada text-4xl  text-left  text-red-400  '>Summer <br /> 2025 <br />
              <span className="inline-flex gap-1 items-baseline">
                <span className=" font-brigada text-lg text-yellow-300">Octagon Hall,  <span className="text-white font-Boulder text-lg">London</span></span>

              </span>
            </p>
            <p className='font-brigada text-2xl  text-right text-blue-400  '>
              24th <br /> Sunday, <br /> <span className='text-white text-lg'>AUG</span> <br />
            </p>
          </div>
        </div>

        <div className=" font-brigada border  px-3 py-2 rounded-full text-sky-200 underline mt-3"
          onClick={() => {
            festivalLineupref.current?.scrollIntoView({ behavior: 'smooth' });
          }}>
          Festival Line Up
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

      {/* Third music screen ------------------------------------------------*/}
      <section
        ref={festivalLineupref}
        className='relative h-screen w-screen flex flex-col items-center justify-center bg-[#040414] overflow-hidden'
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/vdo/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-blue-900/50 z-10 pointer-events-none mix-blend-overlay"></div>

        <div className='w-screen h-screen absolute z-10 pointer-events-none'>
          <Noise
            patternSize={500}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>

        <div className="z-20 text-white justify-center flex flex-col items-center text-center mt-2">
          <h2 className='font-brigada text-3xl shadow-3xl'>
            <span className='text-yellow-500'>Festival</span><br />lineup
          </h2>

          <div className="flex flex-col justify-between w-full mt-8">
            {["text-red-400", "text-blue-400", "text-yellow-400"].map((color, i) => (
              <p key={i} className={`font-brigada text-xl text-center mx-10 ${color} whitespace-pre-line`}>
                RIHANNA <span className="font-sans mx-2">•</span> TOOL <span className="font-sans mx-2">•</span> \A$AP ROCKY <span className="font-sans mx-2">•</span>THE RACONTEURS <span className="font-sans mx-2">•</span> M.I.A. <span className="font-sans mx-2">•</span> MADEON
                KYGO <span className="font-sans mx-2">•</span> THE NATIONAL <span className="font-sans mx-2">•</span>ROBYN <span className="font-sans mx-2">•</span>• FISHER <span className="font-sans mx-2">•</span> FLUME
              </p>
            ))}
          </div>
        </div>
      </section>






      {/* Game zone ---------------------------------------------------------------------------------------------------------------------------------------------*/}
      {activePopup === 'playground' && (
        <motion.div

          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}

          ref={gameSectionRef}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md"
        >

          <section
            ref={gameSectionRef}
            className="h-[95%] w-[95%] relative overflow-hidden rounded-xl shadow-xl bg-[url(/assets/img/gm-bg-2.jpg)] bg-cover bg-center bg-blend-multiply"
          >


            <button
              onClick={() => setActivePopup(null)}
              className="absolute top-4 right-4 z-50 text-red-400 font-black text-2xl "
            >
              <img src="/assets/img/exit.png" alt="close" className='h-10' />
            </button>

            <div className="absolute inset-0 bg-black/85 z-0" />
            <div className="absolute inset-0 z-0">
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
                        padding={2}
                        gap={3}
                        textColor="white"
                        fontWeight={500} />/ 5

                    </div>

                  </div>

                </div>
                {/* Badges */}
                <div className=" flex justify-end  text-white">


                  <div className="relative flex flex-row  items-center ">

                    <div className="absolute -left-2 z-10  loader border-r-2 rounded-full border-yellow-500 bg-yellow-300
                  aspect-square w-8 flex justify-center items-center text-yellow-700 right-3 " >⭐</div>

                    <div className="flex font-lucky bg-blue-950 border items-center justify-center  py-1 px-6 pl-7 border-blue-700 rounded-full shadow-xl z-0  ">
                      <p className=''> {userPoints}</p>
                    </div>

                  </div>

                </div>
              </div>
              <div className="relative flex flex-col  justify-center items-center h-[100] w-full">

                <Lottie animationData={welcome} style={{ height: 300, width: 300 }} />
                <h2 className='text-white font-lucky mb-3 ' onClick={() => { setShowClueBox(true) }} >Welcome to the playground</h2>

                <TypewriterEffectSmootha
                  nickName={nickName}
                  message={welcomeMessage}
                  onPlayClick={scrolltoBannerSection} />

                <h2 className='text-white text-xl font-vt323 text-center'
                >click the button to being the <br /> <span className=''>badge hunting</span></h2>

                {/* Game button */}
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

                    <div className="fixed  bottom-0 left-0 w-full h-full bg-black/20 backdrop-blur-lg bg-blur-md z-50 flex justify-center items-start pt-10 overflow-y-auto">
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
                            <img src="/assets/img/exit.png" alt="close-button" className='h-16' />
                          </button>
                        </div>



                      </motion.div>


                    </div>
                  )}

                  {showCheckAnimation && (
                    <div className="fixed inset-0 z-[999] flex justify-center items-center bg-black/50 backdrop-blur-sm">

                      <DotLottieReact
                        src="https://lottie.host/99c33767-757a-4f1d-94c8-8bccf2cf1dc5/zoZIM6LmR5.lottie"
                        autoplay

                        className="h-80"
                      />
                    </div>
                  )}

                </AnimatePresence>




              </div>
            </div>
          </section>

        </motion.div>
      )}

      {/* Congratulation pop-up ---------------------------------*/}

      <AnimatePresence>
        {showCongrats && (
          <motion.section
            key="congrats"
            className="fixed  inset-0 z-[999] flex  justify-center items-center bg-black/70 backdrop-blur-lg "
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="relative flex flex-col  h-[60%] w-[90%] mx-3 py-2 px-2 rounded-3xl shadow-2xl drop-shadow-lg border-4
         border-red-100/20"
              variants={panel}
            >
              {/* Background Image + Overlay */}
              <div className="absolute inset-0 bg-[url(/assets/img/gm-bg-2.jpg)] bg-cover rounded-3xl  bg-center opacity-50 z-0 " ></div>
              <div className="absolute inset-0 bg-black bg-opacity-50 mix-blend-multiply rounded-3xl  z-10" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-between text-white text-center  h-full">

                {/*top content  */}
                <div className="flex  flex-col">
                  <div className="absolute inset-0 pointer-events-none flex items-start justify-start z-10 top-1 ">
                    <img src="/assets/img/confetti2.png" alt="confetti" className=' object-cover  ' />
                  </div>
                  <div className="absolute inset-0 pointer-events-none flex items-start justify-start z-10 top-16 ">
                    <img src="/assets/img/confetti2.png" alt="confetti" className=' object-cover  ' />
                  </div>

                  <div className="relative z-20 flex flex-col items-center justify-center">
                    <div className="relative  w-full h-[200px]  ">
                      <img
                        src="/assets/img/you_gift2.png"
                        alt="You_win"
                        className="absolute  w-[250%] h-[350px] object-contain bg-opacity-0 -top-40"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className=" -mt-20">
                    <p className="uppercase font-outfit mt-5 drop-shadow-lg text-sky-100 font-bold ">Challenge Completed</p>

                    {/* Coin */}
                    <div className="relative flex flex-col items-center justify-center ">
                      <div className="flex items-center justify-center z-0 my-3">
                        <img src="/assets/img/button-coin.png" alt="coin-background" className='absolute z-1 h-12 ' />
                        <div className="flex flex-row justify-center items-center z-10">
                          <div className="absolute z-0 inset-0 pointer-events-none h-[300px] w-[300px]">
                            {play && (
                              <Lottie
                                animationData={coin_collection}
                                loop={false}
                                speed={1}
                              />
                            )}
                          </div>
                          <img src="/assets/img/coin.png" alt="coins" className='h-10' />
                          <p className="text-xl py-3 font-mike text-white drop-shadow-md">
                            +1000
                          </p>
                        </div>
                      </div>
                      <p className='px-3 mt- font-outfit text-sky-200'>You've earned points by completing the Challenge</p>
                    </div>
                  </div>
                </div>

                {/* bottom content */}
                <div className="flex flex-col mt-0 justify-center items-center  h-full w-full">
                  <p className='pt-18 -mt-10 font-lucky text-white '>Click and Collect your badge</p>

                  <div className=" -mt-50 md:-mt-44 items-center justify-center ml-6 shadow-2xl ">
                    <ClicktoOpenGift className="shadow-xl" onOpen={() => setShowBadge(true)} />
                  </div>
                </div>

                {/* Badge----------------------- */}
                {showBadge && (
                  <motion.div
                    initial={{ y: 200, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    className="absolute top-9 z-150"
                  >
                    <div className="z-102">
                      <img
                        src={`/assets/img/badges/Badge_${posterId?.replace(/[^\d]/g, '') || 1}.png`}
                        alt="badge"
                        className="h-80"
                        onClick={() => { setShowClueBox(true) }}
                        onError={(e) => { e.currentTarget.src = "/assets/img/badges/Badge_1.png"; }}
                      />

                    </div>
                  </motion.div>
                )}

                {/* Yellow ray */}
                {showBadge && (
                  <motion.div
                    initial={{ y: 200, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay: 1.1 }}
                    className="absolute z-90 top-3 "
                  >
                    <Lottie animationData={ray_yellow} className='h-96' />
                  </motion.div>
                )}

                {showBadge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay: 1.1 }}
                    className="absolute z-105 bottom-8 drop-shadow-2xl  "
                  >
                    <div
                      className="relative flex flex-col gap-3 items-center justify-center mt-"
                      onClick={() => {
                        setShowBadge(false),
                          setShowCongrats(false),
                          setShowQuizCard(false),
                          setTimeout(() => {
                            setIsLoadingGame(false);
                            setActivePopup('playground')
                          }, 1800);
                        setTimeout(() => { setShowClueBox(true) }, 500)
                      }}
                    >
                      <p className="absolute z-10 text-xl font-mike text-white drop-shadow-md">Collect</p>
                      <img src="/assets/img/button-coin.png" alt="coin-background" className="relative z-0 h-12" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>







      {/* Clue popup ------------------------------------------- */}
      {
        ShowClueBox && (
          <section className=' fixed inset-0 z-[999] h-screen w-screen flex justify-center items-center backdrop-blur-sm'>
            <div className=" w-full">
              {showClue && (
                <>
                  <motion.div
                    initial={{ y: 200, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}

                    className="text-white h-full flex flex-col justify-center items-center">
                    <ScratchClueCard
                      clueText={questionData.clue}
                      className="drop-shadow-xl"
                      closeClueBox={setShowClueBox}
                      closeClueCard={setShowClue}
                      onRevealComplete={() => {
                        setActivePopup('badges');
                        setTimeout(() => {
                          if (voucherUnlocked) {
                            setActivePopup('voucher');
                            startCelebrationConfetti()

                          }
                        }, 2000)
                      }}
                    />
                  </motion.div>

                </>

              )
              }

              <motion.div
                initial={{ y: 180, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full items-center justify-center flex animate-[short-bounce_1s_infinite]">
                <img src="/assets/img/clue.png" alt="clue-box" className='h-56 z-11 '
                  onClick={() => { setShowClue(true) }}
                />
                <Lottie animationData={ray_yellow} className='absolute z-10 h-96' />
              </motion.div>



              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1, ease: "easeOut" }}

                className="items-center  mx-5 text-white z-1999 font-bold drop-shadow-md  font-outfit text-lg text-center">
                {showClue ? <p><span className='font-lucky text-yellow-200 tracking-wider text-3xl'>Boom!</span>
                  <br /> That clue might be your ticket to victory.</p> : "Click to open"}

              </motion.div>


            </div>
          </section>
        )
      }

      {/* ENd of Playground------------------------------------------------------------------------------------------------------------------ */}





      {/* Other section -------------------------------------------------------  */}



      {/* Bg pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20" />
      </div>



      {/* Badge popup section------------- */}
      <AnimatePresence>
        {activePopup === 'badges' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}

            className='fixed inset-0  h-screen w-screen  z-20 flex justify-center items-center backdrop-blur-xl' >
            <div ref={badgeSectionRef}>
              <Badge deviceId={deviceId} leaderboardRef={LeaderBoardSecRef} setActivePopup={setActivePopup} onLoading={<LoadingAnimaiton />} />
            </div>
          </motion.div>
        )
        }



        {/* Leaderboard popup--------------- */}

        {activePopup === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='fixed inset-0  h-screen w-screen  z-20 flex justify-center items-center backdrop-blur-xl '>
            <div ref={LeaderBoardSecRef} >
              <LeaderBoard setActivePopup={setActivePopup} points={userPoints} onLoading={<LoadingAnimaiton />} />
            </div>
          </motion.div>
        )}




        {/* Voucher popup------------------ */}
        {activePopup === 'voucher' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0  h-screen w-screen z-20 flex justify-center items-center backdrop-blur-xl">

            <div ref={voucherRef} className="w-full h-full flex justify-center items-center  px-4">
              <Voucher value={isVoucherCode} voucherUnlocked={voucherUnlocked} setActivePopup={setActivePopup} />
            </div>

          </motion.div>
        )}


        {/* Loading animation */}
        {loading && (
          <div className="absolute inset-0 h-screen w-full z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <LoadingAnimaiton />
          </div>
        )}



      </AnimatePresence>







      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2 z-[1000]">
        <FloatingFab
          setActivePopup={setActivePopup}
          scrollToHeroSection={scrollToHeroSection}
          openPlayGround={handlePlaygroundLoading} />
      </div>
    </>




  );
}

export default QuizPage;