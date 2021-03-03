
import './App.css';
import React, { Component } from 'react'

class Table extends Component {

    constructor(props){
        super(props)
        this.state = {
          users:[],
          isLoadion:false,
          isError:false
        }
    }

    // async function get request

    async componentDidMount(){
      this.setState({isLoadion:true})

      const response = await fetch("https://jsonplaceholder.typicode.com/users")
     
      if (response.ok){
        const users = await response.json()
        console.log(users)
        this.setState({users,isLoadion:false})
      } else {
        this.setState({isError:true,isLoadion:false})
      }
    }

renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>
      {attr.toUpperCase()}
    </th>)
}

renderTableRows = () => {
 return this.state.users.map(users =>  {
   return (
     <tr key={users.id}>
        <td>{users.id}</td>
        <td>{users.name}</td>
        <td>{users.username}</td>
        <td>{users.email}</td>
        <td>
          {`${users.address.street},${users.adrress},${users.city}`}
        </td>
        <td>{users.phone}</td>
        <td>{users.website}</td>
        <td>{users.company.name}</td>
       
     </tr>
   )
 })
}


   render () {
     const {users,isLoadion,isError} = this.state

     if (isLoadion) {
       return<div>Loading...</div>
     }

     if (isError) {
       return<div>Error...</div>
     }

     return users.length > 0
     ? (
         <table>
           <thead>
             <tr>
               {this.renderTableHeader()}
             </tr>
           </thead>
           <tbody>
             {this.renderTableRows()}
           </tbody>
         </table>
     ):(
       <div>No Users</div>
     )
   }
}

export default Table;
