import React    from 'react'
import ReactDOM from 'react-dom'

import Dialog 
  from 'material-ui/lib/dialog'
import TextField 
  from 'material-ui/lib/text-field'
import AutoComplete 
  from 'material-ui/lib/auto-complete'
import FlatButton 
  from 'material-ui/lib/flat-button'
import SelectField 
  from 'material-ui/lib/select-field'
import MenuItem 
  from 'material-ui/lib/menus/menu-item'

class SendMessageDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  handleUpdate() {
    const text = this.refs.autoComplete.state.searchText
    this.props.sendMessage('addrBookSuggestions', text)
  }
  render() {
    const { open, onClose, channels } = this.props
    const actions = [
      <FlatButton
        label           = 'Cancel'
        secondary       = {true}
        onTouchTap      = {onClose}
      />,
      <FlatButton
        label           = 'Send'
        primary         = {true}
        keyboardFocused = {true}
        onTouchTap      = {onClose}
      />,
    ]
    return (
      <Dialog
        title          = 'Send message'
        actions        = {actions}
        modal          = {false}
        open           = {open}
        onRequestClose = {() => {}}>
        <SelectField 
          floatingLabelText = 'SIM card'
          style             = {{width: '100%'}}
          value             = {1} 
          onChange          = {() => {}}>
          {channels.map((channel, i) => (
            <MenuItem 
              key         = {i}
              value       = {i}
              primaryText = {channel.id} />
          ))}
        </SelectField>
        <AutoComplete
          ref               = 'autoComplete'
          hintText          = 'Type a contact name or phone number'
          dataSource        = {['Bob', 'Alice', 'Knuth', 'Greg', 'Alex', 'Adrian']}
          onUpdateInput     = {this.handleUpdate.bind(this)}
          floatingLabelText = 'Recepient'
          fullWidth         = {true}
        />
        <TextField
          hintText          = 'Message content'
          fullWidth         = {true}
          multiLine         = {true}
          rows              = {3} 
        />
      </Dialog>
    )
  }
}

export default SendMessageDialog
