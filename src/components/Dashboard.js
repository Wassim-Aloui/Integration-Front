import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Pie } from '@ant-design/plots';

function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teamsCoubt, setTeamsCount] = useState(0);
  const [classesCount, setClassesCount] = useState(0);
  const [TeachersCount, setTeachersCount] = useState(0);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    // Fetch the count from your backend route
    fetch('http://localhost:3000/student/count')
      .then((response) => response.json())
      .then((data) => {
        //console.log('API eeeeeeeeeeeeee:', data); // Log the API response
        setStudentsCount(data);
      })
      .catch((error) => console.error('Error fetching students count:', error));
  }, []);

  useEffect(() => {
    // Fetch the count from your backend route
    fetch('http://localhost:3000/team/count')
      .then((response) => response.json())
      .then((data) => {
        //console.log('API eeeeeeeeeeeeee:', data); // Log the API response
        setTeamsCount(data);
      })
      .catch((error) => console.error('Error fetching teams count:', error));
  }, []);

  useEffect(() => {
    // Fetch the count from your backend route
    fetch('http://localhost:3000/salle/count')
      .then((response) => response.json())
      .then((data) => {
        //console.log('API eeeeeeeeeeeeee:', data); // Log the API response
        setClassesCount(data);
      })
      .catch((error) => console.error('Error fetching students count:', error));
  }, []);

  useEffect(() => {
    // Fetch the count from your backend route
    fetch('http://localhost:3000/tuteur/count')
      .then((response) => response.json())
      .then((data) => {
        //console.log('API eeeeeeeeeeeeee:', data); // Log the API response
        setTeachersCount(data);
      })
      .catch((error) => console.error('Error fetching students count:', error));
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Make API request to get data for the first pie chart
    fetch('http://localhost:3000/student/countBySpec')
      .then(response => response.json())
      .then(data => {
        const processedData = Object.keys(data).map(specialite => ({
          type: specialite,
          value: data[specialite]
        }));
        setData1(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });


    fetch('http://localhost:3000/tuteur/countBy')
      .then(response => response.json())
      .then(data => {
        const processedData = Object.keys(data).map(specialite => ({
          type: specialite,
          value: data[specialite]
        }));
        setData2(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const config1 = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{value}',  
      style: {
        fill: 'white',
        fontSize: 15,
      
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{value}',  
      style: {
        fill: 'white',
        fontSize: 15,
  
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };


  


  return (
    <div>
      <NavBar></NavBar>
      <section class="section coming-soon" data-section="section3">
      <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '0 0 48%', marginRight: '2%' }}>
          <h2 style={{color:"white"}}>Students Pie</h2>
          <Pie {...config1} data={data1} />
        </div>
        <div style={{ flex: '0 0 48%', marginLeft: '2%' }}>
          <h2 style={{color:"white"}}>Tutors pie</h2>
          <Pie {...config2} data={data2} />
        </div>
      </div>
    </div>
      
     
        <div class="container">
          <div class="row">
            <div class="col-md-7 col-xs-12">
              <div class="continer centerIt">
                <div>
                  <h4>Track <em>your website</em> statistics</h4>
                  <div class="counter">

                    <div class="days">
                      <div class="value">{studentsCount}</div>
                      <span>Students</span>
                    </div>

                    <div class="hours">
                      <div class="value">{teamsCoubt}</div>
                      <span>Teams</span>
                    </div>

                    <div class="minutes">
                      <div class="value">{classesCount}</div>
                      <span>Classes</span>
                    </div>

                    <div class="seconds">
                      <div class="value">{TeachersCount}</div>
                      <span>Teachers</span>
                    </div>
                   
                  </div>
                  
                </div>
              </div>
            </div>
            <br></br>
          </div>
          
        </div>
        
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;