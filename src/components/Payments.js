import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



let member, memberCount;
const Payments = ({state,currentAccount}) => {

  const [payements, setPayements] = React.useState([]);

  const getToPay = async(groupAddress)=>{
      const {contract} = state;
      try {

          // const result = fetchGroupMember(groupAddress)
          // console.log(result)
          // member=result[0]
          // memberCount=result[1]
          // const toPay = []
          // for(let i = 0;i<memberCount;i++){
          //     const amount = await contract.methods.getToPay(currentAccount,member[i],groupAddress).call()
          //     toPay.push({group:groupAddress,to:member[i],amount:amount})
          // }
          // console.log("To pay has the valueS: ",toPay);
  
          member=memberList
          memberCount=memberList.length
          console.log("Member and member count: ",member, memberCount)
          const toPay = []
          for(let i = 0;i<memberCount;i++){
              const amount = await contract.methods.getTopay(currentAccount,member[i],groupAddress).call()
              toPay.push({group:groupAddress,to:member[i],amount:amount})
          }
          setPayements(toPay);
          // console.log("To pay has the valueS: ",toPay);

      } catch (error) {
          console.log("Contract error",error)
      }
    }
  
  
    const splitwise = async(groupAddress)=>{
      const {contract} = state;
      try {
          await contract.methods.splitwise(groupAddress);
          console.log("This function has been called.")
      } catch (error) {
          console.log("Can't calculate balance split",error)
      }
    }


  // const fetchGroupMember = async(groupAddress)=>{
  //     const {contract} = state
  //     try {
  //         const GroupMember = await contract.methods.getMemberes(currentAccount).call()
  //         return GroupMember,GroupMember.length
  //     } catch (error) {
  //         console.log(`Cannot get group member of ${groupAddress}`,error)
  //     }
  // }

  const [groupMemberInfo, setgroupMemberInfo]= React.useState({groupAddress:[], groupName:[]})

  const getMemberedGroups= async(currentAccount)=>{
    const {contract}= state
    try{
      const result = await contract.methods.getMemberedGroups(currentAccount).call()
      setgroupMemberInfo({groupName: result[1], groupAddress: result[0]});
    }
    catch(error){
      console.log("Error: ", error)
    }
  }

  const [memberList, setmemberList]= React.useState([])

  const showMember = async(groupAddress)=>{
    const {contract} = state
    try {
        const GroupMember = await contract.methods.getMembers(groupAddress).call()
        setmemberList(GroupMember);
    } 
    catch (error) {
        console.log(`Cannot get group member of ${groupAddress}`,error)
    }
  }


  // const [payments, setpayments]=React.useState([])
  //find which group, find members of 
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePayment=()=>{
    console.log("IF only")
  }

  const memberInformation=(groupAddress)=>{
    showMember(groupAddress);
    // getToPay(groupAddress) ;
    console.log("Here",payements);
    console.log("Group member list: ",memberList)
  }
  React.useEffect(()=>{
    getMemberedGroups(currentAccount);
  },[])


  const getPay = async()=>{
    const {contract} = state;
    console.log(state)
    try {
      let cA ="0x016511632200B3fB504FE05Fafb476c72193B006"
      let groupAddress="0x0D0ba0FEe2F8938B6271eE5fDcD1D9D073a6750A"
      await contract.methods.splitwise(groupAddress).send({from:cA});
      let member = "0x0D0ba0FEe2F8938B6271eE5fDcD1D9D073a6750A"
       console.log(await contract.methods.getTopay(cA,member,groupAddress).call())
        // console.log("To pay has the valueS: ",toPay);
    } catch (error) {
        console.log("Contract error",error)
    }
  }


  return (
    <div style={{marginLeft: 30, marginRight: 30}}>
        <div>
            <h2>Due</h2>
        </div>
        <Button onClick={()=>getPay()}>GetPay</Button>

      {/* {groupMemberInfo.groupName.map((group,index)=>(

      <Accordion expanded={expanded === group} onChange={handleChange(group)} onClick={()=>{splitwise(groupMemberInfo.groupAddress[index]); memberInformation(groupMemberInfo.groupAddress[index])}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {group}
          </Typography>
                    
        </AccordionSummary>

        {memberList.map((member)=>(
        <AccordionDetails>
      <Card sx={{ display: 'flex' }}>
      <CardActionArea>
        <CardContent >
          <Typography gutterBottom component="div">
            {member}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Money
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handlePayment}>
          Pay
        </Button>
      </CardActions>
    </Card>
        </AccordionDetails>  
        ))}
        
      </Accordion>
      ))} */}


  
        {/* <div style={{marginTop:80}}>
            <h2>Paid</h2>
        </div>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            GroupName
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You owe (this person) (this amount of money).
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card> */}
    </div>
  )

  
}

export default Payments