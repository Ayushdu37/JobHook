import { Divider } from "@mantine/core"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "../Components/Header/Header"
import FindJobs from "./FIndJobs"
import FindTalentPage from "./FIndTalentPage"
import CompanyPage from "./CompanyPage"
import PostedJobPage from "./PostedJobPage"
import JobHistoryPage from "./JobHistoryPage"
import JobDescPage from "./JobDescPage"
import ApplyJobPage from "./ApplyJobPage"
import PostJobPage from "./PostJobPage"
import SignUpPage from "./SignUpPage"
import ProfilePage from "./ProfilePage"
import TalentProfilePage from "./TalentProfilePage"
import HomePage from "./HomePage"
import Footer from "../Components/Footer/Footer"
import { getItem } from "../Services/LocalStorageService"
import { useSelector } from "react-redux"


const AppRoutes=()=>{
    const user = useSelector((state:any)=>state.user);
    return <BrowserRouter>
      <div className='relative'>
      <Header/>
      <Divider size="xs" />
        <Routes>
          <Route path='/find-jobs' element={<FindJobs/>}/>
          <Route path='/find-talent' element={<FindTalentPage/>}/>
          <Route path='/company' element={<CompanyPage/>}/>
          <Route path='/posted-job' element={<PostedJobPage/>}/>
          <Route path='/job-history' element={<JobHistoryPage/>}/>
          <Route path='/jobs' element={<JobDescPage/>}/>
          <Route path='/apply-job' element={<ApplyJobPage/>}/>
          <Route path='/post-job' element={<PostJobPage/>}/>
          <Route path='/signup' element={user?<Navigate to="/"/>:<SignUpPage/>}/>
          <Route path='/login' element={user?<Navigate to="/"/>:<SignUpPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/talent-profile' element={<TalentProfilePage/>}/>
          <Route path='*' element={<HomePage/>}/>
        </Routes>
      <Footer/>
      </div>
      </BrowserRouter> 
}

export default AppRoutes;