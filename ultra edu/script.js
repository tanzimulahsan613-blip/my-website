// Default Admin
if(!localStorage.getItem("admin")){
localStorage.setItem("admin",JSON.stringify({
username:"admin",
password:"9999"
}));
}

// SIGNUP
function signup(){
let students=JSON.parse(localStorage.getItem("students"))||[];

if(students.length>=20){
alert("Maximum 20 Students Allowed!");
return;
}

let name=signName.value;
let user=signUser.value;
let pass=signPass.value;

if(!name||!user||!pass){
alert("Fill all fields!");
return;
}

students.push({
name:name,
username:user,
password:pass,
score:0,
attendance:0
});

localStorage.setItem("students",JSON.stringify(students));
alert("Signup Successful!");
showLogin();
}

// LOGIN
function login(){
let user=loginUser.value;
let pass=loginPass.value;

let admin=JSON.parse(localStorage.getItem("admin"));

if(user===admin.username && pass===admin.password){
loginBox.classList.add("hidden");
adminDash.classList.remove("hidden");
return;
}

let students=JSON.parse(localStorage.getItem("students"))||[];

let found=students.find(s=>s.username===user && s.password===pass);

if(found){
loginBox.classList.add("hidden");
studentDash.classList.remove("hidden");
studentDisplay.innerText=found.name;
localStorage.setItem("currentUser",user);
}else{
alert("Invalid Login!");
}
}

function showSignup(){
loginBox.classList.add("hidden");
signupBox.classList.remove("hidden");
}

function showLogin(){
signupBox.classList.add("hidden");
loginBox.classList.remove("hidden");
}

// STUDENT SECTION
function section(type){
let content=document.getElementById("studentContent");

// Profile
if(type==="profile"){
let students=JSON.parse(localStorage.getItem("students"));
let user=localStorage.getItem("currentUser");
let student=students.find(s=>s.username===user);

content.innerHTML=`
<h3>Profile</h3>
<p>Name: ${student.name}</p>
<p>Score: ${student.score}</p>
<p>Attendance: ${student.attendance}</p>
`;
}

// Class
if(type==="class"){
let classes=JSON.parse(localStorage.getItem("classes"))||[];
content.innerHTML="<h3>Classes</h3>";

if(classes.length===0){
content.innerHTML+="<p>No Classes Yet</p>";
}

classes.forEach(c=>{
content.innerHTML+=`
<p>${c.title}</p>
<a href="${c.link}" target="_blank"><button>Join Class</button></a>
`;
});
}

// LIVE CLASS (Zoom)
if(type==="live"){
let live=localStorage.getItem("liveLink");

content.innerHTML="<h3>Live Class (Zoom)</h3>";

if(!live){
content.innerHTML+="<p>No Live Class Available</p>";
}else{
content.innerHTML+=`
<a href="${live}" target="_blank">
<button>Join Live Zoom Class</button>
</a>
`;
}
}

// Attendance
if(type==="attendance"){
let students=JSON.parse(localStorage.getItem("students"));
let user=localStorage.getItem("currentUser");
let student=students.find(s=>s.username===user);

student.attendance+=1;
localStorage.setItem("students",JSON.stringify(students));

content.innerHTML=`<h3>Attendance Marked ✔</h3>
<p>Total: ${student.attendance}</p>`;
}

// Notice
if(type==="notice"){
let notices=JSON.parse(localStorage.getItem("notices"))||[];
content.innerHTML="<h3>Notice Board</h3>";

notices.forEach(n=>{
content.innerHTML+=`<p>📢 ${n}</p>`;
});
}

// Exam (Link Based)
if(type==="exam"){
let exam=localStorage.getItem("examLink");

content.innerHTML="<h3>Online Exam</h3>";

if(!exam){
content.innerHTML+="<p>No Exam Available</p>";
}else{
content.innerHTML+=`
<a href="${exam}" target="_blank">
<button>Join Exam</button>
</a>
`;
}
}

// Result
if(type==="result"){
let students=JSON.parse(localStorage.getItem("students"));
let user=localStorage.getItem("currentUser");
let student=students.find(s=>s.username===user);

content.innerHTML=`<h3>Total Score: ${student.score}</h3>`;
}
}

// ADMIN FUNCTIONS

function viewStudents(){
let students=JSON.parse(localStorage.getItem("students"))||[];
adminContent.innerHTML="<h3>All Students</h3>";

students.forEach((s,i)=>{
adminContent.innerHTML+=`
<p>${s.name} | Score:${s.score} | Attendance:${s.attendance}
<button onclick="deleteStudent(${i})">Delete</button>
</p>
`;
});
}

function deleteStudent(index){
let students=JSON.parse(localStorage.getItem("students"));
students.splice(index,1);
localStorage.setItem("students",JSON.stringify(students));
viewStudents();
}

// CLASS MANAGER
function classManager(){
adminContent.innerHTML=`
<h3>Manage Classes</h3>
<input type="text" id="classTitle" placeholder="Title">
<input type="text" id="classLink" placeholder="Link">
<button onclick="addClass()">Add</button>
`;
}

function addClass(){
let classes=JSON.parse(localStorage.getItem("classes"))||[];
classes.push({title:classTitle.value,link:classLink.value});
localStorage.setItem("classes",JSON.stringify(classes));
alert("Class Added!");
}

// LIVE MANAGER (Zoom)
function liveManager(){
adminContent.innerHTML=`
<h3>Manage Live Class (Zoom)</h3>
<input type="text" id="liveInput" placeholder="Paste Zoom Link">
<button onclick="saveLive()">Save</button>
`;
}

function saveLive(){
localStorage.setItem("liveLink",liveInput.value);
alert("Live Class Link Saved!");
}

// EXAM MANAGER
function examManager(){
adminContent.innerHTML=`
<h3>Manage Exam</h3>
<input type="text" id="examInput" placeholder="Paste Exam Link">
<button onclick="saveExam()">Save</button>
`;
}

function saveExam(){
localStorage.setItem("examLink",examInput.value);
alert("Exam Link Saved!");
}

// NOTICE MANAGER
function noticeManager(){
adminContent.innerHTML=`
<h3>Manage Notice</h3>
<input type="text" id="noticeText" placeholder="Write Notice">
<button onclick="addNotice()">Add</button>
`;
}

function addNotice(){
let notices=JSON.parse(localStorage.getItem("notices"))||[];
notices.push(noticeText.value);
localStorage.setItem("notices",JSON.stringify(notices));
alert("Notice Added!");
}

// Attendance Report
function viewAttendance(){
let students=JSON.parse(localStorage.getItem("students"))||[];
adminContent.innerHTML="<h3>Attendance Report</h3>";

students.forEach(s=>{
adminContent.innerHTML+=`
<p>${s.name} : ${s.attendance}</p>
`;
});
}

// RESET
function resetSystem(){
localStorage.clear();
alert("System Reset!");
location.reload();
}

function logout(){
location.reload();
}
// Show loader
function showLoader(){
    document.getElementById("loader").style.visibility = "visible";
}

// Hide loader
function hideLoader(){
    document.getElementById("loader").style.visibility = "hidden";
}

