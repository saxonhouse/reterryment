import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading } from 'rebass';
import { AppHeader } from './AppHeader';
import { injectGlobal } from 'styled-components'

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`

class App extends Component {

  render() {
    return (
      <Provider>
      <div className="App">
        <Container
          
        >
        <AppHeader />
        <div>
          {this.props.children}
        </div>
      </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
