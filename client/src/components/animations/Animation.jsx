import Lottie from "lottie-react";
import { useRef, useState } from "react";
import chest_opening from '../../assets/chest_opening.json'
import gift_opening from '../../assets/gift_box.json'
import gift_opening_2 from '../../assets/gift_box2.json'
import coin_collection from '../../assets/coin_collection.json'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'




export  function ClickToPlayLottie() {

  const lottieRef = useRef();

  return (
    <div
      className="cursor-pointer"
      onClick={() => lottieRef.current?.play()}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={chest_opening}
        loop={false}
        autoplay={false}
        className="h-[350px] w-[350px]"
      />
    </div>
  );
}


export  function ClicktoOpenGift({onOpen}) {
    const giftRef = useRef();
    const [isBouncing, setIsBouncing] = useState(true);

    const handleClick = () => {
    setIsBouncing(false); 
    giftRef.current?.play(); 
    onOpen()
  };

    return(
        <div className="cursor-pointer"
            onClick={handleClick}>
            <Lottie 
                animationData={gift_opening_2}
                lottieRef ={giftRef}
                loop={false}
                autoplay={false}
                className={`h-[550px] w-[550px] ${isBouncing ? 'animate-[short-bounce_1s_infinite]' : ''}`}

                />
        </div>
    )
}

export function CoinAnimation () {
    return(
        <Lottie 
            animationData={coin_collection}
            loop={false}
            autoplay
            />
    )
}

export function LoadingAnimaiton () {
  return(
    <DotLottieReact
      src="https://lottie.host/f034d88d-f949-40a1-952d-5faf748922cb/LJWo70sQG4.lottie"
      loop
      autoplay
    />
    
  )
}
