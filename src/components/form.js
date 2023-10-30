
import '../styles/form.css';
import React, { useState, useEffect } from 'react';

function Form() {

    const[name,setname] = useState('')
    const[surnmae,setsurnmae] = useState('')
    const[email,setemail] = useState('')
    const[phone,setphone] = useState('')
    const[position,setposition] = useState('')
    const[id,setID] = useState('')
    const[image,setimage] = useState('')
    const [storedData, setStoredData] = useState([])
    const [avatar, setAvatar] = useState([])
    
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        setStoredData(storedCourses);
      }, []);

      useEffect(() => {
        const results = storedData.filter((data) =>
          data._Employee_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
      }, [searchQuery, storedData]);

    function saveLanguage(){

    //   var courses=JSON.parse(localStorage.getItem('courses') || '[]')

      const course={
        _Employee_name  : name,
        _Employee_surnmae: surnmae,
        _Employee_email: email,
        _Employee_phone: phone,
        _Employee_position: position,
        _Employee_ID: id,
        _Employee_image: image,
        _Employee_avatar: avatar,
      }
      let updatedData;
      if (selectedIndex === -1) {
        updatedData = [...storedData, course]; // Add new employee data
      } else {
        updatedData = storedData.map((data, index) => (index === selectedIndex ? course : data)); // Replace edited employee data
      }
    
      localStorage.setItem('courses', JSON.stringify(updatedData));
      setStoredData(updatedData);
      setSelectedIndex(-1);

          // Reset input fields after saving
    setname('');
    setsurnmae('');
    setemail('');
    setphone('');
    setposition('');
    setID('');
    setimage('');
    setAvatar('');

    }


    function removeEmployee(index) {
        const updatedData = storedData.filter((_, i) => i !== index);
        localStorage.setItem('courses', JSON.stringify(updatedData));
        setStoredData(updatedData);
      }

   
      function editEmployee(index) {
        const selectedEmployee = storedData[index];
        setname(selectedEmployee._Employee_name);
        setsurnmae(selectedEmployee._Employee_surname);
        setemail(selectedEmployee._Employee_email);
        setphone(selectedEmployee._Employee_phone);
        setposition(selectedEmployee._Employee_position);
        setID(selectedEmployee._Employee_ID);
        setimage(selectedEmployee._Employee_image);
        setAvatar(selectedEmployee._Employee_avatar);
        setSelectedIndex(index);
      }

      


      return (
        <div className="App">
        <div className='Mainpage'>
            <div className='topnavbar'>Employee APP</div>
                <div className='maincontainer'>
        <div className='leftside'>
            
            <div className='leftbar_content'>
            <div className='search'>
            <div className='search_content'>
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='search_content1' />
            </div>
            </div>



                <div className='formcontent'>
                
                    <input type='text' placeholder='Name' value={name} onChange={(e)=>{setname(e.target.value)}} className='input1'/> <br/><br/>
                    <input type='text' placeholder='Surname' value={surnmae} onChange={(e)=>{setsurnmae(e.target.value)}} className='input1'/> <br/><br/>
                    <input type='text' placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}} className='input1'/> <br/><br/>
                    <input type='text' placeholder='Phone Number' value={phone} onChange={(e)=>{setphone(e.target.value)}} className='input1'/> <br/><br/>
                    <input type='text' placeholder='Position' value={position} onChange={(e)=>{setposition(e.target.value)}} className='input1'/> <br/><br/>
                    <input type='text' placeholder='ID' value={id} onChange={(e)=>{setID(e.target.value)}} className='input1'/> <br/><br/>
                    <input type='file' name='image' accept='image/*' value={image} onChange={(e)=>{setimage(e.target.value)}} className='input2'/> <br/><br/>

                    <button onClick={saveLanguage} className='button1'>{selectedIndex === -1 ? 'Save' : 'Update' }</button>
        
                
                </div>
            </div>
            </div>

        <div className='rightside'>
        
                    <h2 className='Saved_Data'>Saved Employee Data:</h2>
                    <ul>
                {searchResults.map((course, index) => (
                    <li key={index}>
                    <div className="employee-info">
                    {course._Employee_image && (
                        <div className="avatar">
                        <img src={course._Employee_image} />
                        </div>
                    )}
                    <div>
                        Name :  {course._Employee_name} <br/> 
                        Surname :  {course._Employee_setsurnmae} <br/>
                        Email :  {course._Employee_email} <br/> 
                        Phone :  {course._Employee_phone}<br/>
                        Position:  {course._Employee_position}<br/> 
                        ID:  {course._Employee_ID}<br/>
                    </div>
                    </div>
                    <div>
                    <button onClick={() => removeEmployee(index)} className='button2'>Remove</button>
                    <button onClick={() => editEmployee(index)} className='button3'>Edit</button><br/><br/>
                    </div>
                </li>
                ))}
            </ul>

        </div>    

            
        </div> 
        </div>   
        </div>
    );
}

export default Form;
