
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';  
import Landing from './FldrWebContent/Landing';
import MainLogin from './FldrMainMenu/MainLogin';  
import Main from './FldrMainMenu/Main';
import Profile from './FldrWebContent/Profile';
import Aboutus from './FldrWebContent/Aboutus';
import Services from './FldrWebContent/Services'; 

function App() {
  return (
    <div className="App"> 
      <BrowserRouter basename='/'>  
        <Routes>
          {/* <Route path='/MainLogin' element={<MainLogin/>}></Route>  */}
          <Route path='/' element={<MainLogin/>}></Route> 
          <Route path='/Main' element={<Main/>}></Route> 
          <Route path='/Landing' element={<Landing/>}></Route>  
          <Route path='/Profile' element={<Profile/>}></Route>  
          <Route path='/Aboutus' element={<Aboutus/>}></Route>  
          <Route path='/Services' element={<Services/>}></Route>    
          {/* <Route path='/RoyaltyShop' element={<RoyaltyShop />}></Route>   
          <Route path='/PackageContent' element={<PackageContent />}></Route>   
          <Route path='/TourPackages' element={<TourPackages />}></Route> 
          <Route path='/AdminDashboard' element={<AdminDashboard />}></Route> 
          <Route path='/SuccessURL/:strPPTCode/:strCOSession'  element={<SuccessURL/>} />;
           
          <Route path='/Login' element={<Login/>}></Route>  */}
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
