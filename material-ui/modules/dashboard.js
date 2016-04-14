import React         from 'react'
import _             from 'lodash'
import SmsDialog     from './sms-dialog'
import CallDialog    from './call-dialog'
import ConfirmDialog from './confirm-dialog'
import Inbox         from './inbox'
import Mixer         from './mixer'
import styles        from '../styles/dashboard'

import { connect } 
  from 'react-redux'
import { actions } 
  from 'react-redux-form'
import { setDialog, removeMessage }
  from '../js/actions'

import AppBar   
  from 'material-ui/lib/app-bar'
import Tabs 
  from 'material-ui/lib/tabs/tabs'
import Tab 
  from 'material-ui/lib/tabs/tab'
import FloatingActionButton 
  from 'material-ui/lib/floating-action-button'

import IconCommunicationDialpad
  from 'material-ui/lib/svg-icons/communication/dialpad'
import IconCommunicationMessage
  from 'material-ui/lib/svg-icons/communication/message'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab     : 'mixer',
      opacity : 0,
    }
  }
  activateTab(tab) {
    this.setState({tab})
  }
  renderAppBar() {
    return (
      <div>
        <AppBar title='VoxBox' />
      </div>
    )
  }
  handleDeleteMessage(id) {
    const { dispatch, sendMessage } = this.props
    dispatch(setDialog(null))
    sendMessage('messageDelete', { 
      [id]: null
    })
    dispatch(removeMessage(id))
  }
  renderDialog() {
    const { 
      mixer: { channelList }, 
      app: { dialog }, 
      sendMessage, 
      dispatch,
    } = this.props
    return (
			<div>
        <CallDialog 
          channels    = {channelList}
          onClose     = {() => dispatch(setDialog(null))} 
          open        = {'call' == dialog} 
          sendMessage = {sendMessage}
        />
				<SmsDialog
          channels    = {channelList}
          onClose     = {() => dispatch(setDialog(null))} 
          open        = {'sms' == dialog} 
          sendMessage = {sendMessage}
        />
				<ConfirmDialog
          onClose     = {() => dispatch(setDialog(null))} 
          onConfirm   = {::this.handleDeleteMessage}
          open        = {'confirm' == dialog} 
          sendMessage = {sendMessage}
        />
			</div>
    )
  }
  renderTabs() {
    const { tab } = this.state
    const { sendMessage } = this.props
    const mixerIcon = (
      <span>
        <i className='material-icons'>volume_up</i>
      </span>
    )
    const inboxIcon = (
      <span>
        <i className='material-icons'>message</i>
      </span>
    )
    return (
      <Tabs value={tab}>
        <Tab 
          onActive = {() => this.activateTab('mixer')}
          icon     = {mixerIcon}
          label    = 'Mixer'
          value    = 'mixer'>
          <Mixer sendMessage={sendMessage} />
        </Tab>
        <Tab
          onActive = {() => this.activateTab('inbox')}
          icon     = {inboxIcon}
          label    = 'Inbox'
          value    = 'inbox'>
          <Inbox sendMessage={sendMessage} />
        </Tab>
      </Tabs>
    )
  }
  renderFAB() {
    const { dispatch } = this.props
    switch (this.state.tab) {
      case 'mixer':
				return (
					<FloatingActionButton
						onClick = {() => { 
              dispatch(actions.reset('call'))
              dispatch(setDialog('call')) 
            }}
						style   = {styles.fab}>
            <IconCommunicationDialpad />
					</FloatingActionButton>
        )
      case 'inbox':
				return (
					<FloatingActionButton
						onClick = {() => { 
              dispatch(actions.reset('sms'))
              dispatch(setDialog('sms')) 
            }}
						style   = {styles.fab}>
            <IconCommunicationMessage />
					</FloatingActionButton>
        )
      case 'call_log':
      default:
				return <span />
		}
  }
  componentDidMount() {
    window.setTimeout(() => this.setState({opacity: 1}), 100)
  }
  render() {
    const { opacity } = this.state
    return (
      <div style={{opacity, ...styles.component}}>
        {this.renderDialog()}
        {this.renderAppBar()}
        {this.renderTabs()}
        {this.renderFAB()}
      </div>
    )
  }
}

export default connect(state => _.pick(state, ['inbox', 'app', 'mixer']))(Dashboard)
