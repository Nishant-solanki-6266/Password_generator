import react, { useState,useCallback, useEffect,useRef } from 'react'


function App() {
 const[length,setLength]=useState(8);
 const[numberAllowed,setnumberAllowed]=useState(false);
 const[charAllowed,setcharAllowed]=useState(false);
 const[password,setpassword]=useState("");
//  useREF hook dekho re

const passwordRef=useRef(null);

 const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUvWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) 
  {str+="0123456789"}
  
  if (charAllowed) 
  {str+="!@#$%^&*()_-+=<>?/{}[]|" }

  for (let i = 0; i <length; i++) {
    let char=Math.floor(Math.random()*str.length)
    
    console.log(char);
    pass+=str.charAt(char)
    console.log(pass);
  }
  setpassword(pass)




 },[length,numberAllowed,charAllowed])

 const copyPasswordToClibBoard=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.current?.setSelectionRange(0,999)
  window.navigator.clipboard.writeText(password)
 },[password])
 
 useEffect(()=>{
  passwordGenerator();
 },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4    py-3 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type='text'ref={passwordRef} value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly  />
      <button onClick={copyPasswordToClibBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className=' flex items-center gap-x-1'>
        <input type='range' name='' id='' value={length} min={6} max={100} className='cursor-pouneter' onChange={(e)=>{setLength(e.target.value)}}/>
      <label>Lenght{length}</label>
    </div>

    <div className='flex item-center gap-x-1'>
      <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setnumberAllowed((prev)=>!prev)}}/> 
     {/* prev phle (true ) hoga to (false) ho jayega (false hoga) to (true) ho jayega  */}
     <label>Numbers</label>
      </div>
 <div className='flex item-center gap-x-1'>
      <input type='checkbox' defaultChecked={charAllowed} id='characterInput' onChange={()=>{setcharAllowed((prev)=>!prev)}}/> 
     {/* prev phle (true ) hoga to (false) ho jayega (false hoga) to (true) ho jayega  */}
     <label htmlFor='CharacterInput'>Characters</label> </div>

    </div>
   </div>
 
   </>   
  );
}

export default App;
// usecollback ka use jb hota phli video dekha to bola ki jb hmare pas koi (parent componet) or (child component) me props pass kiya koi value ya function to .parent componet ka function coll hota to child component bhi render ho rha tha automatick (collback se nhi hua) ak counter ka exapmle dekha tha mene
// useEffect ka use jb hota hai jb phli bt to vo automatic coll hota hai or hone ke bad ydi depedency me value de di to change ke sath dubble coll hota hai changes ke liye useEffect ka use kiya hmne