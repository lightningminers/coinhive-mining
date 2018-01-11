import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './footer.less';

class Footer extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <div className="copy-right">
        <div className="cr-by"><span>© 2017 blockchain navigate by </span> <a href="https://github.com/icepy">icepy</a></div>
      </div>
    )
  }
}

export default Footer;
