import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutMe from "./AboutMe"
import Header from "./Header"
import Intro from "./Intro"
import Personal from "./Personal"
import Projects from "./Projects"
import Skills from "./Skills"
import Personal2 from './Personal2';
import Contact from './Contact';
import Footer from './Footer';
import pic from './icons-svg/carat-u-white.svg'
import Memory from './Memory';


function Port2() {
  const hohoho=(santa)=>{
    window.scrollTo({
      top:"100px",
      behavior: 'smooth'
    })
  }
  return (
    <div >
        <Header/>   
        <Intro/>
        <AboutMe/>
        <Skills/>
        <Projects/>
        <Router>
          <Routes>
            <Route path="/" element={<Personal/>}/>
            <Route path="/personal2" element={<Personal2/>}/>
            <Route path='/personal2/gun' element={<Memory/>}></Route>
          </Routes>
        </Router>
        <Contact/>
        <Footer/>
        <div className=' bg-black fixed right-5 bottom-5 cursor-pointer h-max w-max p-[20px] rounded-full flex items-center justify-center' onClick={hohoho}>
          <img src={pic} alt="MATTHEW" className=' scale-[2] active:scale-75'/>
        </div>
    </div>
  )
}
export default Port2