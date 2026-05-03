import { motion } from 'framer-motion';
export default function SplashScreen(){return <div className='h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f23] to-[#1a1a3e]'><motion.h1 initial={{scale:.6,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1.5,type:'spring'}} className='text-5xl font-bold text-cyan-300'>POCKETKAIJU</motion.h1></div>}
