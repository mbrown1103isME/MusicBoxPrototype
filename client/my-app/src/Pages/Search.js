import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
// import Dropdown from '../Components/Dropdown';
import DisplayError from '../Components/DisplayAlert';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarComp from '../Components/Navbar';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './pagesStyle.css';
import { Link } from 'react-router-dom';
import DisplayAlert from '../Components/DisplayAlert';
import { AuthContext } from '../context/AuthContext';
import profileicon from "../img/profileicon.png"

const client_ID = "7372f3a366214005a13abdb59ca29269";
const client_Secret = "2ff68ae7cdb5419d9a9e963a41ec86dc";
// const client_ID = process.env.client_ID;
// const client_Secret = process.env.client_secret;

const Search = ()=>{
  const [userSearch,setUserSearch] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [accessToken,setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [dropdownChoice, setDropDownChoice] = useState("Artists");
  const [selectedValue, setSelectedValue] = useState('Search by...');
  const user = useContext(AuthContext)
  const [users,setUsers] = useState([])
  const [username, setUsername] = useState("")
  const [error,setError] = useState(
    {
      status: "none",
      errorType: "",
      message: ""
    }
  )
    //Deletes error messages as usre searches new term
    useEffect(()=>{
      setError( {
        status: "none",
        errorType: "",
        message: ""
      })
    },[albums,users])

  useEffect(()=>{
    console.log(user)

    setTimeout(()=>{
      if(!localStorage.getItem("user")){
        console.log(user.user)
        setUsername("")
      }else{
        setUsername(user.user.username)
      }
    },2000)

    // console.log(client_Secret);
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_ID + ':' + client_Secret)
      },
      body: 'grant_type=client_credentials'
    }
    fetch('https://accounts.spotify.com/api/token',authParams)
    .then(result=>result.json())
    .then(data => setAccessToken(data.access_token))
    .catch(err => {
      console.log(err)
    });

  }, []);

  function DropDown(){
    return(
        <div>
        <Form.Select aria-label="Default select example" value={selectedValue} onChange={e => {
            setDropDownChoice(e.target.value)
            setSelectedValue(e.target.value);
            }}>
            <option value="Artists">Artists</option>
            <option value="Albums">Albums</option>
            <option value="Users">Users</option>
        </Form.Select>
    </div>
    )
  }

  function deleteDuplicates(){
    //Deal with this later
    if(dropdownChoice==1){
      var deleteKeywords = {
        key1: " (Edited Version)",
        key2: " (Edited)",
        key3: " (Deluxe Edition)",
        key4: " (Deluxe)"
      }
      for(var i=0; i<albums.length;i++){
        if(i+1 < albums.length){
          if((albums[i].name===albums[i+1].name) || (albums[i + 1].name===albums[i].name + " (Edited Version)")){
            albums[i+1].name = "dup";
          }else{
            // console.log("Nope!");
          }
        }else{

        }
      }
    }else{

    }
  }

  async function search(){
    console.log("searched for: " + searchInput);
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    if(dropdownChoice==="Artists"){
      var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',searchParameters)
      .then(result=> {
        if(result.ok){
          return result.json()
        }else{
          throw new Error("Status not ok");
        }
      })
      .then(data => {
        return data.artists.items[0].id
      })
      .catch(err => {
        console.log(err)
      })

      console.log("Artist ID is " + artistID);

      var albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50',searchParameters)
      .then(result => {
        if(result.ok){
          return result.json()
        }else{
          throw new Error("Artist does not exist");
      }})
      .then(data => {
        console.log(data.items);
        if(data.items.length===0){
          throw new Error("Does not exist");
        }else{
          users.length = 0
          setAlbums(data.items);
        }
      })
      .catch(err => {
        setError({
          status: "danger",
          errorType: "Not Found",
          message: "Artist does not exist."
        })
        error.errorType = "Not Found";
        error.status = "danger";
        error.
        console.log(err) 

      })
    }else if(dropdownChoice==="Albums"){
      var album = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album&limit=4',searchParameters)
      .then(result => {
        if(result.ok){
          return result.json()
        }else{
          throw new Error("Artist does not exist");
      }})
      .then(data => {
        console.log(data.albums.items[0])
        if(data.albums.items.length===0){
          throw new Error("Album does not exist")
        }else{
          const albumName = data.albums.items[0].name;
          const lowercaseAlbum =  albumName.toLowerCase();
          const lowercaseSearch =  searchInput.toLowerCase();
          if(lowercaseAlbum.includes(lowercaseSearch)){
            users.length = 0
            setAlbums(data.albums.items);
          }else{
            users.length = 0
            setAlbums(data.albums.items);
            setError({
              status: "warning",
              errorType: "Search input Album mismatch",
              message: "Are you sure this is the album you searched?"
            })
          }
        }
      })
      .catch(err => {
        console.log(albums)
        if(albums.length!=0){
          albums.length = 0;
        }
        setError({
          status: "danger",
          errorType: "Not Found",
          message: "Album does not exist."
        })
        console.log(err) 
      })
    }
    else if(dropdownChoice === "Users"){
      console.log(albums)
      setAlbums([])
      try{
        console.log(searchInput)
        const usersS = await axios.get(`http://localhost:4000/api/users/${searchInput}`);
        console.log(usersS)
        if(usersS.data.length===0){
          throw new Error("User not found")
        }
        await setError({
          status: "success",
          errorType: "",
          message: "User found!"
        })
        setUsers(usersS.data)
        return await users
      }catch(err){
        console.log(err)
        setError({
          status: "danger",
          errorType: "Not Found",
          message: "User does not exist. Try again"
        })
      }
    }
  }
  

  return (
    <div>
    <NavbarComp />
    <div className="App" id="mainContent">
      <Container id="searchBar">
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholders="Search For Artist"
            type="input"
            onKeyPress={event =>{
              if(event.key == "Enter"){
                search()
              }
            }}
            onChange={event=> setSearchInput(event.target.value)}
          />
          <Button onClick={()=>{
          search()
          setError({

          })
          }}>
            Search
            </Button>
        </InputGroup>
        <DisplayAlert status={error.status} type={error.errorType} mes = {error.message}/>
        <DropDown/>
      </Container>
      <div id="content">
        <h3>Search results</h3>
        <hr/>
      </div>
      <div id="albumRows">
            <hr/>
      </div>
   
      <Container>
        <Row className="mx-2 row row-cols-4">
          {deleteDuplicates()}
          {albums.map( (album, i) => {
            if(album.name!=="dup"){
              const urlLink = "/albumpage/" + album.name
              return(
                <Link className="text-decoration-none"  to={urlLink}>
                <Card id='card' >
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
                </Link>
              )                        
            }else{
            //   console.log("Duplicate!");
            }
          })}
          {users.map((user,i)=>{
            const userLink = "/profile/" + user.username 
            return(
              <Link className="text-decoration-none"  to={userLink}>
                <Card id='card' >
                  <Card.Img src={profileicon}  alt="usericon"/>
                  <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                  </Card.Body>
                </Card>
                </Link>
            )
          })

          }
        </Row>
      </Container>
    </div>
    </div>
  );
}
export default Search;