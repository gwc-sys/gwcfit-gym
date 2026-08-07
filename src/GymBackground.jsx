import React, { useEffect, useRef } from 'react';

export default function GymBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const hero = mount.closest('.hero');
    let frame;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const onMove = event => {
      targetX = (event.clientX / window.innerWidth - 0.5) * -14;
      targetY = (event.clientY / window.innerHeight - 0.5) * -8;
    };
    const animate = () => {
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;
      mount.style.setProperty('--gym-x', `${currentX}px`);
      mount.style.setProperty('--gym-y', `${currentY}px`);
      const nx = currentX / -7;
      const ny = currentY / -4;
      hero?.style.setProperty('--move-x', `${(nx * 14).toFixed(2)}px`);
      hero?.style.setProperty('--move-y', `${(ny * 9).toFixed(2)}px`);
      hero?.style.setProperty('--move-x-mid', `${(nx * 8).toFixed(2)}px`);
      hero?.style.setProperty('--move-y-mid', `${(ny * 5).toFixed(2)}px`);
      hero?.style.setProperty('--move-x-small', `${(nx * 4).toFixed(2)}px`);
      hero?.style.setProperty('--move-y-small', `${(ny * 3).toFixed(2)}px`);
      hero?.style.setProperty('--rotate-x', `${(ny * -2.2).toFixed(2)}deg`);
      hero?.style.setProperty('--rotate-y', `${(nx * 2.8).toFixed(2)}deg`);
      if (hero) {
        const setTransform = (selector, transform) => {
          const element = hero.querySelector(selector);
          if (element) element.style.transform = transform;
        };
        setTransform('.mini-proof', `translate3d(${nx * 18}px, ${ny * 12}px, 70px) rotateY(${nx * 4}deg)`);
        setTransform('.hero-copy h1', `translate3d(${nx * 30}px, ${ny * 18}px, 110px) rotateX(${ny * -5}deg) rotateY(${nx * 6}deg)`);
        setTransform('.hero-copy h1 span', `translate3d(${nx * 16}px, ${ny * 10}px, 55px) rotateX(${ny * -3}deg) rotateY(${nx * 3}deg)`);
        setTransform('.hero-copy > p', `translate3d(${nx * 20}px, ${ny * 12}px, 68px) rotateX(${ny * -2}deg) rotateY(${nx * 2.5}deg)`);
        setTransform('.hero-actions', `translate3d(${nx * 14}px, ${ny * 9}px, 48px)`);
        setTransform('.hero-fine', `translate3d(${nx * 9}px, ${ny * 6}px, 30px)`);
        setTransform('.orbit-note', `translate3d(${nx * -28}px, ${ny * -20}px, 120px) rotate(${5 - nx * 4}deg) rotateY(${nx * -7}deg)`);
        setTransform('.hero-orbit-row', `translate3d(${38 - nx * 18}px, ${ny * -12}px, 82px)`);
        setTransform('.pulse-orbit', `translate3d(${nx * -12}px, ${ny * -16}px, 65px) rotateY(${nx * -10}deg)`);
        setTransform('.free-orbit', `translate3d(${nx * -22}px, ${ny * -18}px, 95px) rotate(${7 - nx * 5}deg) rotateY(${nx * -9}deg)`);
      }
      frame = requestAnimationFrame(animate);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      ['--move-x','--move-y','--move-x-mid','--move-y-mid','--move-x-small','--move-y-small','--rotate-x','--rotate-y'].forEach(property => hero?.style.removeProperty(property));
      hero?.querySelectorAll('.mini-proof,.hero-copy h1,.hero-copy h1 span,.hero-copy > p,.hero-actions,.hero-fine,.orbit-note,.hero-orbit-row,.pulse-orbit,.free-orbit').forEach(element => element.style.removeProperty('transform'));
    };
  }, []);

  return <div className="gym-background" ref={mountRef} aria-hidden="true"><div className="gym-background-image"/><div className="gym-background-light"/></div>;
}
