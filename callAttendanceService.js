async function callAttendanceWS(url,method,sentData ={}){
    let data;
    if(method == "selectall"||method =="select"){
        let response = await fetch(url,{method: 'GET'});
        data = await response.json();
    }
    else if(method=="update"){
        let aMethod;
        aMethod="PUT";
        let response = await fetch(url,{
            method: aMethod,
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify(sentData),
        });
        //data = await response.json();
        data = await response.json();
    }
    return data;
}
let stu_id,fname,lname;
let stu_idTxtRef = document.querySelector("#txtStuID");
let fnameTxtRef = document.querySelector("#fname");
let lnameTxtRef = document.querySelector("#lname");
let present= false;

function clearInput(){
    stu_idTxtRef.value="";
    fnameTxtRef.value="";
    lnameTxtRef.value="";
}
let selectBtnRef = document.querySelector("#select");
let selectallBtnRef = document.querySelector("#selectall");
let updateBtnRef = document.querySelector("#check");

updateBtnRef.addEventListener("click",()=>{
    present=true;
    let student_data={
        "student_info" : {
            "StudentID" : stu_idTxtRef.value,
            "Firstname" :fnameTxtRef.value,
            "Lastname" : lnameTxtRef.value,
            "Present" : present,
        },
    };
    callAttendanceWS("http://localhost:3030/index","update",student_data).then((data)=>{
            console.log(data);
            if(data.data>0){
                stu_idTxtRef.value = data.data.StudentID;
                data.data.Present=present;
                alert(data.message);
                let output;
                output = "<h3>Successfully Checking Attendance</h3>";
               
                let out=document.getElementById("output");
                out.innerHTML=output;
                clearInput();
            }
            
        }
    );
});


selectBtnRef.addEventListener("click",()=>{
    stu_id=stu_idTxtRef.value;
    callAttendanceWS("http://localhost:3030/index/"+stu_id,"select").then((data) =>{
            console.log(data);
            if(data){
                stu_idTxtRef.value = data.data.StudentID;
                present = data.data.Present;
                alert(data.message);
                let output;
                output = "<h1>Student List</h1>";
                output += "<table class='table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>#</th><th scope='col'>First name</th><th scope='col'>Last name</th><th scope='col'>Present</th>";
                output += "</th>";
                output += "</thead>";
                output += "<tbody>";
              
                output +="<tr>";
                output += "<td>"+data.data.StudentID + "</td>";
                output += "<td>"+data.data.Firstname + "</td>";
                output += "<td>"+data.data.Lastname + "</td>";
                output += "<td>"+data.data.Present + "</td>";
                output +="</tr>";
                
                output +="</tbody>";
                output +="</table>";
                let out=document.getElementById("output");
                out.innerHTML=output;
                clearInput();
            }
        }
    )
});
selectallBtnRef.addEventListener("click",()=>{
    stu_id=stu_idTxtRef.value;
    callAttendanceWS("http://localhost:3030/index","selectall").then((data) =>{
            console.log(data);
            if(data){
                alert(data.message);
                let output;
                output = "<h1>Student List</h1>";
                output += "<table class='table'>";
                output += "<thead>";
                output += "<tr>";
                output += "<th scope='col'>#</th><th scope='col'>First name</th><th scope='col'>Last name</th><th scope='col'>Present</th>";
                output += "</th>";
                output += "</thead>";
                output += "<tbody>";
                data.data.forEach((element)=>{
                    output +="<tr>";
                    output += "<td>"+element.StudentID + "</td>";
                    output += "<td>"+element.Firstname + "</td>";
                    output += "<td>"+element.Lastname + "</td>";
                    output += "<td>"+element.Present + "</td>";
                    output +="</tr>";
                });
                output +="</tbody>";
                output +="</table>";
                let out=document.getElementById("output");
                out.innerHTML=output;
                clearInput();
            }
        }
    )
});
