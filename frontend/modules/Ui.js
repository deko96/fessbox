import React    from 'react'
import Sidebar  from 'react-sidebar'
import Operator from './Operator'
import Mixer    from './Mixer'

class Ui extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen    : false,
      sidebarDocked  : false,
      mediaQueryList : null
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open})
  }
  componentWillMount() {
    const mediaQueryList = window.matchMedia(`(min-width: 800px)`)
    mediaQueryList.addListener(this.mediaQueryChanged)
    this.setState({ mediaQueryList, sidebarDocked : mediaQueryList.matches })
  }
  componentWillUnmount() {
    this.state.mediaQueryList.removeListener(this.mediaQueryChanged)
  }
  mediaQueryChanged() {
    this.setState({ sidebarDocked : this.state.mediaQueryList.matches })
  }
  toggleMenu() {
    const docked = this.state.sidebarDocked
    this.setState({sidebarDocked: !docked})
  }
  renderMixer() {
    return (
      <Mixer {...this.props} />
    )
  }
  render() {
    const { client, mixer, users, t } = this.props
    const { sidebarOpen, sidebarDocked } = this.state
    return mixer.active ? (
      <div>
        {users._connected ? (
          <Sidebar sidebar = {(
            <div style = {styles.hostWrapper}>
              <button 
                style       = {styles.drawer.hamburger}
                className   = 'btn btn-default'
                type        = 'button'
                onClick     = {this.toggleMenu}>
                <span className='glyphicon glyphicon-menu-hamburger' />
              </button>
              <Operator {...this.props} />
            </div>)}
              open          = {sidebarOpen}
              docked        = {sidebarDocked}
              onSetOpen     = {this.onSetSidebarOpen}>
            <div>
              {!sidebarDocked && (
                <button 
                  style     = {styles.hamburger}
                  className = 'btn btn-default'
                  type      = 'button'
                  onClick   = {this.toggleMenu}>
                  <span className='glyphicon glyphicon-menu-hamburger' />
                </button>
              )}
            </div>
            {this.renderMixer()}
          </Sidebar>
        ) : (
          <div>{this.renderMixer()}</div>
        )}
      </div>
    ) : (
      <div>
        Connection lost.
      </div>
    )
  }
}

const styles = {
  hostWrapper : {
    minWidth   : '220px',
    height     : '100%',
    background : '#fff'
  },
  hamburger : {
    position   : 'absolute', 
    float      : 'left', 
    border     : 'none'
  },
  drawer : {
    hamburger : {
      width    : '100%', 
      border   : 'none'
    }
  },
}

export default Ui
