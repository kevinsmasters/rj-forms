import { useReducer, useState } from 'react'
import './App.css';

const formReducer = (state, event) => {
    if(event.reset) {
   return {
     location: '',
     count: 0,
     name: '',
     'delivery': false,
   }
 }
 return {
   ...state,
   [event.name]: event.value
 }
}

function App() {
    const [formData, setFormData] = useReducer(formReducer, {
        count: 100,
    });
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        setTimeout(()=>{
            setSubmitting(false);
            setFormData({
                reset: true
            })
        }, 3000)
    }

    const handleChange = event => {
    // setFormData({
    //   name: event.target.name,
    //   value: event.target.value,
    // });

    // pass status of checkbox instead of set value
    const isCheckbox = event.target.type === 'checkbox';
   setFormData({
     name: event.target.name,
     value: isCheckbox ? event.target.checked : event.target.value,
   })
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
            <fieldset disabled={submitting}>
                 <label>
                   <p>Name</p>
                   <input name="name" onChange={handleChange} value={formData.name || ''} />
                 </label>
            </fieldset>
            <fieldset disabled={submitting}>
         <label>
           <p>Location</p>
           <select name="location" onChange={handleChange} value={formData.location || ''}>
               <option value="">--Please choose an option--</option>
               <option value="us">U.S.</option>
               <option value="de">Germany</option>
               <option value="sw">Sweden</option>
           </select>
         </label>
         <label>
           <p>Count</p>
           <input type="number" name="count" onChange={handleChange} step="1"  value={formData.count || ''}/>
         </label>
         <label>
           <p>Delivery</p>
           <input type="checkbox"
           name="delivery"
           onChange={handleChange}
           disabled={formData.location !== 'us' }
           checked={formData['delivery'] || false} />
         </label>
       </fieldset>
            <button type="submit" disabled={submitting}>Submit</button>
        </form>
    </div>
  );
}

export default App;
