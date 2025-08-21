import React, { useRef, useEffect, useState } from 'react';

export default function ScratchClueCard({ clueText, closeClueBox, closeClueCard, onRevealComplete }) {
    const canvasRef = useRef(null);
    const [scratched, setScratched] = useState(false);


    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        const handleMouseDown = () => {
            canvas.isDrawing = true;
        };

        const handleMouseUp = () => {
            canvas.isDrawing = false;
            checkScratchProgress();
        };

        const handleMouseMove = (e) => {
            if (!canvas.isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI);
            ctx.fill();
        };

        const handleTouchStart = () => {
            canvas.isDrawing = true;
        };

        const handleTouchEnd = () => {
            canvas.isDrawing = false;
            checkScratchProgress();
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            if (!canvas.isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI);
            ctx.fill();
        };

        const checkScratchProgress = () => {
            const imageData = ctx.getImageData(0, 0, width, height);
            let scratchedPixels = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i + 3] < 128) scratchedPixels++;
            }
            const scratchedPercent = scratchedPixels / (width * height) * 100;
            if (scratchedPercent > 30)
                setScratched(true);
                closeClueBox(false);
                closeClueCard(false);
                
                if (onRevealComplete) onRevealComplete()
            

            if (scratched) {


            }
        };

        if (!scratched) {
            const image = new Image();
            image.src = '/assets/img/gift_cover.jpg';
            image.onload = () => {
                ctx.drawImage(image, 0, 0, width, height);
            };
        } else {
            ctx.clearRect(0, 0, width, height);
        }

        // handling scratching mouse and touchscreen
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchend', handleTouchEnd);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);

            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, [scratched]);

    return (
        <div className="flex flex-col items-center space-y-4">
            <p className="text-white tracking-wider  text-xl font-bold font-lucky uppercase">Scratch to reveal the clue</p>
            <div className="relative w-[300px] h-[100px] rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-sky-200 flex items-center justify-center text-black text-lg font-bold z-0 p-4 font-vt323">
                    {clueText}
                </div>
                {!scratched && (
                    <canvas
                        ref={canvasRef}
                        width={300}
                        height={200}
                        className="absolute top-0 left-0 z-10 touch-none"
                    />
                )}
            </div>
        </div>
    );
}
