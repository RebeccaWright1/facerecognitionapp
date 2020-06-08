import React, {Component} from 'react';
import Particles from 'react-particles-js';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/navigation/navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import './App.css';



const particlesOptions= {
  particles: {
    number:{
      value: 90,
      density:{
        enabled:true,
        value_area: 800
      }
    }
  }
}

const initialState={
      input:'',
      imageURL:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name: '',
        email: '',
        entries:0,
        joined: ''
      }
    }
class App extends Component {
  constructor(){
    super();
    this.state= initialState
  }
  
  loadUser=(data)=>{
    this.setState({user:{
          id:data.ID,
          name: data.Name,
          email: data.Email,
          entries:data.Entries,
          joined: data.Joined
    }});
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width= Number(image.width);
    const height = Number(image.height);

    return{
      leftCol:clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row * height,
      rightCol: width-(clarifaiFace.right_col * width),
      bottomRow: height-(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox =(box)=>{
    this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  onRouteChange=(route)=>{
   if(route==='signout'){
    this.setState(initialState);
   }else if (route==='home'){
    this.setState({isSignedIn:true});
   }
   this.setState({route:route});

  }


onButtonSubmit=()=>{
  this.setState({imageURL: this.state.input});
   fetch('http://localhost:3000/imageURL', {
    method:'post',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({
      input:this.state.input
    })
  })
  .then(response => response.json())
  .then( response=> {
    if(response){
      console.log(this.state.user)
      fetch('http://localhost:3000/image', {
        method:'put',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          id:this.state.user.id
        })
      }).then(response=>response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user, {entries:count}))
      }).catch(console.log)
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err=>console.log(err));
}

  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
      return (
        <div className="App">
          <Particles className='particles'
                params={particlesOptions}
              />
         <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
         {
            (route==='home') ?
              <div>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box={box} imageURL={imageURL}/>
              </div>
              :(route==='signin'?
                <SignIn onRouteChange= {this.onRouteChange} loadUser={this.loadUser}/>
                :
                <Register onRouteChange= {this.onRouteChange} loadUser={this.loadUser}/>
                )   
           }
        </div>
      );
  }

}

export default App;
