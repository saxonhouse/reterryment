import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading, Image, Text, Divider, ButtonCircle,
  Row, Column, Hide } from 'rebass';
import posed from "react-pose";
import styled from "styled-components";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser } from './reducer'
import { Redirect, Link, withRouter } from 'react-router-dom'
import './App.css';

const AvatarURLs = [
  {name: 'Theresa',
  url:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Pale'
  },
  {name: 'Terry',
  url:'https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Squint&eyebrowType=SadConcernedNatural&mouthType=Twinkle&skinColor=Light',
  },
  {name: 'Charlene',
  url: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Overall&clotheColor=Blue03&eyeType=Close&eyebrowType=Default&mouthType=Smile&skinColor=Black'
  },
  {name: 'Jim',
  url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Heather&eyeType=Squint&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Pale'
  },
  {name: 'Charlotte',
  url: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&clotheType=Overall&clotheColor=Gray01&eyeType=Happy&eyebrowType=SadConcernedNatural&mouthType=Smile&skinColor=Pale'
  },
  {name: 'Dave',
  url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Squint&eyebrowType=FlatNatural&mouthType=Smile&skinColor=Pale'
  },
  {name: 'Tom',
  url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Red&eyeType=EyeRoll&eyebrowType=UpDown&mouthType=Serious&skinColor=Pale'
  },
  {name: 'Edie',
  url: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale'
  },
]

const FlyIn = posed.div({
  out: {position: 'relative',
        left: -1000},
  in: { left: 0,
        transition: { duration: 500 }}
})

const FlyInRight = posed.div({
  out: {position: 'relative',
        right: -1000},
  in: { right: 0,
        transition: { duration: 500 }}
})

const avatarConfig = {
  out : {opacity: 0},
  in : {opacity: 0.8,
        y: 0,
          transition: { duration: 300 }},
  bounce: {position: 'relative',
          opacity: 1,
          y: 10,
          transition: {type: 'spring', sitffness: 700}}
}

const AnimAvatar = styled(posed.div(avatarConfig))`max-height: 120px`;

export const GradientHeading = styled(Heading)`
  background-image: linear-gradient(to bottom right, #66ccff 0%, #ff99ff 100%)`

class PosedAvatar extends Component {
  constructor(props) {
    super(props)
    this.state ={bounce: false}
    this.enter = this.enter.bind(this)
    this.leave = this.leave.bind(this)
  }

  enter() {
    this.setState({bounce: true})
  }

  leave() {
    this.setState({bounce: false})
  }

  render() {
    return(
      <Box width={[1/4, 1/8]} key={this.props.hall.name}>
        <Link to={`/author/${this.props.hall.name}`}>
          <AnimAvatar pose={this.state.bounce? 'bounce':'in'} onMouseEnter={this.enter} onMouseLeave={this.leave}>
            <Image src={this.props.hall.url} className="hall-avatar" />
          </AnimAvatar>
        </Link>
      </Box>
    )
  }
}

const Avatars = AvatarURLs.map((hall) => {
  return(
    <PosedAvatar hall={hall} />
  )
})

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    }
  }

  componentDidMount() {
    for (const hall of AvatarURLs) {
      if(hall.name === this.props.user) {
        this.setState({avatar: hall.url})
      }
    }
    this.setState({mounted: true})
  }


  render() {
    const newPost = this.props.newPost
    const titles = ['That\s Hall, Folks', 'News <span class="small-title">of the</span> Hall', 'Hall Aboard!', 'The Hall Report']
    const title = titles[Math.floor(Math.random()*titles.length)]
    return (
      <div>
        <Flex px={[0, 2, 5]} flexWrap='wrap' mb={3} alignItems='center'>
          {Avatars}
        </Flex>
        <Flex alignItems='center' mb={50}>
          <Box width={1/2}>
            <FlyIn>
              <Link to='/'>
                <GradientHeading
                  py={4}
                  px={2}
                  fontSize={[ 4, 6 ]}
                  className='center'
                  color='white'
                  >
                  <span dangerouslySetInnerHTML={{__html:title}} />
                </GradientHeading>
              </Link>
            </FlyIn>
          </Box>
          <Box width={1/2}>
            <FlyInRight>
              <Flex alignItems='center'>
                <Box width={[1/2, 1/3]} ml='auto'>
                  <Image px={3} src={this.state.avatar} />
                </Box>
                <Box width={[1/2, 2/3]} ml='auto'>
                <Text> Welcome back, {this.props.user}! </Text>
                <Divider />
                  <Flex flexWrap='wrap'>
                    <Box width={[1, 1/3]}>
                      <Link to='/new-post' >
                        <ButtonCircle mx={[0, 'auto']} pb={1} opacity={newPost ? 0.5 : 1}> New Post </ButtonCircle>
                      </Link>
                    </Box>
                    <Box width={[1, 1/3]}>
                      <Link to='/my-drafts' >
                        <ButtonCircle  mx={[0, 'auto']} pb={1} opacity={newPost ? 0.5 : 1}> My Drafts </ButtonCircle>
                      </Link>
                    </Box>
                    <Box width={[1, 1/3]}>
                      <Link to='/logout' >
                        <ButtonCircle  mx={[0, 'auto']} pb={1}> Logout </ButtonCircle>
                      </Link>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </FlyInRight>
          </Box>
        </Flex>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({setUser: setUser}, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
