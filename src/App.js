import { useReducer, useState } from 'react'
import './App.css';

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

function App() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        setTimeout(()=>{
            setSubmitting(false);
        }, 3000)
    }

    const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });

    // pass status of checkbox instead of set value
   //  const isCheckbox = event.target.type === 'checkbox';
   // setFormData({
   //   name: event.target.name,
   //   value: isCheckbox ? event.target.checked : event.target.value,
   // })
  }


  return (
    <div className="wrapper">
        <h1>A Form</h1>
        { submitting &&
            <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>: {value.toString()}</li>
           ))}
         </ul>
       </div>
        }
        <form onSubmit={handleSubmit}>
            <fieldset>
                 <label>
                   <p>Name</p>
                   <input name="name" onChange={handleChange} />
                 </label>
            </fieldset>
            <fieldset>
         <label>
           <p>Location</p>
           <select name="location" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="us">U.S.</option>
               <option value="de">Germany</option>
               <option value="sw">Sweden</option>
           </select>
         </label>
         <label>
           <p>Count</p>
           <input type="number" name="count" onChange={handleChange} step="1"/>
         </label>
         <label>
           <p>Delivery</p>
           <input type="checkbox" name="delivery" value="YEAH MON" onChange={handleChange} />
         </label>
       </fieldset>
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default App;
