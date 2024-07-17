

import { useState, useEffect } from "react";
import { GetModelViewCountAP, GetModelViewCountDE, GetCountfiles, GetCountCases, GetCountAppointmentToday, GetCountAppointmentUpcoming, GetCountAppointmentMissed, GetCountUsers } from "../FldrFunctions/ClsGetList";
import ReactApexChart from "react-apexcharts";

function Home(){

const [CountAP, setCountAP] = useState({});
const [CountDE, setCountDE] = useState([]);
const [countfiles, setcountfiles] = useState(0);
const [countCase, setcountCase] = useState(0);
const [counttoday, setcounttoday] = useState(0);
const [countupcoming, setcountupcoming] = useState(0);
const [countmissed, setcountmissed] = useState(0);
const [countusers, setcountusers] = useState(0);

//pie
const options = {
  labels: ['Pending', 'Confirmed', 'Declined', 'Finished'],
  colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
};

const series = [parseInt(CountAP.pending), parseInt(CountAP.approve), parseInt(CountAP.decline), parseInt(CountAP.finish)];

//Line  
  const Lineoptions = {
    chart: {
      toolbar: {
        show: false, 
      },
  },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const Lineseries = [{
    name: 'Total',
    data: CountDE.map(item=>item.countDE),
    markers: {
      size: 6,
      colors: '#FFA41B',
      strokeColors: '#fff',
      strokeWidth: 2,
    },
  }];


//fetch 
const fetchcountfiles = async () => {
    try {
        setCountAP(await GetModelViewCountAP()); 
        setCountDE(await GetModelViewCountDE()); 
        setcountfiles(await GetCountfiles()); 
        setcountCase(await GetCountCases()); 
        setcounttoday(await GetCountAppointmentToday()); 
        setcountupcoming(await GetCountAppointmentUpcoming()); 
        setcountmissed(await GetCountAppointmentMissed()); 
        setcountusers(await GetCountUsers()); 
    } catch {
      console.log("Connection error!");
    }
  };

useEffect(()=>{
    fetchcountfiles();
},[]);

    return (
      <>
        <div
          className="container-fluid container-xxl shadow p-3 rounded my-5 "
          // style={{ height: "75vh" }}
        >
          <div className="mb-4 text-success">
            <h2>Workspace Overview</h2>
          </div>
          <div className="d-lg-flex d-sm-grid gap-2 justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "30vh", background: "#DEECBC" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#9CC837",
                  }}
                >
                  <b>Archiving Overview</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-6">
                    <h4 className="fs-3">
                      <b>{countfiles}</b>
                    </h4>
                    <h4>Documents</h4>
                  </div>
                  <div className="p-2 col-6">
                    <h4 className="fs-3">
                      <b>{countCase}</b>
                    </h4>
                    <h4>Cases</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "30vh", background: "#FCCFD4" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#F77080",
                  }}
                >
                  <b>Appointment Schedules</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{counttoday}</b>
                    </h4>
                    <h4>Today</h4>
                  </div>
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{countupcoming}</b>
                    </h4>
                    <h4>Upcoming</h4>
                  </div>
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{countmissed}</b>
                    </h4>
                    <h4>Missed</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "30vh", background: "#D5EFEE" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#81D0CD",
                  }}
                >
                  <b>User Statistics</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-12">
                    <h4 className="fs-3">
                      <b>{countusers}</b>
                    </h4>
                    <h4>Registered Users</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid d-lg-flex d-sm-grid justify-content-center mt-4">
            <div className="col-lg-6 col-sm-12">
              <h2>Appointment Services</h2>
              <div className="d-flex mb-4">
                <ReactApexChart
                  className="mx-auto text-start"
                  options={options}
                  series={series}
                  type="pie"
                  width="500"
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <h2>Monthly Total Appointments</h2>
              <div className="d-flex">
                <ReactApexChart
                  className="mx-auto"
                  options={Lineoptions}
                  series={Lineseries}
                  type="line"
                  height={380}
                  width={500}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Home;