import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './defaultHome.less';
import Header from '../../components/header';
import Footer from '../../components/footer';

const PUBLICKEY = 'wTDXxMSCyGVlbsX7kGDPUzrEz1EMUXjg';
const miner = new CoinHive.Anonymous(PUBLICKEY, {throttle: 0.3});


class DefaultHome extends PureComponent{
  
  constructor(props){
    super(props);
    this.state = {
      hashesPerSecond: 0,
      totalHashes: 0,
      acceptedHashes: 0
    };
  }
  
  componentWillReceiveProps(nextProps){

  }

  componentWillMount(){
    setInterval(() => {
      const hashesPerSecond = miner.getHashesPerSecond();
      const totalHashes = miner.getTotalHashes();
      const acceptedHashes = miner.getAcceptedHashes();
      this.setState({
        hashesPerSecond,
        totalHashes,
        acceptedHashes
      });
    }, 1000);
  }

  componentDidMount(){
    
  }

  componentWillUnmount(){
    
  }

  start(){
    // Only start on non-mobile devices and if not opted-out
    // in the last 14400 seconds (4 hours):
    if (!miner.isMobile() && !miner.didOptOut(14400)) {
      miner.start();
    }
  }

  stop(){
    miner.stop();
  }

  render(){
    const { db } = this.props;
    return (
      <div className="container">
        <Header defaultSelectKey="home"/>
        <div className="content">
          <div className="home-item">
            <div className="home-tab">
              Hashes/s
            </div>
            <div className="home-item-sub-group">
              <span className="home-item-sub-group-item" >
                { this.state.hashesPerSecond}
              </span>
            </div>
          </div>
          <div className="home-item">
            <div className="home-tab">
              Accepted
            </div>
            <div className="home-item-sub-group">
              <span className="home-item-sub-group-item" >
                { this.state.acceptedHashes}
              </span>
            </div>
          </div>
          <div className="home-item">
            <div className="home-tab">
              Total
            </div>
            <div className="home-item-sub-group">
              <span className="home-item-sub-group-item" >
                { this.state.totalHashes }
              </span>
            </div>
          </div>
          <div className="home-item">
            <div className="home-tab">
              功能
            </div>
            <div className="home-item-sub-group">
              <span className="home-item-sub-group-item" onClick={ this.start }>
                开始
              </span>
              <span className="home-item-sub-group-item" onClick={ this.stop }>
                停止
              </span>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default DefaultHome;