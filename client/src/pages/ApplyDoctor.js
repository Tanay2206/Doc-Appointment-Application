import React from 'react';
import Layout from './../components/Layout';
import { Col, Form, Input, message, Row, TimePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // handle form
    const handleFinish = async (values) => {
        // console.log(values);
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-doctor', {
                ...values, userId: user._id, timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm")
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/");
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };
    return (
        <Layout>
            <h1 className='text-center'>Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <h4 className=''>Personal Details : </h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your last name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone No" name="phone" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your phone no' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your email' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your website' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your address' />
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className=''>Professional Details : </h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your specialization' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your experience' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Fees Per Consultation" name="feesPerConsultation" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your fees' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings" required >
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className='btn btn-primary form-btn' type='submit'>
                            Submit
                        </button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    );
};

export default ApplyDoctor;