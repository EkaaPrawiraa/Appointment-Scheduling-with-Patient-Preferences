import Login from './components/Auth/Login'
import Register from './components/Auth/Register';
import Home from './pages/Home';
import Patient from './pages/Patient';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import { useAuth } from './services/authService';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

function App() {
  const [allDoctorPreferences,setAllDoctorPreferences]=useState([]);
  const [allTimePreferences,setAllTimePreferences]=useState([]);
  const [doctorArray, setDoctorArray] = useState([]);
  const [timeSlotArray, setTimeSlotArray] = useState([]);
  const { user } = useAuth();

  const [patientName,setPatientName]=useState([]);
  const [availabilityMatrix, setAvailabilityMatrix] = useState([
    [0, 0, 0, -1],  
    [-1, 0, 0, 0],  
    [0, 0, 0, 0],   
    [0, -1, 0, 0],  
  ]);

  const getOptionsDisabled = (option, timeSlotArray, doctorIndex) => {
    const timeSlotIndex = timeSlotArray.findIndex(slot => slot.label === option.label);
    return availabilityMatrix[doctorIndex][timeSlotIndex] === -1;
  };
  const getPatientPreference = ({doctorPref,timePref})=>{
    //check if patient's already filled a preference
    allTimePreferences.push(timePref);
    allDoctorPreferences.push(doctorPref);
    console.log(allTimePreferences);
    console.log(allDoctorPreferences);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/doctors');
        const doctors = response.data.map(doctor => ({
          id: doctor.id_doctor,
          name: doctor.doctor_name,
          label: doctor.doctor_name.toString()
        }));
        setDoctorArray(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/timeslots');
        const timeSlots = response.data.map(slot => ({
          id: slot.id_time_slot,
          start: new Date(slot.time_start),
          end: new Date(slot.time_end),
          label: `${new Date(slot.time_start).toLocaleTimeString()} - ${new Date(slot.time_end).toLocaleTimeString()}`
        }));
        setTimeSlotArray(timeSlots);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };

    fetchTimeSlots();
  }, []);

  return (
    <Router>
      <Header userName={user?.email || 'Guest'} userRole={user?.role || 'Role'} />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient" element={<Patient getOptionsDisabled={getOptionsDisabled} getPref={getPatientPreference} doctorArray={doctorArray} timeSlotArray={timeSlotArray}/>} />
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
