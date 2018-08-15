import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading, Image, Text, Divider, ButtonCircle } from 'rebass';
import { Avatar } from 'avataaars';
import posed from "react-pose";
import styled from "styled-components";
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

const staggerConfig = {
  'out' : {},
  'in' : {staggerChildren: 100}
}

const FlyIn = posed.div({
  'out': {position: 'relative',
        left: -1000},
  'in': { left: 0,
        transition: { duration: 500 }}
})

const FlyInRight = posed.div({
  'out': {position: 'relative',
        right: -1000},
  'in': { right: 0,
        transition: { duration: 500 }}
})

const avatarConfig = {
  'out' : {opacity: 0},
  'in' : {opacity: 0.8,
          transition: { duration: 300 }}
}

const Header = posed.div(staggerConfig);
const AnimAvatar = styled(posed.div(avatarConfig))`max-height: 120px`;

const GradientHeading = styled(Heading)`
  background-image: linear-gradient(to bottom right, #66ccff 0%, #ff99ff 100%)`

const Avatars = AvatarURLs.map((hall) => {
  return(
    <Box width={[1/4, 1/8]} key={hall.name}>
      <AnimAvatar>
        <Image src={hall.url} className="hall-avatar" />
      </AnimAvatar>
    </Box>
  )
})

export class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      hall: 'Theresa',
    }
  }

  componentDidMount() {
    this.setState({mounted: true})
    for (const hall of AvatarURLs) {
      if(hall.name == this.state.hall) {
        this.setState({avatar: hall.url})
      }
    }
  }

  render() {
    const title = "The Hall Report";
    return (
      <Header pose={this.state.mounted ? 'in' : 'out'}>
        <Flex px={[0, 2, 5]} flexWrap='wrap' mb={3} alignItems='center'>
          {Avatars}
        </Flex>
        <Flex alignItems='center' mb={50}>
          <Box width={1/2}>
            <FlyIn>
              <GradientHeading
                py={4}
                px={2}
                fontSize={[ 5, 6 ]}
                color='white'
                >
                <p className='title'>{title}</p>
              </GradientHeading>
            </FlyIn>
          </Box>
          <Box width={1/2}>
            <FlyInRight>
              <Flex alignItems='center'>
                <Box width={[1/2, 1/3]} ml='auto'>
                  <Image px={3} src={this.state.avatar} />
                </Box>
                <Box width={[1/2, 2/3]} ml='auto'>
                  <Text> Welcome back, {this.state.hall}! </Text>
                  <Divider />
                  <ButtonCircle> New Blog Post </ButtonCircle>
                </Box>
              </Flex>
            </FlyInRight>
          </Box>
        </Flex>
      </Header>
    )
  }
}
