import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProgress, scanPoster, submitQuiz } from '../api/posterApi';
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
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
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
import AnimatedCounter from './other_components/AnimatedCounter.jsx';
import { AnimatePresence, motion } from "motion/react"
import { ClickToPlayLottie, ClicktoOpenGift, CoinAnimation } from './animations/Animation.jsx';
import ScratchClueCard from './other_components/ScratchCard.jsx';
import FloatingFab from './other_components/FAB.jsx';





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
  const [showCongrats, setShowCongrats] = useState(false);
  const [isLoadingGame, setIsLoadingGame] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [ShowClueBox, setShowClueBox] = useState(false);
  const [isPlayGround, setIsPlayGround] = useState(false);
  const [play, setPlay] = useState(false);
  const [isVoucherCode, setVoucherCode] = useState("Complete your badge hunt...");
  const [voucherUnlocked, setVoucherUnlocked] = useState(false);






  const scrolltoBannerSection = () => {

    bannerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  };

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
          console.log("Q data", qData)

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


  //  Controlling the background scroll
  useEffect(() => {
    if (showQuizCard || showCongrats || isPlayGround) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showQuizCard, showCongrats, isPlayGround])


  useEffect(() => {
    const delayAnimation = setTimeout(() => {
      setPlay(true)
    }, 1000)

    return () => clearTimeout(delayAnimation)
  })



  // Handle answer submit

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      setFeedback("Please select an answer before submitting.");
      return;
    }

    try {
      const result = await submitQuiz(deviceId, posterId, selectedAnswer);

      if (result.correct) {
        setShowCongrats(true);

        if (result.voucherUnlocked) {
          setVoucherCode(result.voucherCode)
          setVoucherUnlocked(true)
        }



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

          <div className="w-55 mt-2 cursor-pointer">
            <Lottie
              animationData={Playbutton}
              onClick={() => {
                setIsLoadingGame(true);
                setTimeout(() => {
                  setIsLoadingGame(false);
                  setIsPlayGround(true); // Show playground
                }, 1800);
              }}
            />

            {isLoadingGame && (
              <div className="text-white font-bold text-lg mt-4 animate-pulse cursor-pointer">
                Loading Playground...
              </div>
            )}

          </div>

          <button
            className="text-white w-full z-21 text-center py-3 font-outfit underline"
            onClick={() => {
              bannerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              console.log(bannerSectionRef.current);
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




      {/* Second music screen ------------------------------------------------*/}
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


        <div className="text-white justify-start text-center mt-2">
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

          <div className="flex flex-row justify-between w-70 mt-2">
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

        <div className=" font-brigada border  px-3 py-2 rounded-full text-sky-200 underline mt-3">
          Festival Line Up
        </div>
        <div className=" font-brigada  text-yellow-200 underline mt-3">
          Home
        </div>
        {/* <div className="w-55 mt-3 cursor-pointer"
          onClick={() => {
            setIsLoadingGame(true);
            setTimeout(() => {
              setIsLoadingGame(false);
              gameSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 2500);
          }}>
          <Lottie animationData={Playbutton} />
        </div>

        {isLoadingGame && (
          <div className="text-white font-bold text-lg mt-4 animate-pulse">
            Loading Playground...
          </div>
        )} */}

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





      {/* Game zone ---------------------------------------------------------------------------------------------------------------------------------------------*/}
      {isPlayGround && (
        <motion.div

          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}

          ref={gameSectionRef}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md"
        >
          c
          <section
            ref={gameSectionRef}
            className="h-[95%] w-[95%] relative overflow-hidden rounded-xl shadow-xl bg-[url(/assets/img/gm-bg-2.jpg)] bg-cover bg-center bg-blend-multiply"
          >


            <button
              onClick={() => setIsPlayGround(false)}
              className="absolute top-4 right-4 z-50 text-red-400 font-black text-2xl "
            >
              <img src="/assets/img/exit.png" alt="" className='h-10' />
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
                        padding={1}
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
                </AnimatePresence>




              </div>
            </div>
          </section>

        </motion.div>
      )}


      {/* Congratulation pop-up ---------------------------------*/}
      {/* {showCongrats && ( */}
      <section className="hidden fixed inset-0 z-[999] flex  justify-center items-center bg-black/70 backdrop-blur-lg ">

        <div className="relative flex flex-col  h-[60%] w-[90%] mx-3 py-2 px-2 rounded-3xl shadow-2xl drop-shadow-lg border-4
         border-red-100/20">
          {/* Background Image + Overlay */}
          <div className="absolute inset-0 bg-[url(/assets/img/gm-bg-2.jpg)] bg-cover rounded-3xl  bg-center opacity-50 z-0 " >
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 mix-blend-multiply rounded-3xl  z-10" />

          <div className=""><img src="/assets/img/badges/badge_1.png" alt="badge" /></div>


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

                <div className="relative  w-full h-[200px] ">
                  <img
                    src="/assets/img/you_gift.png"
                    alt="You_win"
                    className="absolute  w-[250%] h-[350px] object-contain -top-40"
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
                            speed={0.5}
                          />
                        )}
                      </div>
                      <img src="/assets/img/coin.png" alt="coins" className='h-10' />
                      <p className="text-xl py-3 font-mike text-white drop-shadow-md">
                        +1000

                        {/* <span className='text-white -ml-2 text-xl'>Points</span> */}
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

                className="absolute top-9 z-150">

                <div className="z-102"><img
                  src={`/assets/img/badges/Badge_${posterId?.replace(/[^\d]/g, '') || 1}.png`}
                  alt="badge"
                  className='h-80'
                  onClick={() => { setShowClueBox(true) }} /></div>
              </motion.div>
            )}

            {/* Yellow ray */}
            {showBadge && (
              <motion.div
                initial={{ y: 200, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 2.2, ease: "easeOut", delay: 1.1 }}

                className="absolute z-90 top-3 "><Lottie animationData={ray_yellow} className='h-96' />
              </motion.div>
            )}

            {showBadge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.2, ease: "easeOut", delay: 1.1 }}
                className="absolute z-105 bottom-8 drop-shadow-2xl  "
              >
                <div className="relative flex flex-col gap-3 items-center justify-center mt-">

                  <p className="absolute z-10 text-xl font-mike text-white drop-shadow-md">Collect</p>


                  <img
                    src="/assets/img/button-coin.png"
                    alt="coin-background"
                    className="relative z-0 h-12"
                    onClick={() => { setShowBadge(false), showClue(true) }}
                  />

                </div>

              </motion.div>

            )

            }

            {/* Button */}
            {/* <button
                onClick={() => {
                  setShowCongrats(false);
                  setShowQuizCard(false);
                  badgeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 px-6 py-3 bg-black text-yellow-300 rounded-full 
               hover:scale-105 active:scale-95 transition-all 
               border-2 border-yellow-300 font-bold shadow-xl "
              >
                Collect Badge
              </button> */}



          </div>
          {/* {showClue && (
            <ScratchClueCard  clueText="Look near the glowing lantern!"/>
          )} */}

          {/* <div className="absolute border flex w-full h-full items-center justify-center z-999 ">
           <ScratchClueCard  clueText="Look near the glowing lantern!" className="drop-shadow-xl"/>
         </div> */}



        </div>


      </section>
      {/* )} */}


      {/* <section className='min-h-screen'>

        <Lottie animationData={coin_collection} />


      </section> */}

      {/* Clue popup ------------------------------------------- */}
      {ShowClueBox && (
        <section className=' fixed inset-0 z-[999] h-screen w-screen flex justify-center items-center backdrop-blur-sm'>
          <div className=" w-full">
            {showClue && (
              <motion.div
                initial={{ y: 200, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}

                className="text-white h-full flex flex-col justify-center items-center">
                <ScratchClueCard
                  clueText={questionData.clue}
                  className="drop-shadow-xl "
                  onReval={() => {
                    badgeSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }} />
              </motion.div>
            )
            }

            <motion.div
              initial={{ y: 180, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full items-center justify-center flex animate-[short-bounce_1s_infinite]">
              <img src="/assets/img/clue.png" alt="clue-box" className='h-56 z-11 '
                onClick={() => { setShowClue(true), setShowClueBox(false) }}
              />
              <Lottie animationData={ray_yellow} className='absolute z-10 h-96' />
            </motion.div>


            <motion.div
              initial={{ y: 200, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 1.1 }}

              className="absolute z-90 top-0 ">
            </motion.div>
          </div>
        </section>
      )}






      {/* <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-900 text-white"> */}
      <div className="min-h-screen bg-black text-white">
        {/* bg pattern */}

        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-10 max-w-6xl">

          <div ref={badgeSectionRef}>
            <Badge deviceId={deviceId} leaderboardRef={LeaderBoardSecRef} />
          </div>

          <section className='min-h-screen '>
            <div ref={LeaderBoardSecRef}>
              <LeaderBoard />
            </div>
          </section>

          {voucherUnlocked && (
            <section className="fixed inset-0 z-[999] h-screen w-screen flex justify-center items-center backdrop-blur-sm">
              <div ref={voucherRef} className="w-full h-full flex justify-center items-center  px-4">
                <Voucher value={isVoucherCode} voucherUnlocked={voucherUnlocked} />
              </div>
            </section>
          )}



        </div>


      </div>



      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2 z-[1000]">
        <FloatingFab />
      </div>
    </>




  );
}

export default QuizPage;