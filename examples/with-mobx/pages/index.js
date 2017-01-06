import React from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import Clock from '../components/Clock'
import Link from 'next/link'

export default class Counter extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    return { lastUpdate: store.lastUpdate, isServer }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
  }

  componentDidMount () {
    this.store.start()
  }

  componentWillUnmount () {
    this.store.stop()
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
          <Clock />
          <Link href="/page2">Other Page</Link>
        </div>
      </Provider>
    )
  }
}
