//import React    from 'react'
//import ReactDOM from 'react-dom'
//import _        from 'lodash'
//
//import Dialog 
//  from 'material-ui/lib/dialog'
//import TextField 
//  from 'material-ui/lib/text-field'
//import AutoComplete 
//  from 'material-ui/lib/auto-complete'
//import FlatButton 
//  from 'material-ui/lib/flat-button'
//import SelectField 
//  from 'material-ui/lib/select-field'
//import MenuItem 
//  from 'material-ui/lib/menus/menu-item'
//import Subheader 
//  from 'material-ui/lib/Subheader'
//import { reduxForm }
//  from 'redux-form'
//
//class SendMessageDialog extends React.Component {
//  handleConfirm() {
//    const { sendMessage } = this.props
//    const key = Date.now()
//    const payload = {
//      [key]: {
//	type       : 'sms_out',
//	endpoint   : '',
//	content    : '',
//	channel_id : '',
//      }
//    }
//    console.log(payload)
//    //sendMessage('messageSend', payload)
//  }
//  renderFormFields() {
//    const { 
//      dialog, 
//      channels, 
//      fields : { 
//        recipient, 
//        content,
//        message,
//      }, 
//      error,
//    } = this.props
//    const simSelect = (
//      <SelectField 
//        floatingLabelText = 'SIM card'
//        style             = {{width: '100%'}}
//        value             = {1} 
//        onChange          = {() => {}}>
//        {channels.filter(chan => 'free' == chan.mode).map((channel, i) => 
//          <MenuItem 
//            key           = {i}
//            value         = {i}
//            primaryText   = {channel.id} />
//        )} 
//      </SelectField>
//    )
//    switch (dialog) {
//      case 'forward-message':
//        return (
//          <div>
//            {simSelect}
//            <AutoComplete {...recipient}
//              ref               = 'autoComplete'
//              hintText          = {'Recipient\'s phone number'}
//              dataSource        = {['Bob', 'Alice', 'Knuth', 'Greg', 'Alex', 'Adrian']}
//              onUpdateInput     = {::this.handleUpdate}
//              floatingLabelText = 'Send to'
//              fullWidth         = {true}
//            />
//            <TextField {...content}
//	      errorText         = {content.touched && content.error}
//              floatingLabelText = 'Message content'
//              hintText          = 'Forwarded message'
//              fullWidth         = {true}
//              multiLine         = {true}
//              rows              = {3} 
//            />
//	    <div>
//	      {content.value && content.value.length <= 160 && (
//                <div>Characters remaining: {160-content.value.length}</div>
//	      )}
//            </div>
//          </div>
//        )
//      case 'reply-to-message':
//        return (
//          <div>
//            <TextField {...message}
//              disabled          = {true}
//              floatingLabelText = 'Original message'
//              fullWidth         = {true}
//              multiLine         = {true}
//              rows              = {3} 
//            />
//            {simSelect}
//            <TextField {...recipient}
//	      errorText         = {recipient.touched && recipient.error}
//              floatingLabelText = 'Send to'
//              hintText          = {'Recipient\'s phone number'}
//              fullWidth         = {true}
//            />
//            <TextField {...content}
//	      errorText         = {content.touched && content.error}
//              floatingLabelText = 'Your reply'
//              hintText          = 'Type your message here'
//              fullWidth         = {true}
//              multiLine         = {true}
//              rows              = {3} 
//            />
//	    <div>
//	      {content.value && content.value.length <= 160 && (
//                <div>Characters remaining: {160-content.value.length}</div>
//	      )}
//            </div>
//          </div>
//        )
//      case 'send-message':
//        return (
//          <div>
//            {simSelect}
//            <TextField {...recipient}
//	      errorText         = {recipient.touched && recipient.error}
//              floatingLabelText = 'Send to'
//              hintText          = {'Recipient\'s phone number'}
//              fullWidth         = {true}
//            />
//            <TextField {...content}
//	      errorText         = {content.touched && content.error}
//              floatingLabelText = 'Message content'
//              hintText          = 'Type your message here'
//              fullWidth         = {true}
//              multiLine         = {true}
//              rows              = {3} 
//            />
//	    <div>
//	      {content.value && content.value.length <= 160 && (
//                <div>Characters remaining: {160-content.value.length}</div>
//	      )}
//            </div>
//          </div>
//        )
//    }
//  }
//  render() {
//    const { 
//      open, 
//      onClose, 
//      dialog, 
//      handleSubmit, 
//      fields, 
//    } = this.props
//    const actions = [
//      <FlatButton
//        label           = 'Cancel'
//        secondary       = {true}
//        onTouchTap      = {onClose}
//      />,
//      <FlatButton
//        label           = 'Send'
//	disabled        = {!!(fields.recipient.error || fields.content.error)}
//        primary         = {true}
//        keyboardFocused = {true}
//        onTouchTap      = {handleSubmit(data => {
//	  console.log(data)
//	})}
//      />,
//    ]
//    const getTitle = dialog => {
//      switch (dialog) {
//        case 'reply-to-message':
//          return 'Reply to message'
//        case 'forward-message':
//          return 'Forward message'
//        case 'send-message':
//        default:
//          return 'Send message'
//      }
//    }
//    return (
//      <Dialog
//        title          = {getTitle(dialog)}
//        actions        = {actions}
//        modal          = {false}
//        open           = {open}
//        onRequestClose = {onClose}>
//        {this.renderFormFields()}
//      </Dialog>
//    )
//  }
//}
//
//function validatePhoneNumber(number) {
//  return /^(\+?[0-9]{1,3}\-?|0)[0123456789]{9}$/.test(number)
//}
//
//const validate = values => {
//  let errors = {}
//  if (!values.content) {
//    errors.content = 'Required'
//  }
//  if (values.content && values.content.length > 160) {
//    errors.content = 'Message is too long'
//  }
//  if (!values.recipient) {
//    errors.recipient = 'Required'
//  }
//  if (!validatePhoneNumber(values.recipient)) {
//    errors.recipient = 'Not a valid phone number'
//  }
//  return errors
//}
//
//export default reduxForm({ 
//  form   : 'sendSMS',                           
//  fields : ['recipient', 'content'],
//  validate,
//})(SendMessageDialog)
