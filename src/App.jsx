import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw, Crown, Star, Zap, Trophy, Medal, Users, X } from 'lucide-react';

const ROSTER_DATA = {
  KINGS: [
    { name: "Fish", role: "Mid Lane", img: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/646366488_937515238621545_2308485296421673837_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeE48mWvjMAHPUvWnkjRxOVLj5XHmxC5BP2PlcebELkE_Z--zFezeg8973oZABVzpb_p_Gq-MDjUkYUxLvIXjrPr&_nc_ohc=vyu6RS5Zk_sQ7kNvwHj0vjI&_nc_oc=AdrEHKGLvvlmZ-XUWrmpnQnYp0ERHA3xkO2jGNpilnaQqcIlkOrLgiEGuyXmTL1kn0o&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=2CzNc-DGvhNyDzyXwSfY2Q&_nc_ss=7b2a8&oh=00_Af6DJDgay2sLe0NTKFq28pN0CZTxNHOKlK9FJvFahqRG_g&oe=6A060709" },
    { name: "Khoa", role: "Support", img: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/649173433_962583216145432_3268194331108138012_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHer7oQCMb1kzVIgYRXZ64LT_Qaag-F1QZP9BpqD4XVBts5LwczmbMK0JnkSxUUVuYfS_hKYgb5f1qJ2BnykW9F&_nc_ohc=zKcurOb1EL8Q7kNvwGdSBcv&_nc_oc=AdqDYg3hsK-yrIGhXKvPOvFaw-QNUExHCPVDIF0BYwVFDM1TDvUAMW0eca16SXVXiEg&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=axwGfRrUd7OL_RHzOcGqoQ&_nc_ss=7b2a8&oh=00_Af7N7KUuQin68nK4k9FK6ICF2qsZVRfknJ2_I8nJhqG9Aw&oe=6A062229" },
    { name: "Nolan", role: "DSL", img: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/646869184_2668199870213237_2902418190072441410_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFfrgtQf2-tUIeJh5o3j_KulYKmTfa77O6VgqZN9rvs7mPoiwgxvgBcfezqO3rPCdElXdSKPY9_4Q5iVyj2RjPl&_nc_ohc=DDtUStznEaQQ7kNvwHtoMQL&_nc_oc=AdrqGTcV_HCYkzTVtiW7_UXVtXWNIxeNHumhLPHML-wart4QOy4SvN0juAmJ46aW7PY&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=-0pXnLzd3W84zxk4Cz3zuQ&_nc_ss=7b2a8&oh=00_Af4Pcsv32ppOIN1ZUSkh0GpwON2YrX2t2X5XEFvZnIOvuQ&oe=6A060A52" },
    { name: "Shin", role: "ADL", img: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/646825646_122149762928967766_1684229996392282379_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGcXvw0Dunc0BA2khYCbLSvd3kzMhjAOd13eTMyGMA53YfmlMhHBmXXEWNG7JnD7CxsSsqonu8JHXOKCBNT5HCX&_nc_ohc=JLHt5Rbi8L4Q7kNvwG8rIvo&_nc_oc=Ado7HNOL5LBrw4d5hZYYmjwMPWonV98kx-FPfjkQB9Kke1iEXUotM9ErhrhFjId6tZ4&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=-r_8fy9Jt4dSTLEFg5Ol4A&_nc_ss=7b2a8&oh=00_Af6QNpiPcfYALAoZqsG2qrxEIiVY7DuXZOLysUEc3usgtA&oe=6A05FA02" },
    { name: "Yuu", role: "Jungle", img: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/646847862_2668193700213854_3572783395170463621_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFTFvBlIxeUnttv55n4tit0WxC17V08XFhbELXtXTxcWLcc3hP4YViSKMG4syhHpSj1Dj79OULVhUJh9ccHOqe6&_nc_ohc=t-myUV4oZu0Q7kNvwER-bEa&_nc_oc=AdozP3eKwMFXjmTUhLTcSYzkv0Q3ROcvmy-_gUzQWWDqKVhYfzRU1S6OEhjs9fGuwqs&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=g1TqesgWIXQ2ERIRyruudw&_nc_ss=7b2a8&oh=00_Af52QCuVh3r1vV81i9vD53tvZp203iKZ-UNuw6NKFkGUCg&oe=6A06066C" },
    { name: "TSS", role: "Jungle", img: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/646818764_2668186073547950_8216673376232937537_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGJF1aatgKI1yIvnnGddyPpX6qw0eV4hmtfqrDR5XiGazfntGawD4so1ifO19wGbb4XxBuybU-3eami8sJboHQn&_nc_ohc=xId-iNc1z4kQ7kNvwGdnMcB&_nc_oc=AdpSMsW3Obo6k4qyNAHDDptIAq74T6mwmv01RFTf761oO_x3Cugco_pYhwn0BA9HIMU&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=y7J3uWKf-s6cmBCCtDZRgw&_nc_ss=7b2a8&oh=00_Af4aZS0bzFwAZLxMcr92iuNQkRE233KaW93k0k15ZFTq8A&oe=6A05F926" },
    { name: "Turtle", role: "Coach", img: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/643466869_1557001673100763_787033938776028634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeFmq3SzzHb_MWaN16vt3hob9c6h2YCGhYL1zqHZgIaFggcfdAxgedBRCxxnfsntJbqio8jyAt8ACPCNKMPO0rex&_nc_ohc=wPOoiLPg2DYQ7kNvwFVZUPN&_nc_oc=AdpYrb4Yr1XdO8tO67aQRxiQCvSEpOOm0V3aYHF8VG3VGiyTMdaNTzzmZCR8ij-f8fg&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=zbrcykYDIH0cQZ_d90d6EQ&_nc_ss=7b2a8&oh=00_Af63jGuhErY9h23nti2t5L4xJ2E_O4wCuViN0pwFas_isg&oe=6A06170E" },
    { name: "LaiBang", role: "GOAT", img: "https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/675444894_1510231940544184_8101433922699886061_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGyeSQjDYMLCjh-FULx3DOAdwe-Gg9YhTN3B74aD1iFM6rQIbNjEYs_uG1sLehTuJSHqLyQbDiuwMM3-se7Bnub&_nc_ohc=OaIymdJ0c2kQ7kNvwEFO4om&_nc_oc=AdpL2VazGSO4pJBci3BzlRrSf3zca3Te4cnzkIPe_cBjPFvbMQUBp43qk6WXbu_roiY&_nc_zt=23&_nc_ht=scontent.fsgn5-2.fna&_nc_gid=eHYcybpGB7uJUJaN4mEjgw&_nc_ss=7b2a8&oh=00_Af4nEJbP22m6QKG-bJU4ODMz0KnXieIvgtyOXYRxxDITNg&oe=6A0619C1" },
  ],
  LADIES: [
    { name: "Shizuka", role: "Mid Lane", img: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/672682847_1598857305581866_3232922641073857418_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFNO6bWd4jp3WyiU5yWFGaVWtfmBXORwd1a1-YFc5HB3UDKFeWeZw3BTWNV4V7MjohYq5f42VV5n3XlBus7WSM0&_nc_ohc=l_rX_RfdxhwQ7kNvwFS8fT_&_nc_oc=AdoUyvrtLHpB4hhDjXWr8ZTTMrWg5x6F9-JMtAsbU0natVRUhRcUNF_noQNnizFU5Ew&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=1QlSjJQocDxK2NCBmgLt9w&_nc_ss=7b2a8&oh=00_Af6mZ7feLqkKzR6PLZ4rLwsfcBoJMAi-IvQl36I1xdGMDg&oe=6A060E2A" },
    { name: "LacHQ", role: "ADL", img: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/673387175_1599512528849677_3632250535057498208_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHQ7BobFmRSgYCPFOH4KO69D12eeozOtYAPXZ56jM61gEXpg9N0wpBMpcJcNUWWtYO1VkChXODe3pAnHDorB634&_nc_ohc=dSvWCfn4QYwQ7kNvwGFfGKK&_nc_oc=Ado7A-VHwEAuzWyyQW9nujfFTjonMlPtU4WCkZH33jvdDl1HpOs5xQ4tVc7zXQYweu8&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=4mvEFg3THDD-A7G0pM8vlQ&_nc_ss=7b2a8&oh=00_Af4Mm9CYeOqlvuiv0eZHdEdJf5nzNezTIcfqcqljmkK1Ww&oe=6A062AA3" },
    { name: "My", role: "DSL", img: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/676880870_1601683418632588_1374541288391051911_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHXr0KmnQSy3C3wpELKStSYSxf7OjFR45tLF_s6MVHjm1U6O7nUXnANrF4-KtBJtQG0xL3WU-tjEmohRsDzumzw&_nc_ohc=90dNrTCBMMAQ7kNvwEKo8V4&_nc_oc=AdoVguLUJati0737map2ZYAV99fUC8kse47vUDeJ19kf5_3-1MDEBBveiRjJjUqu5_I&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=CPBh8iNr69w8rOMtnRBlew&_nc_ss=7b2a8&oh=00_Af6WT70pNkOTy9m7GZflBMBNyEIHNx2c1whivZdC_KMvig&oe=6A05FE96" },
    { name: "NganButter", role: "Jungle", img: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/675506295_1601708938630036_7559998645956046242_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeG9ZD6IB2qbxmovWq5WMn5wDpnMPiUtISIOmcw-JS0hIsFg4xHX9xUExnFio3wwLHZQAF9G5tISV7boIFd96s0L&_nc_ohc=5ZFcOLrwopEQ7kNvwEzqSOD&_nc_oc=AdoVGu6IcgJ3ZNF3yQWTY3JDbrpJ0qBKr9NC_31txp1sXBE6NzhmsjqzrS_5dIhPKjI&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=gbYiQZPnJ8vBAyopyI0B8Q&_nc_ss=7b2a8&oh=00_Af6o0vxlH7e2FEVHhlvta0YtBHQwJlNTtq8uTKkio2nXfg&oe=6A06169B" },
    { name: "Sen", role: "Support", img: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/672958856_1601633438637586_3101493262998787596_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFqrwUwiUtz5qfCO56k4qIMXNN_OQ_58X5c0385D_nxfh7N_kdtL89UrI42etEvqv1_UkqOaj2iVeLomZpVgc8J&_nc_ohc=Guh0DEu_WWwQ7kNvwH2Q7fJ&_nc_oc=Adq5fFjf90-YPGAUMPPJfzsomFyc7516eJY2r9BzjtpGsSWwP2_PmDqarRoaI0HhRIc&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=K41jVFyMCtZb25jopCdHmQ&_nc_ss=7b2a8&oh=00_Af7a8fsbjCIrkheusuEDj84ueHcBRDAQPskteKTvcXEhNA&oe=6A0629FF" },
    { name: "HHuong", role: "DSL", img: "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/660124860_1601641778636752_5454491385301711830_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHhjyQAGKVc109FF8xU3DMxBa2KjVG52e0FrYqNUbnZ7RZPR6bbN9U08avo9IpFC15U7HUGVhZPAIBiXg-i-AxB&_nc_ohc=tLe5KHs6so0Q7kNvwHDdUqI&_nc_oc=Ado84x4w0IrwmTOW3do_Lhdci4LjOp7rkfkq-pds1NMpsdVF59SqfdEimumbcX4pZ0I&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=xXsXH7maAl01GXU7UC-vbQ&_nc_ss=7b2a8&oh=00_Af5RjNNrLWANf5xXNmnunJQl6Nen7xTPodbJ8BrAqb3TQQ&oe=6A062861" },
    { name: "Polo", role: "Coach", img: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/650340284_1564348825699381_9070428555422769403_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeHbeBVGkUvmxZbyICctFSu9mSBM2FkOeR-ZIEzYWQ55H3R9jBLfLzGWH5ex8F85PhrxcR1XueUEVUe_Dom0S6rI&_nc_ohc=yIRPoUy9yGYQ7kNvwFZCOJ_&_nc_oc=AdplG43Utl9aQEUlhCC4ZLsA9UNyCRhvGIdIbw2W_aRjKpYgknSTKjxg1OeYcpNZ1iA&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=Reyle48eRg959h5RhaZvpA&_nc_ss=7b2a8&oh=00_Af7nhN1klVve15kkwy9QrGX_sMGIsTZlk0ewX4d6Rof5Pw&oe=6A061B62" },
  ]
};

const Spotlight = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1000] transition-opacity duration-700"
      style={{
        background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.07), transparent 80%)`
      }}
    />
  );
};




const AchievementClean = ({ count, label, delay, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 1 }}
    className="flex flex-col items-center gap-1 group px-6 md:px-10"
  >
    <div className="flex items-center gap-2">
      <span className="text-5xl md:text-6xl font-heading gold-gradient tracking-tighter drop-shadow-sm">
        {count}
      </span>
      {Icon && <Icon size={14} className="text-gold/40 mb-3" />}
    </div>
    <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold">
      {label}
    </span>
  </motion.div>
);

const DeveloperBadge = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.5 }}
    className="fixed bottom-8 right-8 z-[600] flex items-center gap-4 group bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
  >
    <div className="flex flex-col items-end">
      <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 group-hover:text-gold/70 transition-colors font-bold leading-none mb-1">
        Developed by
      </span>
      <span className="text-sm tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors font-heading">
        DevTee.Labs
      </span>
    </div>
    <div className="h-10 w-px bg-white/20 group-hover:bg-gold/30 transition-colors mx-1" />
    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-gold transition-all duration-500 bg-white/5 p-1 flex items-center justify-center">
      <img
        src="/devtee_logo.png"
        className="w-full h-full object-contain rounded-full opacity-90 group-hover:opacity-100 transition-all duration-500 brightness-110"
        alt="DevTee.Labs Logo"
      />
    </div>
  </motion.div>
);

const GodRays = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: [0, 0.1, 0],
          x: ['-10%', '110%'],
        }}
        transition={{
          duration: 15 + i * 5,
          repeat: Infinity,
          delay: i * 4,
          ease: "linear"
        }}
        className="absolute w-[40%] h-[200%] bg-gradient-to-r from-transparent via-gold/5 to-transparent -rotate-[35deg]"
        style={{ left: `${15 + i * 15}%`, top: '-10%' }}
      />
    ))}
  </div>
);

const TEAM_PHOTOS = {
  KINGS: "https://scontent.fsgn5-21.fna.fbcdn.net/v/t39.30808-6/634260188_1537589441708653_1029799505354569367_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHPFlrc_waEKLc3Km5WZ62C7INZF9zf8Nbsg1kX3N_w1tG_tUXqRcKvdEUwKULlCyD1gGAT7XVPMjvYv8bbxMsn&_nc_ohc=9vVYilA7-poQ7kNvwEFSC5r&_nc_oc=Adr6CWSQl8X1RLKFHVJ78ObublROql_wkpm_o7EA_0cP3v0oEP7zfoT_hPCbJYtqsoo&_nc_zt=23&_nc_ht=scontent.fsgn5-21.fna&_nc_gid=3uiqf8h2Aydc6v1KCQ2vUQ&_nc_ss=7b2a8&oh=00_Af41O3pYhUSpRblvTJK9_xNtHBhDfuVDRJ1tCMtNb3n7Jw&oe=6A062FDA",
  LADIES: "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/689494890_1622265059907757_3007718775422784531_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHoF3zAuF0tWZD0annoNWWJHm5zgkMJcmsebnOCQwlya31hPFeVNMlFR13Zwaii5RWXxUm2KpqCTXsKnqzS9Rjy&_nc_ohc=rsqK9X2a7RYQ7kNvwHrsB-o&_nc_oc=Adpr3-lRoY8r81GIMADDWtFmzgTNmGu65tPbz6tE7XAQDgSXCEAtHPtavT89e49pSBc&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=-GjslrDh-bzHI0Tx156taQ&_nc_ss=7b2a8&oh=00_Af5Ahfapq-sCRu8glCLXvM2Q_UXcIH_hphs5wsyjH5xx0g&oe=6A062B45"
};

const RosterModal = ({ type, members, onClose }) => {
  if (!type) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/95 backdrop-blur-3xl overflow-y-auto pt-10 pb-20"
    >
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-[60] text-gold/50 hover:text-gold transition-colors p-4 hover:bg-gold/10 rounded-full border border-gold/20 backdrop-blur-md"
      >
        <X size={32} />
      </button>

      <div className="relative w-full max-w-[98vw] xl:max-w-[92vw] flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12 mt-10 px-2">

        {/* Left: Epic Team Photo (Uncropped) */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          className="w-full xl:w-5/12 relative group flex flex-col justify-center"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative rounded-[2rem] overflow-hidden border border-gold/30 bg-black shadow-[0_0_60px_rgba(0,0,0,0.6)] p-1.5 max-h-[82vh] flex items-center justify-center">
            <img
              src={TEAM_PHOTOS[type]}
              className="max-w-full max-h-full w-auto h-auto scale-100 group-hover:scale-[1.02] transition-transform duration-[3s] ease-out image-crisp block rounded-[1.6rem] object-contain"
              alt={`${type} Group`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right: Members Section */}
        <div className="w-full xl:w-7/12 flex flex-col items-center pl-0 xl:pl-4">

          {/* Section Title - Centered over members */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-gold font-heading text-5xl md:text-6xl tracking-[0.3em] uppercase mb-3 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              {type === 'KINGS' ? 'The Sovereigns' : 'The Ladies'}
            </h2>
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
          </motion.div>

          {/* Members Grid */}
          <div className="w-full flex flex-wrap justify-center gap-4 md:gap-6">
            {members.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="group relative flex flex-col items-center w-[45%] sm:w-[30%] md:w-[22%] xl:w-[22%] max-w-[200px]"
              >
                <div className="relative w-full aspect-[3/4.8] rounded-3xl overflow-hidden border-2 border-gold/10 group-hover:border-gold transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_100px_rgba(212,175,55,0.3)] bg-black/40">
                  <img
                    src={member.img}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 brightness-[1.05] contrast-[1.15] saturate-[1.1] image-crisp"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]" />
                  <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 border-[0px] group-hover:border-[12px] border-gold/20 transition-all duration-500 pointer-events-none blur-[1px]" />

                  <div className="absolute bottom-4 left-0 w-full text-center px-2">
                    <motion.p className="text-gold font-heading text-2xl md:text-3xl tracking-widest drop-shadow-gold">
                      {member.name}
                    </motion.p>
                    <div className="h-0.5 w-8 bg-gold/50 mx-auto my-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <p className="text-[9px] text-white/70 uppercase tracking-[0.2em] font-bold">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="absolute -inset-8 bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const KINGS_ACHIEVEMENTS = [
  { type: 'APL', year: '2023', label: 'APL 2023', img: '/apl_cup_final.png', fmvp: 'Bâng (Jungle)' },
  { type: 'AOG', year: 'Spring 2026', label: 'S26', img: '/aog_trophy_final.png' },
  { type: 'AOG', year: 'Spring 2025', label: 'S25', img: '/aog_trophy_final.png', fmvp: 'Khoa (Support)' },
  { type: 'AOG', year: 'Winter 2024', label: 'W24', img: '/aog_trophy_final.png', fmvp: 'Kuga (DSL)' },
  { type: 'AOG', year: 'Spring 2024', label: 'S24', img: '/aog_trophy_final.png', fmvp: 'Fish (Mid Lane)' },
  { type: 'AOG', year: 'Winter 2023', label: 'W23', img: '/aog_trophy_final.png', fmvp: 'Fish (Mid Lane)' },
  { type: 'AOG', year: 'Spring 2023', label: 'S23', img: '/aog_trophy_final.png', fmvp: 'Red (ADL)' },
  { type: 'AOG', year: 'Winter 2022', label: 'W22', img: '/aog_trophy_final.png', fmvp: 'Bâng (Jungle)' },
  { type: 'AOG', year: 'Spring 2022', label: 'S22', img: '/aog_trophy_final.png', fmvp: 'Yiwei (DSL)' },
  { type: 'AOG', year: 'Winter 2021', label: 'W21', img: '/aog_trophy_final.png', fmvp: 'Bâng (Jungle)' },
  { type: 'AOG', year: 'Winter 2020', label: 'W20', img: '/aog_trophy_final.png', fmvp: 'Bâng (Jungle)' },
  { type: 'AOG', year: 'Spring 2018', label: 'S18', img: '/aog_trophy_final.png' },
];

const LADIES_ACHIEVEMENTS = [
  { type: 'QOG', year: 'Spring 2026', label: 'QOG S26', img: '/ladies_crown_final.png', fmvp: 'Shizuka (Mid Lane)' },
];

const TrophyItem = ({ item, delay, size = "large" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0, rotateY: 90 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ delay, duration: 0.8, type: "spring", bounce: 0.3 }}
    className="flex flex-col items-center"
  >
    <div
      className={`relative ${
        size === 'large' ? 'w-44 h-44 md:w-56 md:h-56' : 'w-28 h-28 md:w-32 md:h-32'
      } mb-3 rounded-full bg-black flex items-center justify-center`}
      style={{ overflow: 'hidden' }}
    >
      <img 
        src={item.img} 
        className="relative z-10 object-contain" 
        style={{ width: '82%', height: '82%' }}
        alt={item.label}
      />
    </div>
    <div className="text-center">
      <span className={`block text-gold font-heading ${
        size === 'large' ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'
      } tracking-widest leading-none mb-1 drop-shadow-gold`}>
        {item.label}
      </span>
      <span className="block text-[7px] md:text-[9px] tracking-[0.15em] text-white/35 uppercase font-bold mb-1.5">
        {item.year}
      </span>
      {item.fmvp && (
        <motion.div 
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.4 }}
          className="px-2 py-0.5 bg-gold/10 rounded-full border border-gold/20"
        >
          <p className="text-[6px] md:text-[8px] text-gold/75 font-bold uppercase tracking-widest whitespace-nowrap">
            FMVP: {item.fmvp}
          </p>
        </motion.div>
      )}
    </div>
  </motion.div>
);




const AchievementsModal = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[600] overflow-hidden"
    style={{ background: '#000000' }}
  >
    <DeveloperBadge />
    <button 
      onClick={onClose}
      className="fixed top-8 right-8 z-[700] text-gold/50 hover:text-gold transition-colors p-3 hover:bg-gold/10 rounded-full border border-gold/20"
    >
      <X size={32} />
    </button>

    <div className="w-full h-screen flex flex-col xl:flex-row items-stretch">
      {/* SGP Ladies Section — left 30% */}
      <div className="w-full xl:w-[30%] flex flex-col items-center justify-center border-b xl:border-b-0 xl:border-r border-white/5 px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <img src="/logo_ladies.jpg" className="w-14 h-14 rounded-full border-2 border-gold/30" />
            <h2 className="text-5xl md:text-6xl font-heading gold-gradient tracking-[0.2em] uppercase">SGP Ladies</h2>
          </div>
          <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase font-bold">Divine Queens Hall</span>
        </motion.div>
        <TrophyItem item={LADIES_ACHIEVEMENTS[0]} delay={0.4} size="large" />
      </div>

      {/* SGP King Section — right 70% */}
      <div className="w-full xl:w-[70%] flex flex-col items-center justify-center px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <img src="/logo_king.jpg" className="w-14 h-14 rounded-full border-2 border-gold/30" />
            <h2 className="text-5xl md:text-6xl font-heading gold-gradient tracking-[0.2em] uppercase">SGP King</h2>
          </div>
          <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase font-bold">Grand Monarch Dynasty</span>
        </motion.div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 w-full px-4">
          {KINGS_ACHIEVEMENTS.map((item, idx) => (
            <TrophyItem key={idx} item={item} delay={0.4 + idx * 0.06} size="small" />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [heroStep, setHeroStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeRoster, setActiveRoster] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const startExperience = () => {
    setPhase('intro');
    if (audioRef.current) {
      audioRef.current.play();
    }
    setTimeout(() => {
      setPhase('main');
      setTimeout(() => setHeroStep(1), 5000);
    }, 6000);
  };

  const resetExperience = () => {
    setPhase('intro');
    setHeroStep(0);
    setActiveRoster(null);
    setShowAchievements(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTimeout(() => {
      setPhase('main');
      setTimeout(() => setHeroStep(1), 5000);
    }, 6000);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#000000] text-white font-inter">
      <audio ref={audioRef} src="/music.mp3" loop />
      <Spotlight />
      <GodRays />
      <DeveloperBadge />

      <AnimatePresence>
        {showAchievements && (
          <AchievementsModal onClose={() => setShowAchievements(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeRoster && (
          <RosterModal
            type={activeRoster}
            members={ROSTER_DATA[activeRoster]}
            onClose={() => setActiveRoster(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key="landing"
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={startExperience}
            >
              <div className="absolute -inset-10 bg-gold/15 blur-[100px] group-hover:bg-gold/30 transition-all duration-1000" />
              <img src="/logo_king.jpg" className="w-44 h-44 rounded-full border border-gold/20 relative z-10 object-cover" />
              <div className="mt-10 text-gold tracking-[0.8em] text-[10px] uppercase font-bold animate-pulse">
                Click to Enter
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="relative w-full h-screen flex flex-col items-center justify-center bg-black z-50 p-0"
            exit={{ opacity: 0, filter: "brightness(2) blur(40px)" }}
            transition={{ duration: 1.2 }}
          >
            <div className="absolute inset-0 opacity-40">
              <img src="/logo_king.jpg" className="w-full h-full object-cover blur-3xl scale-110" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute -inset-20 bg-gold/20 blur-[120px]" />
              <img
                src="/logo_king.jpg"
                className="max-w-[80vw] max-h-[70vh] object-contain rounded-full border border-gold/20 shadow-[0_0_100px_rgba(212,175,55,0.3)]"
              />
            </motion.div>
          </motion.div>
        )}

        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-screen flex flex-col items-center p-6 md:p-10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.015]">
              <h1 className="text-[25vw] font-heading leading-none">PHANTOM</h1>
            </div>

            <div className="relative z-[100] w-full flex justify-between items-center mb-4 px-12">
              <div className="flex items-center gap-6 group">
                <div className="flex -space-x-4">
                  <img src="/logo_king.jpg" className="w-12 h-12 rounded-full border-2 border-gold/40 relative z-10 shadow-lg" />
                  <img src="/logo_ladies.jpg" className="w-12 h-12 rounded-full border-2 border-gold/20 relative z-0 shadow-lg" />
                </div>
                <span className="text-gold/40 tracking-[0.5em] text-[9px] uppercase font-bold">Divine Era</span>
              </div>
              <div className="flex gap-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-2 text-white/30 hover:text-gold transition-colors text-[9px] uppercase tracking-widest font-bold"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <button
                  onClick={resetExperience}
                  className="flex items-center gap-2 text-white/30 hover:text-gold transition-colors text-[9px] uppercase tracking-widest font-bold"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4"
            >
              <h1 className="text-4xl md:text-[5.5rem] font-heading tracking-[0.3em] leading-none text-white drop-shadow-2xl uppercase">
                SUNDAY THE <span className="gold-gradient italic">KING</span> PLAYS
              </h1>
            </motion.div>

            <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute -inset-10 bg-gold/5 blur-[120px] rounded-full animate-pulse-slow" />

              <AnimatePresence mode="wait">
                {heroStep === 0 ? (
                  <motion.div
                    key="sgp-title-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4.8, times: [0, 0.2, 0.75, 1], ease: "easeInOut" }}
                    className="relative w-full h-full flex flex-col items-center justify-center select-none pointer-events-none"
                  >
                    {/* Thin horizontal lines — cinematic letterbox */}
                    <div className="absolute top-0 left-0 w-full h-[10%] bg-black z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-[10%] bg-black z-10" />

                    {/* Main title block */}
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ opacity: 0, x: -80, letterSpacing: '0.1em' }}
                        animate={{ opacity: [0, 1, 1, 0], x: [-80, 0, 0, 0] }}
                        transition={{ duration: 4.8, times: [0, 0.2, 0.75, 1] }}
                        className="text-white/10 font-heading text-[12vw] md:text-[10vw] leading-none uppercase tracking-[0.15em]"
                      >
                        SAIGON
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: [0, 1, 1, 0], x: [80, 0, 0, 0] }}
                        transition={{ duration: 4.8, times: [0, 0.25, 0.75, 1], delay: 0.15 }}
                        className="text-white/10 font-heading text-[12vw] md:text-[10vw] leading-none uppercase tracking-[0.15em]"
                      >
                        PHANTOM
                      </motion.div>

                      {/* thin gold separator line that draws in */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: [0, 1, 1, 0] }}
                        transition={{ duration: 4.8, times: [0.15, 0.35, 0.75, 1] }}
                        className="w-48 h-px bg-gold/40 origin-left mt-4"
                      />

                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0.5, 0] }}
                        transition={{ duration: 4.8, times: [0.3, 0.45, 0.75, 1] }}
                        className="text-white/30 text-xs tracking-[0.6em] uppercase font-bold mt-3"
                      >
                        Champions Never Rest
                      </motion.span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="team"
                    initial={{ opacity: 0, filter: "blur(40px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.8 }}
                    className="relative w-full h-full flex flex-col items-center justify-center"
                  >
                    <div className="relative w-full h-[85%] flex items-center justify-center">
                      <div className="relative max-w-[95%] max-h-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-gold/15 shadow-[0_0_150px_rgba(0,0,0,0.9)] bg-black/20">
                        <motion.img
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 30, repeat: Infinity }}
                          src="/user_team.jpg"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: 1 }}
                      className="mt-6 flex items-center gap-12"
                    >
                      <button
                        onClick={() => setActiveRoster('LADIES')}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <img src="/logo_ladies.jpg" className="w-8 h-8 rounded-full border border-gold/20" />
                          <h2 className="text-2xl md:text-3xl font-heading tracking-[0.5em] text-white/50 group-hover:text-gold transition-colors uppercase">
                            Meet Ladies
                          </h2>
                        </div>
                        <div className="h-px w-0 group-hover:w-full bg-gold/50 transition-all duration-500" />
                      </button>

                      <motion.button
                        onClick={() => setShowAchievements(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex flex-col items-center gap-2"
                      >
                        <h2 className="text-3xl md:text-5xl font-heading tracking-[1em] gold-gradient uppercase text-center ml-[1em] group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                          SAIGON PHANTOM
                        </h2>
                        <div className="h-px w-0 group-hover:w-full bg-gold/50 transition-all duration-500" />
                      </motion.button>

                      <button
                        onClick={() => setActiveRoster('KINGS')}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl md:text-3xl font-heading tracking-[0.5em] text-white/50 group-hover:text-gold transition-colors uppercase">
                            Meet Kings
                          </h2>
                          <img src="/logo_king.jpg" className="w-8 h-8 rounded-full border border-gold/20" />
                        </div>
                        <div className="h-px w-0 group-hover:w-full bg-gold/50 transition-all duration-500" />
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Achievement Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="relative z-20 w-full max-w-6xl flex items-center justify-center gap-4 md:gap-8 mt-6 py-6 border-t border-gold/10"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <img src="/logo_ladies.jpg" className="w-4 h-4 rounded-full border border-gold/10" />
                  <span className="text-gold/40 text-[9px] uppercase tracking-widest font-bold">SGP Ladies</span>
                </div>
                <AchievementClean count="01" label="QOGS26 CHAMP" delay={1.6} icon={Star} />
              </div>

              <div className="h-16 w-px bg-gold/15" />

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <img src="/logo_king.jpg" className="w-4 h-4 rounded-full border border-gold/10" />
                  <span className="text-gold/40 text-[9px] uppercase tracking-widest font-bold">SGP King</span>
                </div>
                <div className="flex gap-4 md:gap-12">
                  <AchievementClean count="11" label="AOG CHAMP" delay={1.8} icon={Crown} />
                  <AchievementClean count="01" label="APL23 CHAMP" delay={2.0} icon={Trophy} />
                </div>
              </div>

              <div className="h-16 w-px bg-gold/15" />

              <div className="flex flex-col items-center">
                <span className="text-gold/40 text-[9px] uppercase tracking-widest mb-2 font-bold">Current Era</span>
                <div className="px-10 flex flex-col items-center">
                  <div className="flex items-center gap-3 text-gold font-bold text-2xl md:text-3xl tracking-[0.2em] animate-pulse h-[60px] md:h-[80px]">
                    <Zap size={24} />
                    <span>AOGS26</span>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold mt-1">CHAMPION</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .font-heading { font-family: 'Bebas Neue', sans-serif; }
        .gold-gradient {
          background: linear-gradient(180deg, #ffffff 0%, #f9e29a 40%, #d4af37 70%, #8a6d1d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .drop-shadow-gold {
          filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.4));
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite;
        }
        .image-crisp {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      `}</style>
    </main>
  );
}
