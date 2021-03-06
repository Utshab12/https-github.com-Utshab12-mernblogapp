import React, {Component} from 'react'
import axios from 'axios'
import Blog from './Blog'
import Navbar from './Navbar'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input,Row, Col, FormText } from 'reactstrap';

class EditBlog extends Component {

  constructor(props){
    super();
    this.state = {
      path : "http://localhost:5000",
      blogs : [],
      image : '',
      blog : props.match.params.id
    }
  }
  
  changePic = (e) =>{
    
    const file = e.target.files
    if(file.length > 0){
      var reader = new FileReader()
      reader.onload = function (e) {
        // document.getElementById('editImg').setAttribute('src',e.target.result)
    }
    }
    reader.readAsDataURL(file[0])
    this.setState({
      image : e.target.files[0]
    }) 
  }
 
  editblog = (val)=>{
    alert(this.state.blog)
    let bloggy = {
      content: document.getElementById("content").value,
      title : document.getElementById("title").value,
      image: this.state.image
    }
    console.log(bloggy)
    let formdata = new FormData()
  
      formdata.append('content', bloggy.content)
      formdata.append('title', bloggy.title)
    if(bloggy.image !== ""){
      formdata.append('image', bloggy.image)
    }
    axios.patch(`http://localhost:5000/user/blog/edit/${this.state.blog}`,formdata,
    {
        headers: {
            'Authorization': localStorage.getItem("token"),
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((res)=>{
      console.log(res)
    })

    // window.location.reload(false);
  }
  render(){
        if(!localStorage.getItem("token")){
          return <Redirect to = '/login' />
        }
    return(

            <React.Fragment>
              <Navbar />
            
              <Row style={{marginTop:"30px" }}>
              <Col sm ={2}></Col>
              <Col sm ={8} >

              <Form>
                <h1>Edit Your Blog</h1>
              
                <Input type="file" name="file" id="image"
                
                onChange = { (e)=>this.changePic(e)} 
                />
                <Label>Title</Label>
                <Input
                type="text" placeholder="Enter your blog title"  name="title" 
                id = "title" 
                />

                <Label>Write your blog</Label>
                <Input
                type="textarea" placeholder="Enter your blog title"  name="content"
                id = "content" 
                />
               <Button color="primary" onClick={ (e)=>{this.editblog(e)}} >Edit and publish</Button>
              </Form>
              </Col>
              </Row>
            </React.Fragment>
            
          )        
          
  }
  
}

export default EditBlog