import React    from 'react'
import Channel  from './channel'

import { connect } 
  from 'react-redux'

class Mixer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { mixer : { channelList }, sendMessage } = this.props
    return (
      <div>
        {channelList.map(channel => (
          <Channel {...channel} 
            key         = {channel.id}
            sendMessage = {sendMessage}
          />
        ))}
      </div>
    )
  }
}

const MixerComponent = connect(state => ({
  mixer : state.mixer,
}))(Mixer)

export default MixerComponent
