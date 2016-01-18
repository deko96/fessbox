import React   from 'react'
import moment  from 'moment'

import { removeInboxMessage }
  from '../js/actions'

class Inbox extends React.Component {
  constructor(props) {
    super(props)
  }
  formatDate(date) {
    return moment(date).fromNow()
  }
  deleteMessage(id) {
    const { dispatch } = this.props
    dispatch(removeInboxMessage(id))
  }
  getNotifications() {
    const { notifications } = this.props
    return Object.keys(notifications).map(msgId => {
      return {
        ...notifications[msgId],
        _id : msgId
      }
    }).sort((a, b) => {
      return (b.timestamp - a.timestamp)
    })
  }
  render() {
    const { notifications } = this.props
    return (
      <div>
        {!!notifications && !!Object.keys(notifications).length && (
          <div style={styles.inbox}>
            <table className='table' style={styles.table}>
              <colgroup>
                <col width='10%' />
                <col width='20%' />
                <col width='15%' />
                <col width='45%' />
                <col width='10%' />
              </colgroup>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Sender</th>
                  <th>Content</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.getNotifications().map(item => (
                  <tr key={item._id}>
                    <td>{item.type}</td>
                    <td>{this.formatDate(item.timestamp)}</td>
                    <td>{item.source}</td>
                    <td>{item.content}</td>
                    <td>
                      <button onClick={() => this.deleteMessage(item._id)}>Delete message</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

const styles = {
  inbox : {
    position   : 'fixed',
    zIndex     : 3,
    bottom     : 0,
    border     : '1px solid #888',
    width      : '70%',
    maxHeight  : '200px',
    overflowY  : 'scroll',
    background : '#ffffff'
  },
  table : {
    width      : '100%'
  },
}

export default Inbox
