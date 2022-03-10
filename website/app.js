

// zip code from user we will store here
let zipcode ='';
let feeling = '';

// Personal API Key for OpenWeatherMap API
const apiKey = `&appid=ae3639cc06f9aa429c407f880dbcb52f&units=metric`
const infoUrl = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString() //d.getMonth()+1 +'.'+ d.getDate()+1'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element(btn generate)
document.getElementById('generate').addEventListener('click', async  function(){
    zipcode = document.getElementById('zip').value;
    //console.log(zipcode)
    if(zipcode ===''){alert('please insert usa zipcode')}
    else{
    feeling = document.getElementById('feelings').value;
    const apiurl = infoUrl+zipcode+apiKey;
    getApiData(apiurl).then(function(data){
        if(data){ // if data = null it will return false
           const temp = data['main'].temp;// we can use data.main.temp
           const projectData = {
               date :newDate,
               temp : temp,// we can use only temp if we use destructer
               feeling, // = felling : felling
           };
           console.log(`the data return from api `)
           console.log(projectData)
           try {
                postData(`/adduserdata`, projectData);
                updatecontrols();
            }
            catch (error) {
                console.log("Error",error)
            }  
        }else{
            alert('there is no Data for this zipcode')
        }
    })
}
}) 
/* Function to Get data from api*/
 const getApiData = async function(url){
    try {
        const apidata = await fetch(url)
        const data = await apidata.json()
        return data
      } catch (error) {
          console.log("Error from getApiData funtion" , error)
      }
}
/* Function to POST data to server*/
const postData = async function(url='' ,data = {}){ // default param
    const res = await fetch(url,{
        method:"POST",
        credentials: "same-origin",
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify(data)
    })
    try {
        
        const info = await res.json();
        console.log("the data that go to server")
        console.log(info)
        return info;
    } catch (error) {
        console.log(error)
    }
}
/* Function to GET Project Data from server to ui controls */
const updatecontrols = async ()=>{
    try {
        const datareq = await fetch('/allinfo')
        const projectData = await datareq.json()
        console.log("the data from server and read in updateControl ")
        console.log(projectData)
        document.getElementById('date').innerHTML = `the date is :${projectData.date}`;
        document.getElementById('temp').innerHTML = `the temp is ${projectData.temp} C`;
        document.getElementById('content').innerHTML = `you feel like ${projectData.feeling}`;
    } catch (error) {
        console.log("error")
    }
}