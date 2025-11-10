
import {useState,useRef, useEffect} from 'react'
import {BiErrorCircle, BiMouse } from 'react-icons/bi'


export default function Senscal() {

interface gameFields {
    game1:string 
    game2:string 
}

interface emptyFields {
  sens: boolean,
  fdpi:boolean,
  tdpi:boolean
}

const inputRef = ({
  fromGame:useRef(null),
  toGame:useRef(null),
  sens:useRef(null),
  fDpi:useRef(null),
  tDpi:useRef(null)
})




const [emptyFields, setEmptyFields] = useState<emptyFields>({sens:false, fdpi: false, tdpi: false})
const [finalSens, setFinalSens] = useState<number>(0)

const [sens,setSens] = useState<{sens:any | number | string, fdpi: any | number | string, tdpi: any | number | string}>({sens:'', fdpi: '', tdpi: ''})
const [field,setField] = useState<gameFields>({game1:'', game2:''})

useEffect(() => {
handleSens('sens', sens.sens, field.game1, field.game2)
handleSens('fdpi', sens.fdpi, field.game1, field.game2)
handleSens('tdpi', sens.tdpi, field.game1, field.game2)

}, [field.game1, field.game2])

const handleFields = (field:string, value:string) => {
setField(prev => ({...prev, [field]: value}))

}

const handleSens = (category: string | number , value: number | string, gameName:string, fieldGame2:string) => {
if(value === '') {
setSens(prev => ({ ...prev, [category]: '' }));
setFinalSens(0)
return;
}

else {
  setEmptyFields(prev => ({...prev, [category]:!true }))
}

const numValue = Number(value)
const temp: {tempSens: {[key:string]:number | any}, tempGame: {game1:string,game2:string}} =   {
   tempSens: {...sens, [category]:numValue},
   tempGame: {...field, game1: gameName, game2:fieldGame2}
}

const games: {[key:string]: {name:string,multiplier:number}[]} = 
{'Counter Strike 2':[{name:'Counter Strike 2', multiplier:1},{name:'Valorant', multiplier:0.314}, {name:'Overwatch', multiplier:3.333},{name: "Marvel Rivals",multiplier: 0.29}],
  'Valorant':[{name:'Valorant', multiplier:1}, {name:'Counter Strike 2', multiplier:3.18}, {name:'Overwatch', multiplier:10.60} ,{name: "Marvel Rivals", multiplier:4}],
  'Overwatch': [{name:'Overwatch', multiplier:1},{name:'Counter Strike 2', multiplier:3.333}, {name:'Valorant', multiplier:0.094349} ,  {name: "Marvel Rivals", multiplier:0.375}], 
  'Marvel Rivals': [{name:'Marvel Rivals', multiplier:1}, {name:'Counter Strike 2', multiplier:0.3}, {name:'Valorant', multiplier:0.4} , {name: "Overwatch", multiplier:0.375}]}

  const selectedGame = games[temp.tempGame.game1]?.find((game) => game.name === temp.tempGame.game2)

if (temp.tempSens.sens && temp.tempSens.fdpi && temp.tempSens.tdpi && temp.tempSens.tdpi !== 0 && selectedGame) {
const sensForGame = (temp.tempSens.sens * temp.tempSens.fdpi * selectedGame.multiplier) / temp.tempSens.tdpi;
setFinalSens(Number(sensForGame.toFixed(3)))

}

setSens(prev => ({...prev, [category]:numValue}));


}


const Reset = () => {
  setSens(prev => ({...prev, sens: '', fdpi: '', tdpi: ''}))
  setField(prev => ({...prev, game1: '', game2:''}))
  setEmptyFields(prev => ({...prev, sens:false, fdpi:false,tdpi:false}))
  setFinalSens(0)
}

const InputBlur = (category:string, value:string) => {
if(value === '')
  setEmptyFields(prev => ({...prev, [category]:true }))

}


return (
<>
<div className='flex flex-col items-center justify-center mx-auto my-10 overflow-auto transition-all ease-in-out duration-200'>
  <h1 className='text-transparent font-bold mb-10 text-3xl subpixel-antialiased bg-linear-to-b bg-clip-text from-[#393E46] to-[#222831] 
  flex flex-col gap-3 items-center'>Sensitivity Converter <BiMouse className=' text-blue-400 h-7 w-7'></BiMouse></h1>
  <p className='mb-5 text-base sm:text-xl'>Use this Calculator / Converter to convert your sensitivites from your favourite shooters.</p>
  
<div className='p-5 rounded-2xl w-full max-w-3xl border-2 border-gray-900'>
<div className="flex flex-col md:items-start md:flex-row justify-center items-center gap-10 text-white p-10">
  <div className="relative mb-2">
    <select
      className={`bg-linear-to-tr from-[#FEFCF3] to-[#F5EBE0] border p-2 rounded-2xl min-w-71 font-medium text-[1.2rem] min-h-20 
        ${field.game1 === 'Select A Game' ? "text-gray-400" : "text-gray-600"}`}
      value={field.game1}
      ref = {inputRef.fromGame}
      onChange={(e) => handleFields("game1", e.target.value)}
      id="game1"
      required
    >
      {["Select A Game","Counter Strike 2","Valorant","Overwatch","Marvel Rivals"].map((item, index) => (
        <option key={index} value={item} className={`${item === 'Select A Game' ? "text-[#333333]" : "text-[#333333]"}`}>
          {item}
        </option>
      ))}
    </select>
    <label
      htmlFor="game1"
      className={`absolute left-3 text-black transition-all duration-200 
      text-base md:text-[0.9rem] font-medium
      top-1
      peer-focus: peer-focus:text-sm peer-focus:text-gray-600
      ${field.game1 && field.game1 !== "Select A Game" ? "-top-2.5 text-gray-400" : "text-[#33333362]"}`} >
      Convert From
    </label>
  </div>

  <div className="relative mb-2">
    <select
      className={`bg-linear-to-tr from-[#FEFCF3] to-[#F5EBE0] 
         ${field.game2 === 'Select A Game' ? "text-gray-400" : "text-gray-600"}  p-2 rounded-2xl min-w-71 font-medium text-[1.2rem] min-h-20 border`}
      value={field.game2}
      onChange={(e) => handleFields("game2", e.target.value)}
      id="game2"
      required
       ref = {inputRef.toGame}
    >
      {["Select A Game","Counter Strike 2","Valorant","Overwatch","Marvel Rivals"].map((item, index) => (
        <option key={index} value={item} className={`${item === 'Select A Game' ? "text-[#333333]" : "text-[#333333]"}`}>
          {item}
        </option>
      ))}
    </select>
    <label
      htmlFor="game2"
      className={`absolute left-3 text-black transition-all duration-200 
      text-base md:text-[0.9rem]  font-bold
      top-1
      peer-focus: peer-focus:text-sm peer-focus:text-[#EAEFEF]
      ${field.game2 && field.game2 !== "Select A Game" ? "-top-2.5 text-sm text-gray-400" : "text-black"}`}
    >
      Convert To
    </label>
  </div>


</div>

<div className='flex flex-col md:flex-row justify-center gap-10 items-center text-white my-10'>
<div className='relative'>
<label className='absolute left-3 text-[0.9rem] text-gray-400  font-bold p-1' >Sensitivity</label>

<input type = 'number'  value={sens.sens} ref = {inputRef.sens} onBlur ={(e) => InputBlur('sens', e.target.value)}
 className={`bg-linear-to-tr from-[#FEFCF3] to-[#F5EBE0]  rounded-2xl p-4 mt-1 w-70 h-15 text-[1.1rem] font-semibold text-gray-700
  ${emptyFields.sens && 'border-red-700 border'} appearance-none focus:outline-1 outline-blue-500 focus:ring-2 ring focus:ring-blue-500`}
 onChange={(e) => handleSens('sens', e.target.value, field.game1, field.game2)}></input>
  {emptyFields.sens && <BiErrorCircle className='absolute right-2 top-6.5 text-red-700 '></BiErrorCircle>}

</div>
<div className='relative'>
<label className='absolute left-3 text-[0.9rem] text-gray-400 font-bold p-1'>From DPI</label>
<input type = 'number' 
 className={`bg-linear-to-tr from-[#FEFCF3] to-[#F5EBE0]  rounded-2xl p-4 mt-1 text-gray-700 w-35 h-15 font-semibold text-[1.1rem]  ${emptyFields.fdpi && 'border-red-700 border'} appearance-none focus:outline-1 outline-blue-500 focus:ring-2 ring focus:ring-blue-500`} 
onChange={(e) => handleSens('fdpi', e.target.value, field.game1, field.game2)} value = {sens.fdpi} ref = {inputRef.fDpi} onBlur ={(e) => InputBlur('fdpi', e.target.value)} ></input>
 {emptyFields.fdpi && <BiErrorCircle className='absolute right-2 top-6.5 text-red-700 text-[1.1rem]'></BiErrorCircle>}
</div>
<div className='relative'>
<label className='absolute left-3 text-[0.9rem] text-gray-400 font-bold p-1'>To DPI</label>
<input type = 'number'
 className={`bg-linear-to-tr from-[#FEFCF3] to-[#F5EBE0] rounded-2xl p-4 mt-1 text-gray-700 w-35 h-15 font-semibold text-[1.1rem] ${emptyFields.tdpi && 'border-red-700 border'} appearance-none focus:outline-1 outline-blue-500 focus:ring-2 ring focus:ring-blue-500`} 
 onChange={(e) => handleSens('tdpi', e.target.value, field.game1, field.game2)} value = {sens.tdpi} ref = {inputRef.tDpi} onBlur ={(e) => InputBlur('tdpi', e.target.value)} ></input>
  {emptyFields.tdpi && <BiErrorCircle className='absolute right-2 top-6.5 text-red-700 '></BiErrorCircle>}
</div>
</div>


<div className='flex flex-col sm:flex-row justify-evenly items-center text-white my-15'>

<h1 className='font-semibold text-1xl whitespace-nowrap p-2 text-gray-800'>Converted Sensitivity: <div className='bg-[#F5EBE0] p-2 rounded-2xl flex items-center justify-center mt-2 border'><span className='font-bold text-black text-[1.2rem]'>{finalSens}</span></div></h1>
<button onClick={Reset} className=' p-3 rounded-3xl min-w-35 cursor-pointer text-gray-800 border bg-[#F5EBE0] font-semibold'>Reset</button>


</div>

</div>
</div>

</>)







}

