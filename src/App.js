import React from 'react';

class CashFlow extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

//Get initialstate
  getInitialState = () => {
    const initialstate = {
      id : 1,
      users : {
        user1 : 0,
        user2 : 0 
      },
      transactions : [],
      selectedReciever : 0,
      newAmount : '',
      newDescription : ''
    };
    return initialstate;
  }

//Adding amount to the users account
  addAmount = (user, amount) => {    
    let x = this.state.users;
    x[user] += amount;
    this.setState({ users : x})
  }

//Reduce amount 
  reduceAmount = (obj) => {
    let x = this.state.users;
    x[obj[0].to] -= obj[0].amount;
    this.setState({ users : x})
  }

//Deleting an transaction 
  delItem = (event) => {
    
    let x = this.state.transactions;
    let pos = -1;
  
    for(let i=0; i<x.length; i++)
    {
      if( x[i].id === event.target.id )
      {
        pos = i;
        break;
      }
    }

    let del = x.splice(pos,1);
    this.reduceAmount(del);
    this.setState({ transactions : x })

  }

//Adding new item 
  addItem = (event) => {
    
    let currentdate = new Date(); 
    let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + (currentdate.getHours()===0?12:currentdate.getHours()) + ":"  
                + currentdate.getMinutes();

    let newItem = { 
        id : this.state.id,
        amount : Number(this.state.newAmount) ,
        addedBy : "",
        to : this.state.selectedReciever,
        discription : this.state.newDescription,
        date : datetime  
      }

    if(!isNaN(newItem.amount) && newItem.amount!==0)
    {
      this.addAmount(newItem.to, newItem.amount)
      this.state.transactions.push(newItem)
      this.setState({ id : this.state.id + 1 })
      this.setState({newAmount:''})
      this.setState({newDescription:''})
    }
  }

  render() {
    return (
      <div>

      <center>

        <br/><br/>

        <button onClick= {(event)=>{ this.setState(this.getInitialState()) } }> Clear All </button>

        <div>
          <p>To User1 : {this.state.users.user1} |~| To User2 : {this.state.users.user2} </p>
          <hr/>
        </div>

        <div>
          {
            this.state.transactions.map((item) => (
              <div key={item.id}>
                <p key={item.id} > Pay {item.amount} to {item.to} for {item.discription} on {item.date}</p>
                <button id={item.id} onClick={this.delItem.bind(this)}> X </button>
                <hr/>                
              </div>
            ))
          }
        </div>

        <hr/>
        <label> To ? </label>
        <div onChange={(event)=>{this.setState({selectedReciever:event.target.value})}}  id="insert">
          <input type="radio" value="user1" name="reciever"/> User1
          <input type="radio" value="user2" name="reciever"/> User2
        </div>

        <input type="text" value={this.state.newAmount} id="newAmt" onChange={(event)=>{this.setState({newAmount:event.target.value})}} placeholder="amount"  /> 

        <input type="text" value={this.state.newDescription} id="newDesc" onChange= {(event)=>{ this.setState({newDescription : event.target.value }) } } placeholder="description" /> 

        <button onClick={this.addItem.bind(this)}> add! </button>

      </center>

      </div>
    );
  }
}

export default CashFlow;
