import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { DatePicker, TimePicker, message } from 'antd';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

const BookinPage = () => {
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const getUserData = async () => {
    try {
      const res = await axios.post(
        '/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      message.error('unable to fetch data');
    }
  };

  //booking
  const handleBooking = async () => {
    try {
      const res = await axios.post(
        '/user/book-appoinment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: timings,
        },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h3>Bookin page</h3>
      <div className="container">
        {doctor && (
          <>
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees {doctor.feespersconsultation}</h4>
            <h4>
              Fees {doctor.timings[0]} - {doctor.timings[1]}
            </h4>

            <div className="d-flex flex-column">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onClick={(value) => setDate(moment(value).format('DD-MM-YYYY'))}
              />
              <TimePicker.RangePicker
                format="HH:mm"
                onChange={(values) =>
                  setTimings(
                    [moment(values[0]).format('HH:mm')]
                      .moment(values[1])
                      .format('HH:mm')
                  )
                }
              />
              <button className="btn btn-primary">Check Availability</button>
              <button className="btn btn-dark" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookinPage;
