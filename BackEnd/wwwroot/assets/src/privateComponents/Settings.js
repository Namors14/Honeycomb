import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';
import axios from 'axios';

import { Row, Col, Spin, Card } from 'antd';
import { Layout, Menu, Breadcrumb, Icon, Upload, message } from 'antd';


import { userActions } from '../actions';
import { authHeader, history } from '../helpers';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  if (!isJPG && !isPNG) {
    message.error('You can only upload JPG or PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return (isJPG || isPNG) && isLt2M;
}

class Settings extends Component {

  state = {
    loading: false
  };
  
  handleChange = info => {
    if (info.file.status === "uploading") {
      console.log("wait");
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {


      let fileToUpload = info.file.originFileObj;

      let input = new FormData();
      input.append("file", fileToUpload);
      const { dispatch } = this.props;
      dispatch(userActions.UploadImage(input));
        this.setState({
          loading: false
        });
    }
  };

  render() {
        const {user} = this.props; 
        const uploadButton = (
          <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        const imageUrl = this.state.imageUrl;
       // console.log(user);
        if(false) { 
          return (<div className="example"><Spin /></div>)
        }
        return(
          <Layout className="profile-layout">
            <Row>
              <Col xs={{ span: 0 }} md = {{ span : 7 }} lg={{ span: 7 }} className = "profile-picture">
              <div>
              <Card 
                  
                  hoverable
                  cover = {user.userPhoto ? <img src={"data:image/png;base64," + user.userPhoto} alt="avatar" /> :
                  <img src="http://icons.iconarchive.com/icons/icons-land/vista-people/256/Person-Male-Light-icon.png" />}
                  >
                  <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {uploadButton}
              </Upload>
              </Card>
              
              </div>
              {/* <div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {uploadButton}
              </Upload>
              </div>     */}
              </Col>
              <Col xs={{ span: 0 }} md = {{ span : 2 }} lg={{ span: 2 }}></Col>
              <Col xs={{ span: 24 }} md = {{ span : 15 }} lg={{ span: 15 }} className="user-info"> 
              <div >
                 
                </div>
              </Col>
            </Row>
          </Layout>
        )
      }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user
  };
}

const connectedSettings = connect(mapStateToProps)(Settings);
export { connectedSettings as Settings};
// export default PrivateLayout