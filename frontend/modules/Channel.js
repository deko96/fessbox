import React       from 'react'
import classNames  from 'classnames'
import PhoneLookup from 'frh-react-phone-lookup'
import Switch      from 'react-bootstrap-switch'
import Slider      from './Slider'

import { updateMode, updateLevel } 
  from '../js/actions'
import { ListGroupItem } 
  from 'react-bootstrap'

import entries     from './testdata/entries'
import randomize   from './testdata/randomize'

class LookupResults extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { results, onSelectionChange } = this.props
    return (
      <div 
        className = 'list-group ' 
        style     = {{position: 'absolute', width: '500px', margin: '-1px 0 0 0', padding: 0, zIndex: 4}}>
        {results.map((result, key) => {
          return (
            <a 
              key       = {key} 
              className = 'list-group-item' 
              href      = '#' 
              onClick   = {() => onSelectionChange(result)}>
              <p className='list-group-item-text'>
                <span style={{float: 'right', minWidth: '180px'}}>
                  {result.phone}
                </span>
                <b>{result.name}</b>
              </p>
            </a>
          )
        })}
      </div>
    )
  }
}

class LookupInput extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { 
      hasEntry, 
      value, 
      onChange, 
      onReset, 
      onCallNumber, 
      isValidNumber
    } = this.props
    const inputStyle = hasEntry ? {
      backgroundColor: '#fff4a8'
    } : isValidNumber ? {
      backgroundColor: '#a8f4a8'
    } : {}
    return (
      <div>
        <div className='input-group input-group-sm'>
          <input 
            className = 'form-control'
            type      = 'text'
            style     = {inputStyle}
            value     = {value}
            onChange  = {onChange} />
          <div className='input-group-btn'>
            <button 
              disabled  = {!value}
              onClick   = {onReset} 
              type      = 'button' 
              className = 'btn btn-default'>
              <span className='glyphicon glyphicon-remove'></span>
            </button>
            <button 
              disabled  = {!hasEntry && !isValidNumber}
              onClick   = {onCallNumber} 
              type      = 'button' 
              className = 'btn btn-default'>
              <span style={{top: '1px'}} className='glyphicon glyphicon-earphone'></span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

class Channel extends React.Component {
  constructor(props) {
    super(props)
  }
  toggleMuted() {
    const { dispatch, muted, channelId, sendMessage } = this.props
    sendMessage('channelMuted', {
      [channelId] : !muted
    })
  }
  updateLevel(event) {
    const { dispatch, channelId, sendMessage } = this.props
    const value = event.target ? event.target.value : event
    sendMessage('channelVolume', {
      [channelId] : value
    })
    dispatch(updateLevel(channelId, value))
  }
  answerCall() {
    const { dispatch, channelId, sendMessage, client : { channels } } = this.props
    const chan = channels[channelId] || {mode: 'master'}
    console.log(`answer in mode ${chan.mode}`)
    sendMessage('channelMode', {
      [channelId] : chan.mode
    })
  }
  rejectCall() {
    const { channelId, sendMessage } = this.props
    sendMessage('channelMode', {
      [channelId] : 'free'
    })
  }
  hangUpCall() {
    console.log('hang up')
    const { channelId, sendMessage } = this.props
    sendMessage('channelMode', {
      [channelId] : 'free'
    })
  }
  updateMode(mode) {
    const { channelId, dispatch, sendMessage, client } = this.props
    sendMessage('channelMode', {
      [channelId] : 'host' === mode ? client.hostId : mode
    })
    dispatch(updateMode(channelId, mode))
  }
  renderChannelMode() {
    const { mode, contact } = this.props
    if ('free' === mode) {
      return (
        <div>
          <PhoneLookup 
            inputComponent   = {LookupInput}
            resultsComponent = {LookupResults}
            entries          = {entries.map(entry => ({ ...entry, phone : randomize() }))} />
        </div>
      )
    } else if ('ring' === mode) {
      return (
        <div style={{textAlign: 'center'}}>
          <h4 style={{marginBottom: '3px'}}>
            {contact.number}
          </h4>
          {contact.name && (
            <p>
              {contact.name}
            </p>
          )}
          <button onClick={this.answerCall.bind(this)} type='button' style={{borderRadius: '22px', minWidth: '130px'}} className='btn btn-default btn-success'>
            <span style={{top: '2px'}} className='glyphicon glyphicon-earphone'></span>&nbsp;Accept
          </button>
          &nbsp;&nbsp;<button onClick={this.rejectCall.bind(this)} type='button' style={{borderRadius: '22px', minWidth: '130px'}} className='btn btn-default btn-danger'>
            <span style={{top: '2px'}} className='glyphicon glyphicon-remove'></span>&nbsp;Reject
          </button>
        </div>
      )
    } else if ('defunct' === mode) {
      return (
        <div style={{textAlign: 'center', fontSize: '160%'}}> 
          Defunct
          {/*
          <span className='fa-stack fa-lg'>
            <i className='fa fa-circle fa-stack-2x' style={{color: '#5cb85c'}} />
            <i className='fa fa-phone fa-stack-1x fa-inverse' />
          </span>
          */}
        </div>
      )
    } else {
      return (
        <div style={{textAlign: 'center'}}>
          {contact && (
            <div>
              <h4 style={{marginBottom: '3px'}}>
                {contact.number}
              </h4>
              <p>
                {contact.name}
              </p>
            </div>
          )}
          <button onClick={this.hangUpCall.bind(this)} type='button' style={{borderRadius: '22px', minWidth: '130px'}} className='btn btn-default btn-danger'>
            <span style={{top: '2px'}} className='glyphicon glyphicon-remove'></span>&nbsp;Hang up
          </button>
          {/*
          <span className='fa-stack fa-lg'>
            <i className='fa fa-circle fa-stack-2x' style={{color: '#337ab7'}} />
            <i className='fa fa-phone fa-stack-1x fa-inverse' />
          </span>
          <h4>
            {mode}
          </h4>
          */}
        </div>
      )
    }
  }
  renderIcon(mode) {
    if ('host' === mode) {
      return (
        <i className='material-icons'>mic</i>
      )
    } else if ('master' === mode) {
      return (
        <i className='material-icons'>radio</i>
      )
    } else if ('on_hold' === mode) {
      return (
        <i className='material-icons'>pause</i>
      )
    } else if ('ivr' === mode) {
      return (
        <i className='material-icons'>voicemail</i>
      )
    }
    return <span />
  }
  renderModeSwitch() {
    const modes = ['host', 'master', 'on_hold', 'ivr']
    const { channelId, client : { channels } } = this.props
    const chan = channels[channelId] || {mode: 'free'}
    return (
      <div>
      {chan.mode}
      <div className='btn-group btn-group-xs' role='group'>
        {modes.map((mode, i) => {
          return (
            <button 
              key       = {i}
              type      = 'button'
              className = {classNames('btn btn-default', { 'active' : chan.mode == mode })}
              onClick   = {() => { this.updateMode(mode) }}>
              {this.renderIcon(mode)}
              {mode}
            </button>
          )
        })}
      </div>
      </div>
    )
  }
  render() {
    const { channelId, number, contact, mode, level, muted } = this.props
    return (
      <div style={{background: '#fff', border: '1px solid #ddd', margin: '11px'}}>
        <div>
          <div style={{__border: '1px solid #ddd'}}> 
            <div style={{display: 'flex', padding: '8px'}}>
              <div style={{flex: 11, __border: '1px solid #ddd'}}>
                {channelId}&nbsp;{number}
              </div>
              <div style={{flex: 1, __border: '1px solid #ddd', textAlign: 'right'}}>
                00:00
              </div>
            </div>
          </div>
          <div style={{__border: '1px solid #ddd', padding: '8px'}}> 
            {this.renderChannelMode()}
          </div>
          {'defunct' !== mode && (
            <div>
              <div style={{__border: '1px solid #f00', display: 'flex', padding: '8px'}}> 
                <button className='btn btn-default btn-xs' onClick={this.toggleMuted.bind(this)} style={{marginTop: '6px'}}>
                  <i className={muted ? 'glyphicon glyphicon-volume-off' : 'glyphicon glyphicon-volume-up'} />
                </button>
                <div style={{__border: '1px solid #f00', flex: 6, padding: '6px 10px 0 16px'}}>
                  <Slider 
                    min          = {1}
                    max          = {100}
                    style        = {{width: '100%'}}
                    value        = {level}
                    defaultValue = {level}
                    onChange     = {(from, to) => this.updateLevel(to)}
                    disabled     = {!!muted} />
                </div>
                <div style={{__border: '1px solid #f00', padding: '6px 0 0 6px'}}>
                  {this.renderModeSwitch()}
                  <span style={{marginLeft: '10px'}}>
                    <Switch 
                      labelText = 'Auto-answer'
                      onText    = 'On'
                      offText   = 'Off'
                      size      = 'mini' />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Channel
