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
        console.log("Progress:", progress);

        if (progress.scanCount > 0) {
          setWelcomeMessage("Welcome Back");
        }
      } catch (error) {
        console.error("Error fetching progress", error);
      }
    };

    handleWelcomeMessage();
  }, [deviceId]);




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


      {/* Hero */}
      <section
        ref={heroSectionRef}
        className='h-screen w-screen relative overflow-hidden'>

        {/* background layer */}
        <div className="absolute inset-0 z-0">
          <GridBackground />
          <Spotlight />
        </div>

        {/* Contents on top of the bg  */}

        <div className="relative flex flex-col mt-8 w-full h-full  ">
          <div className="p-2 mr-8">
            <UserProfile />
          </div>
          <div className="relative flex flex-col  justify-center items-center h-[100] w-full">
            <Lottie animationData={welcome} style={{ height: 300, width: 300 }} />
            <TypewriterEffectSmootha
              nickName={nickName}
              message={welcomeMessage}
              onPlayClick={scrolltoBannerSection} />
          </div>
        </div>

      </section>

      {/* Banner section */}
      <section
        ref={bannerSectionRef}
        className='h-screen w-screen flex flex-col justify-between items-center    bg-[#040414] overflow-hidden'>


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
          <h2 className='font-brigada text-sm  mb-2 shadow-3xl'> Welcome back </h2>
          <h2 className='font-brigada text-3xl  mb-6 shadow-3xl'> <span className='text-yellow-500'> the Wait is over</span>
            <br />are you ready?</h2>
          <div className="flex flex-row justify-between w-70 mt-10">
            <p className='font-brigada text-4xl   text-left  text-red-400  '>Summer <br /> 2025 <br />  <span className=' font-Boulder text-lg text-yellow-300'>Octagon hall,</span> <span className='text-white font-Boulder text-lg'>London</span> <br /></p>
            <p className='font-brigada text-2xl  text-right text-blue-400  '>
              24th <br /> Sunday, <br /> <span className='text-white text-lg'>AUG</span> <br />
            </p>            
          </div>
        </div>
        {/* <BannerCarousel /> */}
          <div className='h-100 w-100  justify-center items-center md:w-screen'>
            <div className="text-white text-center relative inset-y-15 font-brigada">Explore the experiences</div>
            
            <CircularGallery 
            bend={1} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            scrollEase={0.15} />
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


    </>




  );
}

export default QuizPage;